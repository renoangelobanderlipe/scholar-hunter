<?php

namespace App\Models;

use App\Traits\HttpResponse;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HttpResponse;

    protected $fillable = [
        'user_id',
        'scholarship_id',
        'foundation_id',
        'file_id',
        'file_name',
        'file_location',
        'status',

    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function appliedScholarship()
    {
        try {
            $user_id = \Auth::user()->id;

            $application = self::where('user_id', $user_id)->first();
            $scholarship = \DB::table('scholarships')->find($application->file_id);
            $foundation = \DB::table('foundations')->find($scholarship->foundation_id);

            $data = [
                'id' => $application->id,
                'foundation' => $foundation->name,
                'scholarship' => $scholarship->name,
                'status' => $application->status,
            ];
            return $this->success([$data]);
        } catch (\Throwable $throwable) {
            return $this->error($throwable->getMessage());
        }

        // dd($applications);
    }
}
