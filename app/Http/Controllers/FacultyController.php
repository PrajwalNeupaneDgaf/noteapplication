<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    public function index(){
        $faculties = Faculty::all();
      
        return Inertia::render('Admin/Faculty/Index',['data'=>$faculties]);
    }
    public function store(Request $request){
      
       // Validate the incoming request
       $validated = $request->validate([
        'name' => 'required|string',
        'short' => 'required|string',
    ]);

    // Create a new faculty record
    Faculty::create($validated);

    // Redirect back with a success message
    return redirect()->route('faculty.index')->with('success', 'Successfully Done');
    }

    public function show(Faculty $id)
    {
        // Fetch the user by ID
        $faculty = Faculty::findOrFail($id);

        // Return to Inertia component
        return Inertia::render('Users/Show', [
            'user' => $faculty
        ]);
    } 
    
    public function update(Request $request, $id)
{
    $data = $request->validate([
        'name' => 'required|string', 
        'short' => 'required|string',
    ]);

    $item = Faculty::findOrFail($id);
    $item->update($data);

    return redirect()->route('faculty.index');
    
}
public function edit($id)
    {
        $faculty = Faculty::findOrFail($id);
        return Inertia::render('Admin/Faculty/Update', [
            'faculty' => $faculty
        ]);
    }
    public function destroy(Faculty $faculty){
        $faculty->delete();
       
    }


}
