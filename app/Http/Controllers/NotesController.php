<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Semester; // Assuming you have a Semester model
use App\Models\Subject; // Assuming you have a Subject model
use App\Models\Solution; // The model for notes
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotesController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $faculty = Faculty::all();
        $semester = Semester::all();
        $subject = Subject::all();
        $notes = Solution::with(['faculty', 'semester', 'subject'])->get(); // Eager load relationships
        $dataToSend = $notes->map(function ($item, $index) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'faculty_id' => $item->faculty_id,
                'semester_id' => $item->semester_id,
                'subject_id' => $item->subject_id,
                'faculty' => $item->faculty->name,
                'semester' => $item->semester->name,
                'subject' => $item->subject->name,
                'sn' => $index + 1,
            ];
        });

        return Inertia::render('Admin/Activities/Notes/Index', [
            'faculties' => $faculty,
            'semesters' => $semester,
            'subjects' => $subject,
            'notes' => $dataToSend,
        ]);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id', // Validate semester_id
            'subject_id' => 'required|exists:subjects,id', // Validate subject_id
            'file' => 'required|file|mimes:pdf,docx|max:2048',
        ]);

        // Handle file upload
        $filePath = null; // Initialize file path variable
        if ($request->hasFile('file')) {
            // Generate a unique filename to avoid overwriting
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName(); // Generate unique filename
            $destinationPath = public_path('notes_files'); // Set destination path

            // Move the file to the public directory
            $file->move($destinationPath, $filename);
            $filePath = 'notes_files/' . $filename; // Save the file path
        }

        // Create new note
        Solution::create([
            'name' => $validated['name'],
            'faculty_id' => $validated['faculty_id'],
            'semester_id' => $validated['semester_id'],
            'subject_id' => $validated['subject_id'],
            'file_path' => $filePath, // Store the file path directly
        ]);

        return redirect()->route('notes.index')->with('success', 'Notes created successfully!');
    }

    // Render the edit form with existing data
    public function edit(string $id)
    {
        $note = Solution::with(['faculty', 'semester', 'subject'])->findOrFail($id);
        $faculties = Faculty::all();
        $semesters = Semester::all(); // Assuming you have a Semester model
        $subjects = Subject::all(); // Assuming you have a Subject model

        return Inertia::render('Admin/Activities/Notes/Update', [
            'note' => $note,
            'faculties' => $faculties,
            'semester' => $semesters,
            'subject' => $subjects,
        ]);
    }

    // Update the specified resource in storage.
    public function update(Request $request, string $id)
    {
       
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'faculty_id' => 'required|exists:faculties,id',
            'semester_id' => 'required|exists:semesters,id', // Validate semester_id
            'subject_id' => 'required|exists:subjects,id', // Validate subject_id
        ]);

        $note = Solution::findOrFail($id);
        $filePath = $note->file_path; // Default to current file path

        // Handle file upload if provided
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($note->file_path) {
                $oldFilePath = public_path($note->file_path); // Changed from 'storage/' to root
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath); // Delete old file
                }
            }

            // Generate a unique filename to avoid overwriting
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName(); // Generate unique filename
            $destinationPath = public_path('notes_files'); // Set destination path

            // Move the file to the public directory
            $file->move($destinationPath, $filename);
            $filePath = 'notes_files/' . $filename; // Save the new file path
        }

        // Update note
        $note->update([
            'name' => $validated['name'],
            'faculty_id' => $validated['faculty_id'],
            'semester_id' => $validated['semester_id'],
            'subject_id' => $validated['subject_id'],
            'file_path' => $filePath, // Store the file path directly
        ]);

        return redirect()->route('notes.index')->with('success', 'Notes updated successfully!');
    }

    // Remove the specified resource from storage.
    public function destroy(string $id)
    {
        $note = Solution::findOrFail($id);

        // Delete file if it exists
        if ($note->file_path) {
            $filePath = public_path($note->file_path); // Changed from 'storage/' to root
            if (file_exists($filePath)) {
                unlink($filePath); // Delete file
            }
        }

        // Delete the note
        $note->delete();

        return redirect()->route('notes.index')->with('success', 'Notes deleted successfully!');
    }
}
