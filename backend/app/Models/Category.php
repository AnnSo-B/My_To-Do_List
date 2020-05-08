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
     * Method to retrieve a list of categories
     */
    static public function list() {
        // https://laravel.com/docs/7.x/eloquent#retrieving-models
        return Category::all();
    }

    /**
     * Relationship with Tasks
     * https://laravel.com/docs/7.x/eloquent-relationships#introduction
     */
    public function tasks() {
        return $this->hasMany('App\Models\Task');
    }
}
