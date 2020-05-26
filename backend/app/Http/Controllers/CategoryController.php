<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Category;

class CategoryController extends Controller {

    /**
     * Method to retrieve a list of categories
     */
    public function list() {
        // Retrieve the list thanks to the list Method from Category Model
        $categoryList = Category::list();
        // Answer to the front including HTTP code
        return response()->json($categoryList, Response::HTTP_OK);
    }

    /**
     * Add a category
     */
    public function add(Request $request) {

        //* Received data from the front validation
        // https://lumen.laravel.com/docs/7.x/validation
        // https://laravel.com/docs/7.x
        // https://laravel.com/docs/7.x/validation#available-validation-rules
        $this->validate(
            $request,
            [
                'name'         =>  'required|min:1|max:64',
            ]
        );

        //* Instantiate a new object
        $category = new Category();
        //* Complete the new object
        $category->name        = $request->input('name');
        // Data with default values
        $category->status       = $request->input('status', 1);

        //* Save changes and answer to the front
        // in case of failure, answer with a server error
        if (!$category->save()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success, send the task to the front and answer that creation is ok
        return response()->json($category, Response::HTTP_CREATED);
    }
}
