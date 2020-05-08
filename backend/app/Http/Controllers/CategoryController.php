<?php

namespace App\Http\Controllers;

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
}
