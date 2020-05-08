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
 * Endpoint to create a task
 */
$router->post(
    '/tasks',
    [
        'uses' => 'TaskController@add',
        'as' => 'task_add'
    ]
);
