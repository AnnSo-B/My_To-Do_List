<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions
class Task extends Model
{
    /**
     * Method to retrieve a list of tasks
     *
     * @return taskList
     */
    static public function list() {

        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        return Task::all();
    }
}
