<?php

namespace App\Providers;
use App\Models\Faculty;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        Inertia::share([
            'faculties' => Faculty::all(), // Fetch and share faculties
        ]);

        
        // view()->composer('*', function($view)
        // {
        //     //check language
           


        //     $faculties = Faculty::all();
        //     \Inertia\Inertia::share('faculties', $faculties);
           
        
        // });
    }
}
