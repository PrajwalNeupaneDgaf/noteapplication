<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Syllabus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SyllabusController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $faculty = Faculty::all();
        $syllabus = Syllabus::with('faculty')->get();
        $dataToSend = $syllabus->map(function ($item, $index) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'faculty_id' => $item->faculty_id,
                'faculty' => $item->faculty->name,
                'sn' => $index + 1
            ];
        });
        return Inertia::render('Admin/Activities/Syllabus/Index', [
            'faculties' => $faculty,
            'syllabus' => $dataToSend,
        ]);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
{
    // Validate request
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'faculty_id' => 'required|exists:faculties,id',
        'file' => 'required|file|mimes:pdf,docx|max:2048',
    ]);

    // Handle file upload
    $filePath = null; // Initialize file path variable
    if ($request->hasFile('file')) {
        // Generate a unique filename to avoid overwriting
        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName(); // Generate unique filename
        $destinationPath = public_path('syllabus_files'); // Set destination path

        // Move the file to the public directory
        $file->move($destinationPath, $filename);
        $filePath = 'syllabus_files/' . $filename; // Save the file path
    }

    // Create new syllabus
    Syllabus::create([
        'name' => $validated['name'],
        'faculty_id' => $validated['faculty_id'],
        'file_path' => $filePath, // Store the file path directly
    ]);

    return redirect()->route('syllabus.index')->with('success', 'Syllabus created successfully!');
}

       public function edit(string $id)
    {
        $syllabus = Syllabus::findOrFail($id);
        $faculty = Faculty::all();

        return Inertia::render('Admin/Activities/Syllabus/Update', [
            'syllabus' => $syllabus,
            'data' => $faculty,
        ]);
    }

    // Update the specified resource in storage.
    public function update(Request $request, string $id)
{
   
    // Validate request
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'faculty_id' => 'required|exists:faculties,id',
        'file' => 'nullable|file|mimes:pdf,docx|max:2048',
    ]);

    $syllabus = Syllabus::findOrFail($id);
    $filePath = $syllabus->file_path;    
    if ($request->hasFile('file')) {
        if ($syllabus->file_path) {
            $oldFilePath = public_path($syllabus->file_path); // Changed from 'storage/' to root
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath); // Delete old file
            }
        }

        // Generate a unique filename to avoid overwriting
        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName(); // Generate unique filename
        $destinationPath = public_path('syllabus_files'); // Set destination path

        // Move the file to the public directory
        $file->move($destinationPath, $filename);
        $filePath = 'syllabus_files/' . $filename; // Save the new file path
    }

    // Update syllabus
    $syllabus->update([
        'name' => $validated['name'],
        'faculty_id' => $validated['faculty_id'],
        'file_path' => $filePath, // Store the file path directly
    ]);
    return redirect()->route('syllabus.index')->with('success', 'Syllabus updated successfully!');
}


    // Remove the specified resource from storage.
    public function destroy(string $id)
    {
        $syllabus = Syllabus::findOrFail($id);
    
        // Delete file if it exists
        if ($syllabus->file_path) {
            $filePath = public_path($syllabus->file_path); // No need for 'storage/' as the path is now direct
            if (file_exists($filePath)) {
                unlink($filePath); // Delete the file
            }
        }
    
        // Delete the syllabus
        $syllabus->delete();
    
        return redirect()->route('syllabus.index')->with('success', 'Syllabus deleted successfully!');
    }
}
