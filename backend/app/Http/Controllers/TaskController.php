<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Task;

class TaskController extends Controller {

    /**
     * Get a list of all Tasks
     */
    public function list() {
        //* we execute the list Method from the Task model to retrieve the list
        $taskList = Task::list();

        //* we return the list and answer with a 200 HTTP Response
        return response()->json($taskList, Response::HTTP_OK);
    }

    /**
     * Add a task
     */
     public function add(Request $request) {

        //* Received data from the front validation
        // https://lumen.laravel.com/docs/7.x/validation
        // https://laravel.com/docs/7.x
        // https://laravel.com/docs/7.x/validation#available-validation-rules
        $this->validate(
            $request,
            [
                'title'         =>  'required|min:1|max:128',
                'categoryId'    =>  'required|integer|exists:categories,id'
            ]
        );

        //* Instantiate a new object
        $task = new Task;
        //* Complete the new object
        $task->title        = $request->input('title');
        $task->category_id  = $request->input('categoryId');
        // Data with default values
        $task->completion   = $request->input('completion', 0);
        $task->status       = $request->input('status', Task::STATUS_TODO);

        //* Link to the corresponding category
        $task->load('category');

        //* Save changes and answer to the front
        // in case of failure, answer with a server error
        if (!$task->save()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success, send the task to the front and answer that creation is ok
        return response()->json($task, Response::HTTP_CREATED);
    }

}
