<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;

    protected $fillable = ['name','faculty_id','semester_id','subject_id' , 'file_path'];

    public function faculty(){
        return $this->belongsTo(Faculty::class,'faculty_id');
    }

    public function semester(){
        return $this->belongsTo(Semester::class,'semester_id');
    }

    public function subject(){
        return $this->belongsTo(Subject::class,'subject_id');
    }
}
