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
     * Get a list of Tasks according to their status
     */
    public function statusFilteredList(Request $request, int $status) {

        //* we execute the list Method from the Task model to retrieve the list
        $taskList = Task::getTaskByStatus($status);

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

    /**
     *  Update task
     *
     * @param Request $request HTTP request Object
     * @param int $id task id - argument sent by Lumen - from PUT request
     */
    public function update(Request $request, int $id) {

        //* Find and check if the task exists
        $task = Task::findOrFail($id);

        //* Data validation
        // https://lumen.laravel.com/docs/7.x/validation
        // https://laravel.com/docs/7.x
        // https://laravel.com/docs/7.x/validation#available-validation-rules
        $this->validate(
            $request,
            [
                'title'          => 'max:128',
                'status'         => 'integer|in:1,2,3', // must be 1 or 2 or 3
                'completion'     => 'integer|min:0|max:100',
                'categoryId'     => 'integer|exists:categories,id'
            ]
        );

        //* Complete the new object
        $task->title        = $request->input('title', $task->title);
        $task->category_id  = $request->input('categoryId', $task->category_id);
        $task->completion   = $request->input('completion', $task->completion);
        $task->status       = $request->input('status', $task->status);

        //* Link to the corresponding category
        $task->load('category');

        //* Save changes and answer to the front
        // in case of failure, answer with a server error
        if (!$task->save()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success, send the task to the front and answer that creation is ok
        return response()->json($task, Response::HTTP_OK);
    }

    /**
     * Delete a task
     *
     * @param Request $request HTTP request Object
     * @param int $id task id - argument sent by Lumen - from DELETE request
     */
    public function delete(Request $request, int $id) {

        // find the task and check if it exists
        // if it doesn't send an error
        if (!Task::find($id)) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $task = Task::find($id);

        // deletion and answer to the front
        // in case of failure
        if (!$task->delete()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success
        return response('', Response::HTTP_NO_CONTENT);
    }
}
