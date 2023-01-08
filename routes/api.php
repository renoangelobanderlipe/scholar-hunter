<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\ScholarshipManagement\ScholarshipManagementController;
use App\Http\Controllers\ScholarshipType\ScholarshipTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Scholarship Type 
Route::prefix('scholarship-type')->group(function () {
    Route::post('/index', [ScholarshipTypeController::class, 'index']);
    Route::post('/store', [ScholarshipTypeController::class, 'store']);
});

// User Management
Route::prefix('user-management')->group(function () {
    Route::post('/create', [UserManagementController::class, 'create']);
});

// Scholarship Management
Route::prefix('scholarship-management')->group(function () {
    Route::post('create', [ScholarshipManagementController::class, 'create']);
});

// Profile Information
Route::prefix('profile')->group(function () {
    Route::post('/show', [ProfileController::class, 'show']);
    Route::post('/update', [ProfileController::class, 'update']);
    Route::post('/password-update', [ProfileController::class, 'password']);
});
