<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; // Import Auth facade

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all(); // Get all users
        return Inertia::render('Admin/Users/Index', ['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Logic for storing a new resource can be added here
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Logic for showing a specific resource can be added here
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the user by ID
        $user = User::findOrFail($id); // Use findOrFail to automatically handle not found

        // Check if the current user is not trying to promote/demote themselves
        if ($user->email === Auth::user()->email) {
            return redirect()->route('users.index')->with('error', 'You cannot modify your own admin status.');
        }

        // Toggle the is_admin status
        $user->is_admin = !$user->is_admin;
        $user->save(); // Save the updated user status

        // Provide a success message
        return redirect()->route('users.index')->with('success', 'User role updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Logic for deleting a specific resource can be added here
    }
}
