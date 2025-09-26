<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientController;
use App\Exports\TasksExport;
use App\Imports\TasksImport;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ========== AUTH ==========
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// ========== ADMIN USERS ==========
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('users/{user}', [UserController::class, 'destroy']);
});

// ========== PROJECTS ==========
Route::middleware('auth:sanctum')->apiResource('projects', ProjectController::class);

// ========== CLIENTS ==========
Route::middleware('auth:sanctum')->apiResource('clients', ClientController::class);

// ========== TASKS EXPORT / IMPORT ==========
Route::get('/tasks/export', function () {
    return Excel::download(new TasksExport, 'tasks.xlsx');
});

Route::post('/tasks/import', function (Request $request) {
    $file = $request->file('file');
    Excel::import(new TasksImport, $file);
    return response()->json(['message' => 'Tasks imported successfully']);
});

Route::get('/export', function () {
    return Excel::download(new TasksExport, 'tasks.xlsx');
});
