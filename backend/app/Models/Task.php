<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions
class Task extends Model
{
    /**
     * Default values
     */
    const STATUS_TODO = 1;
    const STATUS_DONE = 2;
    const STATUS_ARCHIVED = 3;


    /**
     * Relationship with categories
     * https://laravel.com/docs/7.x/eloquent-relationships#introduction
     */
    public function category() {
        return $this->belongsTo('App\Models\Category');
    }

    /**
     * Method to retrieve a list of tasks
     *
     * @return [array] taskList
     */
    static public function list() {

        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        // we'll get categories at the same time
        // return Task::all()->load('category');
        return Task::where('status', '<>',3)->get()->load('category');
    }

    /**
     * Method to retrieve a list of tasks according to their status
     *
     * @param [int] $statusCode
     * @return [array] taskList
     */
    static public function getTaskByStatus($statusCode) {
        return Task::where('status', $statusCode)->get()->load('category');
    }
}
