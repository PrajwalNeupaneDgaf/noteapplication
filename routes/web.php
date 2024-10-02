<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectsController;
use App\Http\Controllers\SyllabusController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\FrontendController\HomepageController;
use App\Http\Controllers\FrontendController\FacultiesController as Faculties;
use App\Http\Controllers\FrontendController\NoteDetailsController;
use App\Http\Controllers\FrontendController\NotesQuestionController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomepageController::class,'index'])->name('home');

Route::get('/check-result', [HomepageController::class,'checkResult'])->name('check-result');

Route::get('/faculty={faculty_short}',[Faculties::class,'details']);

Route::get('/faculty={faculty_short}/semester={semester}',[NotesQuestionController::class,'index']);

Route::get('/faculty={faculty_short}/semester={semester}/subject={subject}/{note_id}',[NoteDetailsController::class,'index']);


// Route::get('/admin',[BasicController::class ,'index'])->name('admin');


Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::resource('/faculty',FacultyController::class);
    
    Route::resource('/semester',SemesterController::class);
    
    Route::resource('/subject', SubjectsController::class);

    Route::resource('/syllabus',SyllabusController::class);

    Route::resource('/notes',NotesController::class);

    Route::resource('/questions',QuestionsController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Route::resource('/activities',SyllabusNotesQuestionController::class);

    //Route::resource('/activities',ActivitiesController::class);
});
 
require __DIR__.'/auth.php';
