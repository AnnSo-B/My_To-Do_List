<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


/*
|--------------------------------------------------------------------------
| categories Endpoints
|--------------------------------------------------------------------------
*/

/**
 * Endpoint to get categoryList
 */
$router->get(
    '/categories',
    [
        'uses'  =>  'CategoryController@list',
        'as'    =>  'category_list'
    ]
);


/*
|--------------------------------------------------------------------------
| tasks Endpoints
|--------------------------------------------------------------------------
*/

/**
 * Endpoint to retrieve a task list
 */
$router->get(
    '/tasks',
    [
        'uses'  =>  'TaskController@list',
        'as'    =>  'task_list'
    ]
);

/**
 * Endpoint to retrieve a list of tasks according to their status
 */
$router->get(
    '/tasks/status/{status}',
    [
        'uses'  =>  'TaskController@statusFilteredList',
        'as'    =>  'task_list_by_status'
    ]
);

/**
 * Endpoint to retrieve a list of tasks according to their category
 */
$router->get(
    '/tasks/category/{category}',
    [
        'uses'  =>  'TaskController@categoryFilteredList',
        'as'    =>  'task_list_by_category'
    ]
);

/**
 * Endpoint to create a task
 */
$router->post(
    '/tasks',
    [
        'uses' => 'TaskController@add',
        'as' => 'task_add'
    ]
);


/**
 * Endpoint to update a task according to the provided id
 */
$router->put(
    '/tasks/{id}',
    [
        'uses' => 'TaskController@update',
        'as' => 'task_update'
    ]
);

/**
 * Endpoint to delete a task according to the provided id
 */
$router->delete(
    '/tasks/{id}',
    [
        'uses' => 'TaskController@delete',
        'as' => 'task_delete'
    ]
);
