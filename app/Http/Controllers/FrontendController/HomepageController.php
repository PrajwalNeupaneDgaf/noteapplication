<?php

namespace App\Http\Controllers\FrontendController;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index(){
        return Inertia::render('Website/HomePage/Main');
    }
  
}
