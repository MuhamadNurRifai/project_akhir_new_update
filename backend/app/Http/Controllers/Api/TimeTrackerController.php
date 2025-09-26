<?php 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TimeTracker;

class TimeTrackerController extends Controller
{
    public function index()
    {
        return TimeTracker::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'start_time' => 'required|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
        ]);

        $tracker = TimeTracker::create($validated);

        return response()->json($tracker, 201);
    }

    public function show(TimeTracker $timeTracker)
    {
        return $timeTracker;
    }

    public function update(Request $request, TimeTracker $timeTracker)
    {
        $validated = $request->validate([
            'start_time' => 'sometimes|date',
            'end_time' => 'nullable|date|after_or_equal:start_time',
        ]);

        $timeTracker->update($validated);

        return response()->json($timeTracker);
    }

    public function destroy(TimeTracker $timeTracker)
    {
        $timeTracker->delete();

        return response()->json(null, 204);
    }
}
