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

    public function scopeScholarship()
    {
        return Scholarship::all();
    }

    public function foundation()
    {
        return $this->belongsTo(Foundation::class);
    }

    public function showList()
    {
        dd($this->scholarship());
    }

    public function apply($data)
    {
        try {
            $files = new FileModel;

            $fileName = \Auth::id() . date('Ymd-His') . $data->file->getClientOriginalExtension();

            $scholarshipPath = $data->file->storeAs('forms', $fileName);

            $files->idNo(\Auth::user()->id_no);
            $files->foundationId($data->foundation_id);
            $files->fileId($data->id);
            $files->fileName($fileName);
            $files->fileLocation($scholarshipPath);

            $files->store();

            return $this->success(['message' => 'Successfully Uploaded']);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }
    }

    public function fileStore()
    {
    }
}
