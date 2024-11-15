<?php

namespace App\Http\Controllers;

use App\Models\OurTeam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OurTeamController extends Controller
{
    public function index()
    {
        $ourTeam = OurTeam::all();
        return Inertia::render('OurTeam/Index', [
            'ourTeam' => $ourTeam
        ]);
    }

    public function create()
    {
        return Inertia::render('OurTeam/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'designation' => 'required',
            'image' => 'required',
        ]);
        
       if($request->hasFile('image')){
        $image = $request->file('image');
        $imageName = time().'.'.$image->getClientOriginalExtension();
        $filePath = $request->file('image')->store('our-team', 'public');
       }

        OurTeam::create([
            'name' => $request->name,
            'designation' => $request->designation,
            'image' => $filePath,
        ]);

        return redirect()->route('our-team.index');
    }

    public function edit(string $id)
    {
        $ourTeam = OurTeam::findOrFail($id);
        return Inertia::render('OurTeam/Update', [
            'data' => $ourTeam
        ]);
    }

    public function update(Request $request, string $id)
    {
        $ourTeam = OurTeam::findOrFail($id);
        $request->validate([
            'name' => 'required',
            'designation' => 'required'
        ]);
        
        if($request->hasFile('image')){
            $oldFilePath = public_path($ourTeam->image);
            if (file_exists($oldFilePath)) {
                unlink($oldFilePath); // Delete old file
            }
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $filePath = $request->file('image')->store('our-team', 'public');
        
        $ourTeam->update([
            'name' => $request->name,
            'designation' => $request->designation,
            'image' => $filePath,
        ]);
    }
    else{
        $ourTeam->update([
            'name' => $request->name,
            'designation' => $request->designation,
        ]);
    }

        return redirect()->route('our-team.index');
    }

    public function destroy(string $id)
    {
        $ourTeam = OurTeam::findOrFail($id);
        $ourTeam->delete();
        return redirect()->route('our-team.index');
    }

}
