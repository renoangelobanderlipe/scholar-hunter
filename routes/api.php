<?php

use App\Http\Controllers\Auth\AuthController;
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
    });

    Route::controller(UserManagementController::class)->prefix('user')->group(function () {
        Route::get('show', 'show');
    });

    Route::controller(ScholarshipController::class)->prefix('scholarship')->group(function () {
        Route::get('index', 'index');
        Route::post('store', 'store');
    });

    Route::controller(HomePageController::class)->prefix('home')->group(function () {
        Route::get('foundation', 'foundation');
        Route::get('scholars', 'scholars');
    });

    // Role Listener
    Route::controller(RoleListenerController::class)->prefix('listener')->group(function () {
        Route::get('listen', 'index');
    });

    // 
    Route::controller()->prefix('role')->group(function () {
        Route::get('check', 'check');
    });
});
