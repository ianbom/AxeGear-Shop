<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlogArticleRequest;
use App\Models\BlogArticle;
use App\Services\Admin\BlogArticleManagementService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class BlogArticleController extends Controller
{
    public function index(Request $request, BlogArticleManagementService $articles): Response
    {
        return inertia('admin/blogs/index', $articles->indexData($request));
    }

    public function create(): Response
    {
        return inertia('admin/blogs/form', ['mode' => 'create', 'article' => null]);
    }

    public function store(BlogArticleRequest $request, BlogArticleManagementService $articles): RedirectResponse
    {
        $articles->create($request);

        return redirect()->route('admin.blogs.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(BlogArticle $blogArticle, BlogArticleManagementService $articles): Response
    {
        return inertia('admin/blogs/form', ['mode' => 'edit', 'article' => $articles->row($blogArticle)]);
    }

    public function update(BlogArticleRequest $request, BlogArticle $blogArticle, BlogArticleManagementService $articles): RedirectResponse
    {
        $articles->update($blogArticle, $request);

        return redirect()->route('admin.blogs.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(BlogArticle $blogArticle, BlogArticleManagementService $articles): RedirectResponse
    {
        $articles->delete($blogArticle);

        return redirect()->route('admin.blogs.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
