<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $semester= Semester::all();
        $faculties = Faculty::all();
        $FacultySend = $faculties->map(function ($faculties){
            return [
                "id"=> $faculties->id,
                "name"=> $faculties->name,
            ];
        });
        $semesterData = $semester->map(function ($semester,$index){
            return [
                "id"=> $semester->id,
                "sn"=>$index+1,
                "name"=> $semester->name,
                "faculty"=>Faculty::where('id',$semester->faculty_id)->first()->name,
            ];
        });
        return Inertia::render('Admin/Semester/Index',[
            'data'=> $semester,
            'facultyData'=> $FacultySend,
            'semesterData'=> $semesterData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name"=> "required| array",
            "faculty_id"=> "required",
        ]);
        foreach ( $validated['name']  as $name) {
            Semester::create([
                "name"=>$name,
                "faculty_id"=>$validated['faculty_id'],
            ]);
        }
        return redirect()->route("semester.index")->with("success");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Semester::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            "name"=> "required",
            "faculty_id"=> "required",
        ]);
        Semester::findOrFail($id)->update($validated);
        return redirect()->route("semester.index")->with("success");
    }

    public function edit($id){
       $data = Semester::findOrFail($id);
       $faculties = Faculty::all();
       $FacultySend = $faculties->map(function ($faculties){
        return [
            "id"=> $faculties->id,
            "name"=> $faculties->name,
        ];
    });
       return Inertia::render('Admin/Semester/Update',[
        'setdata'=> $data,
        'facultyData'=> $FacultySend
       ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Semester::destroy($id);
        return redirect()->route('semester.index')->with('success');
    }
}
