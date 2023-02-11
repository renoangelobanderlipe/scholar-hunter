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

    public function foundation(Request $request)
    {
        return $this->home->foundationCount($request->type);
    }

    public function scholars(Request $request)
    {
        return $this->home->scholarsCount($request->type);
    }
}
