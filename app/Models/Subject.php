<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = ['name','faculty_id','semester_id'];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }
    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
