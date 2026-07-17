<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CollectionRequest;
use App\Models\Collection;
use App\Services\Admin\CollectionManagementService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CollectionController extends Controller
{
    public function index(Request $request, CollectionManagementService $collections): Response
    {
        return inertia('admin/collections/index', $collections->indexData($request));
    }

    public function create(): Response
    {
        return inertia('admin/collections/form', [
            'mode' => 'create',
            'collection' => null,
        ]);
    }

    public function store(CollectionRequest $request, CollectionManagementService $collections): RedirectResponse
    {
        $collections->create($request);

        return redirect()->route('admin.collections.index')->with('success', 'Collection berhasil dibuat.');
    }

    public function edit(Collection $collection): Response
    {
        $collection->load(['products' => function ($query) {
            $query->select('products.id', 'name', 'status', 'regular_price', 'sale_price')
                ->with('primaryImage:id,product_id,image_url')
                ->latest('products.created_at');
        }]);

        return inertia('admin/collections/form', [
            'mode' => 'edit',
            'collection' => $collection,
        ]);
    }

    public function update(CollectionRequest $request, Collection $collection, CollectionManagementService $collections): RedirectResponse
    {
        $collections->update($collection, $request);

        return redirect()->route('admin.collections.index')->with('success', 'Collection berhasil diperbarui.');
    }

    public function destroy(Collection $collection, CollectionManagementService $collections): RedirectResponse
    {
        $collections->delete($collection);

        return redirect()->route('admin.collections.index')->with('success', 'Collection berhasil dihapus.');
    }
}
