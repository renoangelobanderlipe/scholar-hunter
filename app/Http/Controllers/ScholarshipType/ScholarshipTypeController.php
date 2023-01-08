<?php

namespace App\Http\Controllers\ScholarshipType;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ScholarshipTypeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        dd('test');
    }
}
