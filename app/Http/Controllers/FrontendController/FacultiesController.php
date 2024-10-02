<?php

namespace App\Http\Controllers\FrontendController;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Semester;

class FacultiesController extends Controller
{
    public function details($faculty_short ){
        try{
            $faculty_id = Faculty::where('short',$faculty_short)->first()->id;
            $semesters = Semester::where('faculty_id',$faculty_id)->get();
        }catch(\Exception $e){
            return redirect()->route('home');
        }
        return Inertia::render('Website/Facultypage/Details',[
            'semesters'=>$semesters,
            'faculty_short'=>$faculty_short
    ]);
    }
}