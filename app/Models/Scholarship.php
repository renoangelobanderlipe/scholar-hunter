<?php

namespace App\Models;

use App\Mail\ApprovedScholarshipMailer;
use App\Mail\CanceledScholarshipMailer;
use App\Mail\StatusMailer;
use App\Traits\HttpResponse;
use App\Traits\UserTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class Scholarship extends Model
{
    use HttpResponse, UserTrait;

    protected $fillable = [
        'foundation_id',
        'name',
        'description',
        'note',
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

    public function info(int $id)
    {
        try {
            $user = User::find($id);

            $data = [
                'id' => $user->id,
                'id_no' => $user->id_no,
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'lastname' => $user->lastname,
                'address' => $user->address,
                'username' => $user->username,
                'contact_no' => $user->contact_no,
                'email' => $user->email,
                'course' => $user->course,
                'course_type' => $user->course_type,
            ];

            return $this->success($data);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }


    public function create($data)
    {
        try {
            $payload = $data['values'];

            $foundation_id = \DB::table('foundation_user')
                ->select('foundation_id')
                ->where('user_id', \Auth::user()->id)
                ->first();

            \DB::beginTransaction();

            \DB::table('scholarships')->insert([
                'foundation_id' => $foundation_id->foundation_id,
                'name' => $payload['name'],
                'description' => $payload['description'],
                'description' => $payload['note']
            ]);

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
            $fileName = \Auth::user()->id . date('Ymd-His') . '.' . $data->file->getClientOriginalExtension();
            $data->file->storeAs('public/forms', $fileName);

            $fileData = [
                'user_id' => \Auth::user()->id,
                'scholarship_id' => $data->id,
                'foundation_id' => $data->foundation_id,
                'file_id' => $data->id,
                'file_name' => $fileName,
                'file_location' => 'forms' . '/' . $fileName,
                'status' => 'pending',
            ];

            Application::create($fileData);

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
                ->pluck('user_id');
            // ->toArray();
            $data = User::whereIn('id', $user_ids)
                ->get();

            $applicants = \DB::table('applications')->whereIn('user_id', $user_ids)->get();

            $response = [];

            foreach ($applicants as $key => $applicant) {
                $userData = collect($data)->where('id', $applicant->user_id)->first();
                $response[] = [
                    'id' => $applicant->id,
                    'user_id' => $applicant->user_id,
                    'id_no' => $userData->id_no,
                    'firstname' => $userData->firstname,
                    'middlename' => $userData->middlename,
                    'lastname' => $userData->lastname,
                    'contact_no' => $userData->contact_no,
                    'email' => $userData->email,
                    'status' => $applicant->status,
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
            $urll =  'public' . '/' . $file->file_location;
            $fileUrl = Storage::url($urll);

            return $this->success($fileUrl);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        };
    }

    public function approveScholarship($id)
    {
        try {

            $user = \DB::table('applications')
                ->where('user_id', $id)
                ->first();

            $data = User::where('id', $user->user_id)
                ->first();

            $validateStatus = \DB::table('applications')
                ->select('status')
                ->where('user_id', $id)
                ->first();

            throw_if($validateStatus->status == 'approved', \Exception::class, 'User Already Approved!');

            \DB::beginTransaction();

            \DB::table('applications')
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
            $user = \DB::table('applications')
                ->where('user_id', $id)
                ->first();

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
