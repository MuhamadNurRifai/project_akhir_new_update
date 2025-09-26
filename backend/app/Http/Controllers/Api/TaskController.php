<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        return $project->tasks()->with('assignee')->get();
    }

    public function store(Request $request, Project $project)
    {
        $data = $request->validate([
            'title' => 'required',
            'assigned_to' => 'nullable|exists:users,id',
            'description' => 'nullable',
            'status' => 'in:todo,in_progress,review,done',
            'due_date' => 'nullable|date',
            'priority' => 'in:low,medium,high',
        ]);

        $task = $project->tasks()->create($data);
        return response()->json($task);
    }

    public function show(Task $task)
    {
        return $task->load('project', 'assignee');
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
