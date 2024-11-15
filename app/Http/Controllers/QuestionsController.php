<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\Question; // Model for the questions
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionsController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $faculties = Faculty::all();
        $semesters = Semester::all();
        $subjects = Subject::all();
        $questions = Question::with(['faculty', 'semester', 'subject'])->get(); // Eager load relationships

        $dataToSend = $questions->map(function ($item, $index) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'faculty_id' => $item->faculty_id,
                'semester_id' => $item->semester_id,
                'subject_id' => $item->subject_id,
                'faculty' => $item->faculty->name,
                'semester' => $item->semester->name,
                'subject' => $item->subject->name,
                'year' => $item->year, // Include year
                'sn' => $index + 1,
            ];
        });

        return Inertia::render('Admin/Activities/Questions/Index', [
            'faculties' => $faculties,
            'semesters' => $semesters,
            'subjects' => $subjects,
            'questions' => $dataToSend,
        ]);
    }

    // Store a newly created resource in storage
    public function store(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id',
            'subject_id' => 'required|exists:subjects,id',
            'file' => 'required|file|mimes:pdf,docx|max:2048',
            'year' => 'required', // Validate year
        ]);

        // Handle file upload
        $filePath = null; // Initialize file path variable
        if ($request->hasFile('file')) {
            $filename = time().'.'.$request->file('file')->getClientOriginalExtension();
            $path = public_path('question_files');
            $request->file('file')->move($path,$filename);
            $filePath = 'question_files/'.$filename;
        }

        // Create new question
        Question::create([
            'name' => $validated['name'],
            'faculty_id' => $validated['faculty_id'],
            'semester_id' => $validated['semester_id'],
            'subject_id' => $validated['subject_id'],
            'file_path' => $filePath ?? null,
            'year' => $validated['year'], // Save year
        ]);

        return redirect()->route('questions.index')->with('success', 'Question created successfully!');
    }

    // Render the edit form with existing data
    public function edit(string $id)
    {
        $question = Question::with(['faculty', 'semester', 'subject'])->findOrFail($id);
        $faculties = Faculty::all();
        $semesters = Semester::all();
        $subjects = Subject::all();

        return Inertia::render('Admin/Activities/Questions/Update', [
            'question' => $question,
            'faculties' => $faculties,
            'semesters' => $semesters,
            'subjects' => $subjects,
        ]);
    }

    // Update the specified resource in storage
    public function update(Request $request, string $id)
    {
        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id',
            'subject_id' => 'required|exists:subjects,id',
            'file' => 'nullable|file|mimes:pdf,docx|max:2048', // Optional file input
            'year' => 'required', // Validate year
        ]);
    
        $question = Question::findOrFail($id);
        $filePath = $question->file_path; // Default to current file path
    
        // Handle file upload if provided
        if ($request->hasFile('file')) {
            // Delete old file if it exists
            if ($filePath) {
                $oldFilePath = public_path($filePath);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath); // Delete old file
                }
            }
    
            // Store new file
            $filename = time().'.'.$request->file('file')->getClientOriginalExtension();
            $path = public_path('question_files');
            $request->file('file')->move($path, $filename);
            $filePath = 'question_files/'.$filename;
        }
    
        // Update question
        $question->update([
            'name' => $validated['name'],
            'faculty_id' => $validated['faculty_id'],
            'semester_id' => $validated['semester_id'],
            'subject_id' => $validated['subject_id'],
            'file_path' => $filePath, // Update file path if a new file was uploaded
            'year' => $validated['year'], // Update year
        ]);
    
        return redirect()->route('questions.index')->with('success', 'Question updated successfully!');
    }
    
    // Remove the specified resource from storage
    public function destroy(string $id)
    {
        $question = Question::findOrFail($id);
    
        // Delete the associated file if it exists
        if ($question->file_path) {
            $filePath = public_path($question->file_path);
            if (file_exists($filePath)) {
                unlink($filePath); // Delete the file
            }
        }
    
        // Delete the question record
        $question->delete();
    
        return redirect()->route('questions.index')->with('success', 'Question deleted successfully!');
    }
    
}
