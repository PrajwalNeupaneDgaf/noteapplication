<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\Syllabus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class SyllabusNotesQuestionController extends Controller
{
   
    public function index(){
       $faculty = Faculty::all();
       $semesters = Semester::all();
       $subjects = Subject::all();
       
      return Inertia::render('Admin/QuestionNotesSyllabus/Create',[
        'data'=>[
            'faculties'=>$faculty,
            'semesters'=>$semesters,
            'subjects'=>$subjects,
        ]
       ]);
    }

    public function store(Request $request){
       
        if($request->has('syllabus_file') && $request->has('syllabus_name')){
            $request->validate([
                'faculty_id'=>'required'
            ]);
           foreach($request->syllabus_file as $key=>$item){
            if($request->syllabus_name[$key]!=''){
                
            }
           }
        }
        if($request->has('note_file')&& $request->has('note_title')){
            $request->validate([
                'faculty_id'=>'required',
                'subject_id'=>'required',
                'semester_id'=>'required'
            ]);
            foreach($request->note_file as $key=>$item){
                if($request->note_title[$key]!=''){

                }
            }
        }
        if($request->has('question_file' && $request->has('question_name')) && $request->has('question_year')){
            $request->validate([
                'faculty_id'=>'required',
                'subject_id'=>'required',
                'semester_id'=>'required'
            ]);
            foreach($request->question_file as $key=>$item){

            }
        }





    //     $request->validate([
    //         'faculty_id' => 'required|exists:faculties,id',
    //         'subject_id' => 'required|exists:subjects,id',
    //         'semester_id' => 'required|exists:semesters,id',
    //         'syllabus_name.*' => 'required|string',
    //         'syllabus_file.*' => 'nullable|file|mimes:pdf,doc,docx',
    //         'question_name.*' => 'required|string',
    //         'question_year.*' => 'required|digits:4',
    //         'question_file.*' => 'nullable|file|mimes:pdf,doc,docx',
    //         'note_title.*' => 'required|string',
    //         'note_file.*' => 'nullable|file|mimes:pdf,doc,docx',
    //     ]);
    //     if ($request->has('syllabus_file')) {
    //         foreach ($request->syllabus_name as $index => $name) {
    //             $file = $request->file('syllabus_file')[$index];
    //             $filePath = $file ? $file->store('syllabus_files', 'public') : null;
    
    //             Syllabus::create([
    //                 'name' => $name,
    //                 'faculty_id' => $request->faculty_id,
    //                 'file_path' => $filePath,
    //             ]);
    //         }
    //     }
    //     if ($request->has('question_file')) {
    //         foreach ($request->question_name as $index => $name) {
    //             $file = $request->file('question_file')[$index];
    //             $filePath = $file ? $file->store('question_files', 'public') : null;
    
    //             DB::table('questions')->insert([
    //                 'name' => $name,
    //                 'year' => $request->question_year[$index],
    //                 'faculty_id' => $request->faculty_id,
    //                 'subject_id' => $request->subject_id,
    //                 'semester_id' => $request->semester_id,
    //                 'file_path' => $filePath,
    //                 'created_at' => now(),
    //                 'updated_at' => now(),
    //             ]);
    //         }
    //     }
    //     if ($request->has('note_file')) {
    //     foreach ($request->note_title as $index => $title) {
    //         $file = $request->file('note_file')[$index];
    //         $filePath = $file? $file->store('note_files', 'public') : null;

    //         DB::table('solutions')->insert([
    //             'name' => $title,
    //             'faculty_id' => $request->faculty_id,
    //             'subject_id' => $request->subject_id,
    //             'semester_id' => $request->semester_id,
    //             'file_path' => $filePath,
    //             'created_at' => now(),
    //             'updated_at' => now(),
    //         ]);
    //     }

    //     }
    
    // return redirect()->back()->with('success', 'Data uploaded successfully!');
    }
}
