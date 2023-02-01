<?php

use App\Http\Controllers\Auth\AuthController;
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
    });

    // 
    Route::controller()->prefix('role')->group(function () {
        Route::get('check', 'check');
    });
});
