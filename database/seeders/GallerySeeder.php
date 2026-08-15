<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect($this->categories())->mapWithKeys(function (string $name, int $index): array {
            $category = GalleryCategory::query()->updateOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'sort_order' => $index, 'is_active' => true],
            );

            return [$name => $category->id];
        });

        foreach ($this->images() as $index => $data) {
            $image = GalleryImage::query()->updateOrCreate(
                ['sort_order' => $index],
                ['image_url' => $data['image_url'], 'alt_text' => $data['alt_text'], 'is_active' => true],
            );
            $image->categories()->sync(collect($data['categories'])->map(fn (string $name): int => $categories[$name])->all());
        }
    }

    /** @return list<string> */
    private function categories(): array
    {
        return ['Sunglasses', 'Goggles', 'Gloves', 'Apparel', 'Accessories', 'Athletes', 'Lifestyle', 'Detail Shots'];
    }

    /** @return list<array{image_url: string, alt_text: string, categories: list<string>}> */
    private function images(): array
    {
        return [
            $this->image('photo-1544191696-102dbdaeeaa0', 'Mountain biker descending a forest trail', ['Sunglasses', 'Athletes', 'Lifestyle']),
            $this->image('photo-1558981403-c5f9899a28bc', 'Enduro rider accelerating across a dirt trail', ['Goggles', 'Athletes', 'Lifestyle']),
            $this->image('photo-1558980664-10e7170b5df9', 'Motorcycle rider exploring a rugged mountain route', ['Goggles', 'Athletes', 'Lifestyle']),
            $this->image('photo-1529422643029-d4585747aaf2', 'Trail cyclist crossing open mountain terrain', ['Sunglasses', 'Athletes', 'Lifestyle']),
            $this->image('photo-1471506480208-91b3a4cc78be', 'Mountain bike prepared for a technical trail', ['Accessories', 'Lifestyle', 'Detail Shots']),
            $this->image('photo-1502744688674-c619d1586c9e', 'Cyclist riding along a steep rocky trail', ['Gloves', 'Athletes', 'Lifestyle']),
            $this->image('photo-1558981806-ec527fa84c39', 'Enduro motorcycle crossing an outdoor trail', ['Goggles', 'Gloves', 'Athletes']),
            $this->image('photo-1541625602330-2277a4c46182', 'Cyclist training through mountainous trail scenery', ['Sunglasses', 'Athletes', 'Lifestyle']),
            $this->image('photo-1511994298241-608e28f14fde', 'Trail athlete running across a mountain ridge', ['Apparel', 'Athletes', 'Lifestyle']),
            $this->image('photo-1486218119243-13883505764c', 'Trail runner moving through sunset terrain', ['Apparel', 'Athletes', 'Lifestyle']),
            $this->image('photo-1511499767150-a48a237f0083', 'Performance sunglasses ready for a trail ride', ['Sunglasses', 'Accessories', 'Detail Shots']),
            $this->image('photo-1572635196237-14b3f281503f', 'Protective trail goggles photographed in detail', ['Goggles', 'Accessories', 'Detail Shots']),
            $this->image('photo-1599058917212-d750089bc07e', 'Protective gloves and equipment for trail riding', ['Gloves', 'Accessories', 'Detail Shots']),
            $this->image('photo-1521572163474-6864f9cf17ab', 'Technical apparel for mountain trail sessions', ['Apparel', 'Athletes', 'Detail Shots']),
            $this->image('photo-1552674605-db6ffd4facb5', 'Trail athletes training together outdoors', ['Athletes', 'Lifestyle']),
            $this->image('photo-1707985034123-dbbed1830205', 'Performance eyewear detail for dusty trail conditions', ['Sunglasses', 'Accessories', 'Detail Shots']),
        ];
    }

    /** @return array{image_url: string, alt_text: string, categories: list<string>} */
    private function image(string $id, string $alt, array $categories): array
    {
        return ['image_url' => "https://images.unsplash.com/{$id}?auto=format&fit=crop&q=85&w=1200", 'alt_text' => $alt, 'categories' => $categories];
    }
}
