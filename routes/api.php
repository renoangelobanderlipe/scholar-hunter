<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Foundation\FoundationController;
use App\Http\Controllers\HomePage\HomePageController;
use App\Http\Controllers\RoleListener\RoleListenerController;
use App\Http\Controllers\Scholarship\ScholarshipController;
use App\Http\Controllers\UserManagement\UserManagementController;
use App\Models\RoleListener;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});


Route::middleware('auth:sanctum')->group(function () {
    // Authentication
    Route::controller(AuthController::class)->prefix('auth')->group(function () {
        Route::post('logout', 'logout');
        Route::post('update/profile', 'updateProfile');
        Route::post('update/password', 'updatePassword');
        Route::get('show', 'show');
        Route::get('all', 'all');
    });

    Route::controller(UserManagementController::class)->prefix('user')->group(function () {
        Route::get('show', 'show');
        Route::post('update', 'update');
        Route::post('create', 'create');
        Route::delete('destroy', 'destroy');
    });

    Route::controller(ScholarshipController::class)->prefix('scholarship')->group(function () {
        Route::get('index', 'index');
        Route::post('create', 'create');
        Route::get('list', 'all');
        Route::post('store', 'store');
        Route::get('search', 'search');
    });

    Route::controller(FoundationController::class)->prefix('foundation')->group(function () {
        Route::post('store', 'store');
        Route::delete('destroy', 'destroy');
    });

    Route::controller(HomePageController::class)->prefix('home')->group(function () {
        Route::get('foundation', 'foundation');
        Route::get('scholars', 'scholars');
        Route::get('status', 'userStatus');
    });

    // Role Listener
    Route::controller(RoleListenerController::class)->prefix('listener')->group(function () {
        Route::get('/', 'index');
    });
});
