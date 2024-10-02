<?php

namespace App\Http\Controllers\FrontendController;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Question;
use App\Models\Semester;
use App\Models\Solution;
use App\Models\Subject;
use Inertia\Inertia;

class NotesQuestionController extends Controller
{
    public function index($faculty_short, $semester)
    {
       try{
        $faculty = Faculty::where('short', $faculty_short)->first()->name;
        $faculty_id = Faculty::where('short', $faculty_short)->first()->id;
        $semester_id = Semester::where('name', $semester)
            ->where('faculty_id', $faculty_id)
            ->first()
            ->id;

        $subjects  = Subject::where('semester_id', $semester_id)->get();
        $data = $subjects->map(function ($subject) {
            return [
                'subject' => $subject->name,
                "notes" => Solution::where('subject_id', $subject->id)->get(),
                "questions" => Question::where('subject_id', $subject->id)->get()

            ];
        });
        return Inertia::render('Website/NotePage/NotesQuestionPage', [
            'datas' => $data,
            'faculty' => $faculty,
            'semester' => $semester,
            'short' => $faculty_short
        ]);
       }catch(\Exception $e){
        return redirect()->route('home');
       }
    }
}
