<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Config\AccountTypeController;
use App\Http\Controllers\Config\CourseConfigController;
use App\Http\Controllers\Config\DegreeController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\ScholarshipManagement\ScholarshipManagementController;
use App\Http\Controllers\ScholarshipType\ScholarshipTypeController;
use App\Http\Controllers\UserManagement\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public Routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
});

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Scholarship Type 
Route::controller(ScholarshipTypeController::class)->prefix('scholarship-type')->group(function () {
    Route::post('/index', 'index');
    Route::post('/store', 'store');
});

// User Management
Route::controller(UserManagementController::class)->prefix('user-management')->group(function () {
    Route::post('/create', 'create');
});

// Scholarship Management
Route::controller(ScholarshipManagementController::class)->prefix('scholarship-management')->group(function () {
    Route::post('create', 'create');
});

// Profile Information\
Route::controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::post('/show', 'index');
    Route::post('/update', 'update');
    Route::post('/password-update', 'password');
});

// Config
Route::controller(CourseConfigController::class)->prefix('course')->group(function () {
    Route::get('/show', 'show');
    Route::post('/store', 'store');
});

Route::controller(AccountTypeController::class)->prefix('account-type')->group(function () {
    Route::get('show', 'show');
    Route::get('store', 'store');
});

Route::controller(DegreeController::class)->prefix('degree')->group(function () {
    Route::get('show', 'show');
    Route::get('store', 'store');
});
