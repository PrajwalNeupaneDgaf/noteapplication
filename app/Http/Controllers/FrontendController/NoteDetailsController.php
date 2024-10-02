<?php

namespace App\Http\Controllers\FrontendController;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Semester;
use App\Models\Solution;
use App\Models\Subject;
use Inertia\Inertia;

class NoteDetailsController extends Controller
{
    public function index($faculty_short,$semester,$subject,$note_id){
       try{
        $faculty = Faculty::where('short',$faculty_short)->first()->name;
        $note = Solution::where('id',$note_id)->first();
        return Inertia::render('Website/NotePage/NotesDetails',[
            'faculty' => $faculty,
            'note' => $note,
            'subject' => $subject,
            'semester' => $semester,
            'faculty_short' => $faculty_short
        ]);
    }catch(\Exception $e){
        return redirect()->route('home');
    }
}
  
}
