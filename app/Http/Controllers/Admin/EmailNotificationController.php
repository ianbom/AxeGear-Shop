<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EmailNotificationRequest;
use App\Models\EmailNotification;
use App\Services\Admin\ResolvesAdminPagination;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class EmailNotificationController extends Controller
{
    use ResolvesAdminPagination;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        return inertia('admin/email-notifications/index', [
            'recipients' => EmailNotification::query()
                ->when($search !== '', fn ($query) => $query->where('email', 'like', "%{$search}%"))
                ->latest('id')->paginate($this->perPage($request))->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): RedirectResponse
    {
        return to_route('admin.email-notifications.index');
    }

    public function store(EmailNotificationRequest $request): RedirectResponse
    {
        EmailNotification::query()->create($request->validated());

        return to_route('admin.email-notifications.index')->with('success', 'Penerima email berhasil ditambahkan.');
    }

    public function edit(EmailNotification $emailNotification): Response
    {
        return inertia('admin/email-notifications/form', ['recipient' => $emailNotification]);
    }

    public function update(EmailNotificationRequest $request, EmailNotification $emailNotification): RedirectResponse
    {
        $emailNotification->update($request->validated());

        return to_route('admin.email-notifications.index')->with('success', 'Penerima email berhasil diperbarui.');
    }

    public function destroy(EmailNotification $emailNotification): RedirectResponse
    {
        $emailNotification->delete();

        return to_route('admin.email-notifications.index')->with('success', 'Penerima email berhasil dihapus.');
    }
}
