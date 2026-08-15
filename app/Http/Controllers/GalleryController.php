<?php

namespace App\Http\Controllers;

use App\Services\Customer\GalleryBrowsingService;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __invoke(GalleryBrowsingService $gallery): Response
    {
        return inertia('gallery/index', $gallery->data());
    }
}
