<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Syllabus extends Model
{
    use HasFactory;
    protected $table='syllabus';

    protected $fillable = ['name','faculty_id','file_path'];

    public function faculty(){
        return $this->belongsTo(Faculty::class,'faculty_id');
    }
}
