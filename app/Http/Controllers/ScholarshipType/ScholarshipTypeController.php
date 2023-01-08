<?php

namespace App\Http\Controllers\ScholarshipType;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Models\ScholarshipType;
use App\Models\ScholarshipTypeModel;
use Illuminate\Http\Request;

class ScholarshipTypeController extends Controller
{
    public function index()
    {
        $response = ScholarshipTypeModel::index();

        return response()->json($response, 200);
    }

    public function store()
    {
        dd('store');
    }
}
