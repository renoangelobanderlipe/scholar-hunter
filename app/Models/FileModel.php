<?php

namespace App\Models;

use App\Contracts\ScholarshipFileContract;
use Illuminate\Database\Eloquent\Model;

class FileModel extends Model implements ScholarshipFileContract
{
    protected $table = 'files';
    protected $fillable = ['id_no', 'foundation_id', 'file_id', 'file_name', 'file_location'];

    protected $idNo;
    protected $foundationId;
    protected $fileId;
    protected $fileName;
    protected $fileLocation;

    public function idNo(string $id)
    {
        $this->idNo = $id;
    }
    public function foundationId(int $id)
    {
        $this->foundationId = $id;
    }
    public function fileId(int $id)
    {
        $this->fileId = $id;
    }
    public function fileName(string $name)
    {
        $this->fileName = $name;
    }
    public function fileLocation(string $name)
    {
        $this->fileLocation = $name;
    }

    public function scopeFiles()
    {
        return self::query();
    }

    public function store()
    {
        return FileModel::create([
            'id_no' => $this->idNo,
            'foundation_id' => $this->foundationId,
            'file_id' => $this->fileId,
            'file_name' => $this->fileName,
            'file_location' => $this->fileLocation
        ]);
    }
}
