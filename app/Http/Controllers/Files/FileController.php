<?php

namespace App\Http\Controllers\Files;

use App\Http\Controllers\Controller;
use App\Models\FileModel;
use Illuminate\Http\Request;

class FileController extends Controller
{

    public function store()
    {
        return (new FileModel)->store();
    }
}
