<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Model;

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
                ->where('id', $user_id)
                ->first();

            \DB::beginTransaction();
            $data = Scholarship::create([
                'foundation_id' => $foundation_id->foundation_id,
                'name' => $payload['name'],
                'description' => $payload['description']
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

    public function fileStore()
    {
    }
}
