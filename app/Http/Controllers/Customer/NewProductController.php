<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\Customer\NewProductPageService;
use Inertia\Response;

class NewProductController extends Controller
{
    public function __invoke(NewProductPageService $pages): Response
    {
        return inertia('new-product/index', $pages->data());
    }
}
