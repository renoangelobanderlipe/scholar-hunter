<?php

use App\Http\Controllers\Application\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Config\AccountTypeController;
use App\Http\Controllers\Config\ConfigController;
use App\Http\Controllers\Config\CourseConfigController;
use App\Http\Controllers\Config\DegreeController;
use App\Http\Controllers\Foundation\FoundationController;
use App\Http\Controllers\Posting\PostingController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Scholarship\ScholarshipController;
use App\Http\Controllers\ScholarshipManagement\ScholarshipManagementController;
use App\Http\Controllers\ScholarshipType\ScholarshipTypeController;
use App\Http\Controllers\User\ChangeUserStatusController;
use App\Http\Controllers\User\UserController;
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
Route::controller(ConfigController::class)->prefix('config')->group(function () {
    Route::get('/show', 'show');
    Route::post('/store', 'store');
});

Route::controller(UserManagementController::class)->prefix('user-management')->group(function () {
    Route::post('/update', 'store');
});

// users
Route::controller(UserController::class)->group(function () {

    Route::get('/users', 'index')
        ->name('api.users.index');

    Route::post('/users', 'store')
        ->name('api.users.store');

    Route::get('/users/{user}', 'show')
        ->name('api.users.show');
});

// changing status endpoint for users
Route::post('/users/{user}/status', ChangeUserStatusController::class)
    ->name('api.users.status');


// foundations
Route::controller(FoundationController::class)->group(function () {

    Route::get('/foundations', 'index')
        ->name('api.foundations.index');

    Route::post('/foundations', 'store')
        ->name('api.foundations.store');

    Route::get('/foundations/{foundation}', 'show')
        ->name('api.foundations.show');
});

// scholarships
Route::controller(ScholarshipController::class)->group(function () {

    Route::get('/scholarships', 'index')
        ->name('api.scholarships.index');

    Route::post('/scholarships', 'store')
        ->name('api.scholarships.store');

    Route::get('/scholarships/{scholarship}', 'show')
        ->name('api.scholarships.show');
});

// postings
Route::controller(PostingController::class)->group(function () {

    Route::get('/postings', 'index')
        ->name('api.postings.index');

    Route::post('/postings', 'store')
        ->name('api.postings.store');

    Route::get('/postings/{posting}', 'show')
        ->name('apo.postings.show');
});


// application
Route::controller(ApplicationController::class)->group(function () {

    Route::get('/applications', 'index')
        ->name('api.applications.index');

    Route::post('/applications', 'store')
        ->name('api.applications.store');

    Route::get('/applications/{application}', 'show')
        ->name('apo.applications.show');
});