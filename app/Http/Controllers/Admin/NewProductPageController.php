<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NewProductPageRequest;
use App\Services\Admin\NewProductPageManagementService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class NewProductPageController extends Controller
{
    public function edit(NewProductPageManagementService $pages): Response
    {
        return inertia('admin/new-product/form', $pages->formData($pages->page()));
    }

    public function update(NewProductPageRequest $request, NewProductPageManagementService $pages): RedirectResponse
    {
        $pages->update($pages->page(), $request->validated());

        return back()->with('success', 'New Product page berhasil diperbarui.');
    }
}
