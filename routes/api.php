<?php

use App\Http\Controllers\ActivityLogsController;
use App\Http\Controllers\Application\ApplicationController;
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
        Route::delete('logout', 'destroyAuth');
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
        Route::put('unauthorize', 'unathorizeUser');
    });

    Route::controller(ScholarshipController::class)->prefix('scholarship')->group(function () {
        Route::get('index', 'index');
        Route::post('create', 'create');
        Route::get('list', 'all');
        Route::post('store', 'store');
        Route::get('search', 'search');
        Route::get('list/scholarship', 'scholarships');
        Route::get('list/scholars', 'scholarsList');
        Route::delete('destroy', 'scholarshipDestroy');
        Route::get('download', 'download');
        Route::post('approve', 'approve');
        Route::post('cancel', 'cancel');
        Route::put('edit', 'edit');
        Route::get('foundation/list', 'foundationList');
        Route::get('foundation/search', 'foundationSearch');
    });

    Route::controller(ApplicationController::class)->prefix('application')->group(function () {
        Route::get('/', 'index');
    });

    Route::controller(FoundationController::class)->prefix('foundation')->group(function () {
        Route::post('store', 'store');
        Route::delete('destroy', 'destroy');
    });

    Route::controller(HomePageController::class)->prefix('home')->group(function () {
        /**Foundation */
        Route::get('show', 'applicantStatus');
        Route::get('show/all', 'scholarshipTotal');
        Route::get('all', 'all');
        Route::get('status', 'status');
    });

    // Role Listener
    Route::controller(RoleListenerController::class)->prefix('listener')->group(function () {
        Route::get('/', 'index');
        Route::post('status', 'authStatus');
    });

    Route::controller(ActivityLogsController::class)->prefix('logs')->group(function () {
        Route::get('/', 'show');
    });
});
