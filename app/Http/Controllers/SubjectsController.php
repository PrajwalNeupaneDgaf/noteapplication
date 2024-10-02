<?php
namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Models\Faculty;
use App\Models\Semester;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectsController extends Controller
{
    public function index()
    {
        // Eager load faculty and semester to avoid N+1 queries
        $subjects = Subject::with('faculty', 'semester')->get();
        $faculties = Faculty::all();
        $semesters = Semester::all();

        $data = $subjects->map(function ($subject) {
            return [
                'id' => $subject->id,
                'name' => $subject->name,
                'faculty' => $subject->faculty->name,
                'semester' => $subject->semester->name,
            ];
        });

        return Inertia::render('Admin/Subject/Index', [
            'subjectData' => [
                'subjects' => $subjects,
                'faculty' => $faculties,
                'semester' => $semesters,
                'data' => $data
            ],
        ]);
    }

    public function store(SubjectRequest $request)
    {
        // Get the validated data
        $validated = $request->validated(); 
    
        foreach ($validated['name'] as $name) {
            Subject::create([
                'name' => $name,
                'faculty_id' => $validated['faculty_id'],
                'semester_id' => $validated['semester_id'],
            ]);
        }
        return redirect()->route('subject.index')->with('success', 'Subjects created successfully!');
    }
    
    public function show($id)
    {
        $subject = Subject::findOrFail($id);

        // Return a response if needed (not used in your current code)
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required',
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id',
        ]);

        $subject->update($validated);

        return redirect()->route('subject.index')->with('success', 'Subject updated successfully!');
    }

    public function edit($id){
        $subject = Subject::findOrFail($id);
        $faculties = Faculty::all();
        $semesters = Semester::all();

        return Inertia::render('Admin/Subject/Update',['data'=>[
            'subject'=>$subject,
            'faculties'=>$faculties,
            'semesters'=>$semesters
        ]]);
    }
    public function destroy($id){
        $subject = Subject::findOrFail($id);

        $subject->delete();
    }

}
