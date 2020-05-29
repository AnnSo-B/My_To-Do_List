<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// https://laravel.com/docs/7.x/eloquent#eloquent-model-conventions
class Category extends Model {

    /**
     * Default values
     */
    const ACTIVE = 1;
    const INACTIVE = 2;

    /**
     * Relationship with Tasks
     * https://laravel.com/docs/7.x/eloquent-relationships#introduction
     */
    public function tasks() {
        return $this->hasMany('App\Models\Task');
    }

    /**
     * Method to retrieve a list of categories
     */
    static public function list() {
        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        return Category::orderBy('name')->get();
    }

    /**
     * Method to retrieve a list of active categories
     */
    static public function getActiveCategories() {
        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        return Category::where('status', 1)->orderBy('name')->get();
    }

    /**
     * Method to retrieve a list of active categories with their associated tasks
     */
    static public function getTasksByCategory($category) {
        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        return Category::where('id', $category)->get()->load('tasks');
    }
}
