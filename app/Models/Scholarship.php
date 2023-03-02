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
            $fileName = \Auth::id() . date('Ymd-His') . '.' . $data->file->getClientOriginalExtension();
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
                ->first();
            // ->pluck('foundation_id');
            $user_ids = \DB::table('applications')
                ->where('foundation_id', $foundation_id->foundation_id)
                ->get()
                ->pluck('user_id')
                ->toArray();

            $data = User::whereIn('id', $user_ids)
                ->get();

            $applicationStatus = \DB::table('applications')->where('user_id', $user_ids)->get();

            // $data = \DB::table('applications')
            //     ->select(['id', 'name', 'description'])
            //     ->where('foundation_id', $foundation_id)
            //     ->get();
            $response = [];

            foreach ($data as $key => $datas) {
                $response[] = [
                    'id' => $applicationStatus[$key]->id,
                    'user_id' => $datas->id,
                    'id_no' => $datas->id_no,
                    'firstname' => $datas->firstname,
                    'middlename' => $datas->middlename,
                    'lastname' => $datas->lastname,
                    'contact_no' => $datas->contact_no,
                    'email' => $datas->email,
                    'status' => $applicationStatus[$key]->status,
                ];
            }

            return $this->success($response);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function downloadFile($id)
    {
        try {
            $file = \DB::table('applications')->find($id);


            return Storage::download('forms/1620230227-185945.jpg', 'FHE.jpg', ['Content-Type' => 'application/pdf']);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        };
    }

    public function approveScholarship($id)
    {
        try {
            // $user_id = \Auth::user()->id;
            // $foundation_id = \DB::table('foundation_user')
            //     ->where('user_id', $user_id)
            //     ->get();
            // dd($foundation_id);
            $user = \DB::table('applications')
                ->where('user_id', $id)
                ->first();
            // ->pluck('user_id');
            // dd($user_ids);
            $data = User::where('id', $user->user_id)
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
            // $user_id = \Auth::user()->id;
            // $foundation_id = \DB::table('foundation_user')
            //     ->where('user_id', $user_id)
            //     ->get();
            // dd($foundation_id);
            $user = \DB::table('applications')
                ->where('user_id', $id)
                ->first();
            // ->pluck('user_id');
            // dd($user_ids);
            $data = User::where('id', $user->user_id)
                ->first();

            $validateStatus = \DB::table('applications')
                ->select('status')
                ->where('user_id', $id)
                ->first();

            throw_if($validateStatus->status == 'rejected', \Exception::class, 'User Already Approved!');

            \DB::beginTransaction();

            $status = \DB::table('applications')
                ->where('user_id', $id)
                ->update(['status' => 'rejected']);

            Mail::to($data->email)->send(new CanceledScholarshipMailer);

            \DB::commit();
            return $this->success('User Scholarship Rejected!');
        } catch (\Throwable $throwable) {
            \DB::rollback();
            return $this->error($throwable->getMessage());
        }
    }
}
