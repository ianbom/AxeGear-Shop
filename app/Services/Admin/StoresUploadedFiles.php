<?php

namespace App\Services\Admin;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait StoresUploadedFiles
{
    protected function storePublicFile(UploadedFile $file, string $directory): string
    {
        return Storage::url($file->store($directory, 'public'));
    }

    protected function deletePublicFile(?string $url): void
    {
        if (! filled($url) || ! str_contains($url, '/storage/')) {
            return;
        }

        Storage::disk('public')->delete(str($url)->after('/storage/')->toString());
    }
}
