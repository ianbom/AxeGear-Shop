<?php

namespace Database\Seeders;

use App\Models\BlogArticle;
use Illuminate\Database\Seeder;

class BlogArticleSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->articles() as $article) {
            BlogArticle::query()->updateOrCreate(['slug' => $article['slug']], $article);
        }
    }

    /** @return list<array<string, mixed>> */
    private function articles(): array
    {
        return [
            $this->article('choosing-the-right-lens-for-every-riding-condition', 'Choosing the Right Lens for Every Riding Condition', 'Product Guides', '2026-06-22', 5, 'photo-1511499767150-a48a237f0083'),
            $this->article('how-to-care-for-your-performance-goggles', 'How to Care for Your Performance Goggles', 'Gear Care', '2026-06-20', 4, 'photo-1572635196237-14b3f281503f'),
            $this->article('from-track-to-trail-the-evolution-of-axegear-eyewear', 'From Track to Trail: The Evolution of AxeGear Eyewear', 'Technology', '2026-06-18', 6, 'photo-1577803645773-f96470509666'),
            $this->article('meet-the-riders-behind-axegear', 'Meet the Riders Behind AxeGear', 'Athlete Stories', '2026-06-16', 7, 'photo-1552674605-db6ffd4facb5'),
            $this->article('five-essential-pieces-of-gear-for-your-next-ride', 'Five Essential Pieces of Gear for Your Next Ride', 'Riding Tips', '2026-06-15', 4, 'photo-1599058917212-d750089bc07e'),
            $this->article('why-lens-clarity-matters-at-high-speed', 'Why Lens Clarity Matters at High Speed', 'Performance', '2026-06-14', 6, 'photo-1530137073520-4ea6e2f10a48'),
            $this->article('preparing-your-gear-for-wet-weather-riding', 'Preparing Your Gear for Wet Weather Riding', 'Riding Tips', '2026-06-12', 4, 'photo-1558980664-10e7170b5df9'),
            $this->article('inside-the-design-process-of-axegear-performance-apparel', 'Inside the Design Process of AxeGear Performance Apparel', 'Behind the Design', '2026-06-10', 6, 'photo-1521572163474-6864f9cf17ab'),
            $this->article('axegear-community-ride-highlights-and-stories', 'AxeGear Community Ride: Highlights and Stories', 'Events', '2026-06-08', 5, 'photo-1529422643029-d4585747aaf2'),
            $this->article('how-athletes-build-a-race-day-mindset', 'How Athletes Build a Race-Day Mindset', 'Athlete Stories', '2026-06-06', 5, 'photo-1511994298241-608e28f14fde'),
            $this->article('the-materials-behind-lightweight-protection', 'The Materials Behind Lightweight Protection', 'Technology', '2026-06-04', 6, 'photo-1558981806-ec527fa84c39'),
            $this->article('finding-your-ideal-trail-setup', 'Finding Your Ideal Trail Setup', 'Lifestyle', '2026-06-02', 4, 'photo-1544191696-102dbdaeeaa0'),
        ];
    }

    private function article(string $slug, string $title, string $category, string $date, int $minutes, string $image): array
    {
        return [
            'slug' => $slug, 'title' => $title, 'category' => $category,
            'author_name' => 'AxeGear Editorial',
            'excerpt' => "{$title} offers practical guidance for more confident riding.",
            'intro' => 'Good preparation keeps the setup simple, useful, and easy to trust in real conditions.',
            'sections' => [['heading' => 'Understand the Conditions', 'paragraphs' => ['Start by observing terrain, light, weather, ride duration, and the equipment already in use.']], ['heading' => 'Build a Repeatable Setup', 'paragraphs' => ['Change one variable at a time and keep choices that improve comfort or control.']]],
            'quote' => 'Performance improves when preparation becomes clear, repeatable, and honest.',
            'tips' => ['Prepare equipment before the session begins.', 'Test changes in the conditions where they will be used.'],
            'conclusion' => 'Keep the process practical and let real riding experience guide the next adjustment.',
            'image_url' => "https://images.unsplash.com/{$image}?auto=format&fit=crop&q=88&w=1400",
            'reading_minutes' => $minutes, 'published_at' => $date, 'is_published' => true,
        ];
    }
}
