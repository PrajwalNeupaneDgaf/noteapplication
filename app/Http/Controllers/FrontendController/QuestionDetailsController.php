<?php

namespace App\Http\Controllers\FrontendController;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Question;
use App\Models\Semester;
use App\Models\Solution;
use App\Models\Subject;
use Inertia\Inertia;

class QuestionDetailsController extends Controller
{
    public function index($faculty_short,$semester,$subject,$question_id){
       try{
        $faculty = Faculty::where('short',$faculty_short)->first()->name;
        $question = Question::where('id',$question_id)->first();
        return Inertia::render('Website/QuestionPage/QuestionDetails',[
            'faculty' => $faculty,
            'question' => $question,
            'subject' => $subject,
            'semester' => $semester,
            'faculty_short' => $faculty_short
        ]);
    }catch(\Exception $e){
        return redirect()->route('home');
    }
}
  
}
