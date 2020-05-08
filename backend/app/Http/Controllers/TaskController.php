<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Models\Task;

class TaskController extends Controller {

    /**
     * Get a list of all Tasks
     */
    public function list() {
        // we execute the list Method from the Task model to retrieve the list
        $taskList = Task::list();

        // we return the list and answer with a 200 HTTP Response
        return response()->json($taskList, Response::HTTP_OK);
    }

}
