<?php

namespace App\Http\Controllers\HomePage;

use App\Http\Controllers\Controller;
use App\Models\Foundation;
use App\Models\HomePageModel;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    protected $home;

    public function __construct(HomePageModel $home)
    {
        $this->home = $home;
    }

    public function applicantStatus(Request $request)
    {
        return $this->home->foundationStatus($request->all()['type']);
    }

    public function scholarshipTotal(Request $request)
    {
        return $this->home->totalScholarship($request->all()['type']);
    }

    public function all()
    {
        return $this->home->totalAll();
    }

    public function status()
    {
        return $this->home->userTypes();
    }

    // Total Scholars, Foundations, Scholarships,
    // Total user in a scholarships
    // Approved User, Pending

}
