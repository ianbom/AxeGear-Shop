<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryImageRequest;
use App\Models\GalleryImage;
use App\Services\Admin\GalleryImageManagementService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class GalleryImageController extends Controller
{
    public function index(Request $request, GalleryImageManagementService $gallery): Response
    {
        return inertia('admin/gallery/index', $gallery->indexData($request));
    }

    public function create(GalleryImageManagementService $gallery): Response
    {
        return inertia('admin/gallery/form', [
            'mode' => 'create',
            'image' => null,
            'categories' => $gallery->categories(),
        ]);
    }

    public function store(GalleryImageRequest $request, GalleryImageManagementService $gallery): RedirectResponse
    {
        $gallery->create($request);

        return redirect()->route('admin.gallery.index')->with('success', 'Gambar gallery berhasil dibuat.');
    }

    public function edit(GalleryImage $galleryImage, GalleryImageManagementService $gallery): Response
    {
        $galleryImage->load('categories');

        return inertia('admin/gallery/form', [
            'mode' => 'edit',
            'image' => $gallery->row($galleryImage),
            'categories' => $gallery->categories(),
        ]);
    }

    public function update(GalleryImageRequest $request, GalleryImage $galleryImage, GalleryImageManagementService $gallery): RedirectResponse
    {
        $gallery->update($galleryImage, $request);

        return redirect()->route('admin.gallery.index')->with('success', 'Gambar gallery berhasil diperbarui.');
    }

    public function destroy(GalleryImage $galleryImage, GalleryImageManagementService $gallery): RedirectResponse
    {
        $gallery->delete($galleryImage);

        return redirect()->route('admin.gallery.index')->with('success', 'Gambar gallery berhasil dihapus.');
    }
}
