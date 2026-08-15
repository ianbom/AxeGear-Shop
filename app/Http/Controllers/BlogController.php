<?php

namespace App\Http\Controllers;

use App\Services\Customer\BlogBrowsingService;
use Illuminate\Http\Request;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request, BlogBrowsingService $blog): Response
    {
        return inertia('blog/index', $blog->indexData($request));
    }

    public function show(string $slug, BlogBrowsingService $blog): Response
    {
        return inertia('blog/show', $blog->showData($slug));
    }
}
