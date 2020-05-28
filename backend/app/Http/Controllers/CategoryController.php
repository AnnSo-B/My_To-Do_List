<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Category;
use Illuminate\Database\Schema\ForeignIdColumnDefinition;

class CategoryController extends Controller {

    /**
     * Method to retrieve a list of categories
     */
    public function list() {
        // Retrieve the list of active categories thanks to the getActiveCategories Method from Category Model
        $categoryList = Category::getActiveCategories();
        // Answer to the front including HTTP code
        return response()->json($categoryList, Response::HTTP_OK);
    }

    /**
     * Method to retrieve a list of categories with their associated tasks
     */
    public function tasksByCategoryList($category) {
        // Retrieve the list of active categories thanks to the getActiveCategories Method from Category Model
        $categoryList = Category::getTasksByCategory($category);
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

    /**
     * Update a category
     *
     * @param Request $request HTTP request Object
     * @param int $id category id - argument sent by Lumen - from PUT request
     */
    public function update(Request $request, int $id) {

        //* Find and check if the category exists
        $category = Category::findOrFail($id);

        //* Data validation
        // https://lumen.laravel.com/docs/7.x/validation
        // https://laravel.com/docs/7.x
        // https://laravel.com/docs/7.x/validation#available-validation-rules
        $this->validate(
            $request,
            [
                'name'      => 'max:64',
                'status'    => 'integer|in:1,2', // must be 1 or 2
            ]
        );

        //* Complete the object
        $category->name        = $request->input('name', $category->name);
        $category->status       = $request->input('status', $category->status);

        //* Save changes and answer to the front
        // in case of failure, answer with a server error
        if (!$category->save()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success, send the task to the front and answer that creation is ok
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Delete a category
     *
     * @param Request $request HTTP request Object
     * @param int $id category id - argument sent by Lumen - from DELETE request
     */
    public function delete(int $id) {

        // find the category and check if it exists
        // if it doesn't send an error
        if (!Category::find($id)) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $category = Category::find($id);

        // deletion and answer to the front
        // in case of failure
        if (!$category->delete()) {
            return abort(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        // in case of success
        return response('', Response::HTTP_NO_CONTENT);
    }
}
