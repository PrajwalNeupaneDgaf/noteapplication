<?php

namespace App\Http\Controllers\FrontendController;

use App\Http\Controllers\Controller;
use App\Models\OurTeam;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index(){
        $ourTeam = OurTeam::all();
        return Inertia::render('Website/HomePage/Main',[
            'ourTeam' => $ourTeam
        ]);
    }
  
}
