<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders the blog detail page for an article slug', function () {
    $this->get('/blog/choosing-the-right-lens-for-every-riding-condition')
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('blog/show')
        );
});
