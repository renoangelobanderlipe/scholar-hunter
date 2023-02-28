<?php

namespace App\Models;

use App\Mail\ApprovedScholarshipMailer;
use App\Mail\CanceledScholarshipMailer;
use App\Mail\StatusMailer;
use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class Scholarship extends Model
{
    use HttpResponse;

    protected $fillable = [
        'foundation_id',
        'name',
        'description',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function foundation()
    {
        return $this->belongsTo(Foundation::class);
    }

    public function scopeScholarship()
    {
        return Scholarship::query();
    }

    public function index()
    {
        try {
            $data = Scholarship::select(['id', 'foundation_id', 'name', 'description'])
                ->orderBy('name', 'asc')->paginate(10);

            return $this->success($data);
        } catch (\Throwable $throwable) {
            $this->error($throwable->getMessage());
        }
    }

    public function search(string $keyword)
    {
        try {
            if ($keyword != '') {
                $data = $this->scholarship()
                    ->where('name', 'LIKE', '%' . $keyword . '%')
                    ->paginate(10);
            } else {
                $data = $this->scholarship()->paginate(10);
            }

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function create($data)
    {
        try {
            $payload = $data['values'];
            $user_id = \Auth::user()->id;

            $foundation_id = \DB::table('foundation_user')
                ->select('foundation_id')
                ->where('user_id', $user_id)
                ->first();
            \DB::beginTransaction();
            \DB::table('scholarships')->insert([
                'foundation_id' => $foundation_id->foundation_id,
                'name' => $payload['name'],
                'description' => $payload['description']
            ]);
            // $data = Scholarship::create([
            //     'foundation_id' => $foundation_id->foundation_id,
            //     'name' => $payload['name'],
            //     'description' => $payload['description']
            // ]);
            \DB::commit();
            return $this->success($data);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function foundations()
    {
        try {
            $foundations = Foundation::select(['id', 'name', 'description', 'address', 'contact_no', 'email', 'type'])->get();

            return $this->success($foundations);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function apply($data)
    {
        try {
            // dd($data);
            $fileName = \Auth::id() . date('Ymd-His') . $data->file->getClientOriginalExtension();
            $scholarshipPath = $data->file->storeAs('forms', $fileName);

            $fileData = [
                'user_id' => \Auth::user()->id,
                'scholarship_id' => $data->id,
                'foundation_id' => $data->foundation_id,
                'file_id' => $data->id,
                'file_name' => $fileName,
                'file_location' => $scholarshipPath,
                'status' => 'pending',
            ];

            Application::create($fileData);
            // $fileName = \Auth::id() . date('Ymd-His') . $data->file->getClientOriginalExtension();

            // $scholarshipPath = $data->file->storeAs('forms', $fileName);

            // $files->idNo(\Auth::user()->id_no);
            // $files->foundationId($data->foundation_id);
            // $files->fileId($data->id);
            // $files->fileName($fileName);
            // $files->fileLocation($scholarshipPath);

            // $files->store();

            return $this->success(['message' => 'Successfully Uploaded']);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function listOfScholars()
    {
        try {
            $user_id = \Auth::user()->id;

            $foundation_id = \DB::table('foundation_user')
                ->where('user_id', $user_id)
                ->get()
                ->pluck('foundation_id');

            $data = Scholarship::where('foundation_id', $foundation_id)
                ->get()
                ->toArray();

            // $data = Scholarship::rightJoin('foundation_user', 'scholarships.foundation_id', '=', 'foundation_user.foundation_id')->where('scholarships.foundation_id', $foundation_id)
            //     ->get()
            //     ->toArray();

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function deleteScholarship($id)
    {
        try {
            \DB::beginTransaction();
            Scholarship::where('foundation_id', $id)->delete();
            \DB::commit();

            return $this->success(['message' => 'Successfully Deleted']);
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function scholarsList()
    {
        try {

            $user_id = \Auth::user()->id;
            $foundation_id = \DB::table('foundation_user')
                ->where('user_id', $user_id)
                ->get()->pluck('foundation_id');

            $user_ids = \DB::table('applications')
                ->where('foundation_id', $foundation_id)
                ->get()
                ->pluck('user_id');

            $data = User::whereIn('id', $user_ids)
                ->first();

            $applicationStatus = \DB::table('applications')->where('user_id', $user_ids)->first();

            // $data = \DB::table('applications')
            //     ->select(['id', 'name', 'description'])
            //     ->where('foundation_id', $foundation_id)
            //     ->get();
            $response = [
                'id' => $applicationStatus->id,
                'user_id' => $data->id,
                'id_no' => $data->id_no,
                'firstname' => $data->firstname,
                'middlename' => $data->middlename,
                'lastname' => $data->lastname,
                'contact_no' => $data->contact_no,
                'email' => $data->email,
                'status' => $applicationStatus->status,
            ];
            return $this->success([$response]);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function downloadFile()
    {
        try {
            return Storage::download('forms/1620230227-185945jpg');
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        };
    }

    public function approveScholarship($id)
    {
        try {
            $user_id = \Auth::user()->id;
            $foundation_id = \DB::table('foundation_user')
                ->where('user_id', $user_id)
                ->get()->pluck('foundation_id');

            $user_ids = \DB::table('applications')
                ->where('foundation_id', $foundation_id)
                ->get()
                ->pluck('user_id');

            $data = User::whereIn('id', $user_ids)
                ->first();


            $validateStatus = \DB::table('applications')
                ->select('status')
                ->where('user_id', $id)
                ->first();

            throw_if($validateStatus->status == 'approved', \Exception::class, 'User Already Approved!');

            \DB::beginTransaction();
            $status = \DB::table('applications')
                ->where('user_id', $id)
                ->update(['status' => 'approved']);

            Mail::to($data->email)->send(new ApprovedScholarshipMailer);

            \DB::commit();
            return $this->success('Successfully Approve User!');
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }

    public function cancelScholarship($id)
    {
        try {
            $user_id = \Auth::user()->id;
            $foundation_id = \DB::table('foundation_user')
                ->where('user_id', $user_id)
                ->get()->pluck('foundation_id');

            $user_ids = \DB::table('applications')
                ->where('foundation_id', $foundation_id)
                ->get()
                ->pluck('user_id');

            $data = User::whereIn('id', $user_ids)
                ->first();

            $validateStatus = \DB::table('applications')
                ->select('status')
                ->where('user_id', $id)
                ->first();

            throw_if($validateStatus->status == 'rejected', \Exception::class, 'User Already Rejected!');

            \DB::beginTransaction();
            $status = \DB::table('applications')
                ->where('user_id', $id)
                ->update(['status' => 'rejected']);

            Mail::to($data->email)->send(new CanceledScholarshipMailer);

            \DB::commit();
            return $this->success('Rejected User');
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }
}
