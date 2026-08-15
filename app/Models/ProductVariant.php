<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'product_id',
    'sku',
    'variant_name',
    'color_name',
    'color_hex',
    'size',
    'package_type',
    'regular_price',
    'sale_price',
    'stock',
    'reserved_stock',
    'weight',
    'length',
    'width',
    'height',
    'image_url',
    'is_active',
])]
class ProductVariant extends Model
{
    use SoftDeletes;

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function stockLogs(): HasMany
    {
        return $this->hasMany(StockLog::class);
    }

    protected function casts(): array
    {
        return [
            'height' => 'integer',
            'is_active' => 'boolean',
            'length' => 'integer',
            'regular_price' => 'decimal:2',
            'reserved_stock' => 'integer',
            'sale_price' => 'decimal:2',
            'stock' => 'integer',
            'weight' => 'integer',
            'width' => 'integer',
        ];
    }
}
