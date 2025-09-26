<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::with('client')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'client_id' => 'required|exists:users,id',
            'status' => 'required|in:active,completed,archived',
        ]);

        $project = Project::create($request->all());
        return response()->json($project);
    }

    public function show(Project $project)
    {
        return $project->load('client');
    }

    public function update(Request $request, Project $project)
    {
        $project->update($request->all());
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
