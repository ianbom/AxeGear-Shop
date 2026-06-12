import pandas as pd
import json
import os

try:
    df_products = pd.read_excel('public/anemi-seeder.xlsx', sheet_name=None)
    
    products = []
    variants = []
    images = {}
    
    product_map = {}
    
    if 'Products' in df_products:
        df = df_products['Products'].fillna('')
        for _, row in df.iterrows():
            key = str(row.get('import_key', ''))
            slug = str(row.get('slug', ''))
            if not key or not slug: continue
            product_map[key] = slug
            products.append({
                'name': str(row.get('name', '')),
                'slug': slug,
                'sku': str(row.get('sku', '')),
                'category_slug': str(row.get('category_slug', '')),
                'collection_slug': str(row.get('collection_slug', '')),
                'brand': str(row.get('brand', 'Anemi Official')) or 'Anemi Official',
                'short_description': str(row.get('short_description', '')),
                'description': str(row.get('description', '')),
                'material': 'Material sesuai deskripsi',
                'care_instruction': 'Cuci lembut, pisahkan warna, hindari pemutih, jemur teduh, setrika suhu rendah bila diperlukan.',
                'base_price': float(row.get('base_price', 0) or 0),
                'sale_price': float(row.get('sale_price', 0)) if str(row.get('sale_price', '')).strip() else None,
                'weight': int(row.get('weight', 850) or 850),
                'length': int(row.get('length', 36) or 36),
                'width': int(row.get('width', 28) or 28),
                'height': int(row.get('height', 7) or 7),
                'status': str(row.get('status', 'published')).lower() or 'published',
                'is_featured': bool(row.get('is_featured', False)),
                'is_new_arrival': bool(row.get('is_new_arrival', False)),
                'is_best_seller': False,
                'meta_title': str(row.get('meta_title', '')),
                'meta_description': str(row.get('meta_description', ''))
            })
            
    if 'ProductVariants' in df_products:
        df = df_products['ProductVariants'].fillna('')
        for _, row in df.iterrows():
            key = str(row.get('product_import_key', ''))
            if not key or key not in product_map: continue
            
            variants.append({
                'product_slug': product_map[key],
                'sku': str(row.get('sku', '')),
                'color_name': str(row.get('color_name', 'Default')) or 'Default',
                'color_hex': str(row.get('color_hex', '#000000')) or '#000000',
                'size': str(row.get('size', 'All Size')) or 'All Size',
                'additional_price': float(row.get('additional_price', 0) or 0),
                'stock': int(row.get('stock', 0) or 0),
                'reserved_stock': 0,
                'image_url': str(row.get('image_url', '')),
                'is_active': str(row.get('is_active', 'active')).lower() == 'active'
            })
            
    if 'ProductImages' in df_products:
        df = df_products['ProductImages'].fillna('')
        for _, row in df.iterrows():
            key = str(row.get('product_import_key', ''))
            if not key or key not in product_map: continue
            slug = product_map[key]
            if slug not in images: images[slug] = []
            
            images[slug].append({
                'image_url': str(row.get('image_url', '')),
                'alt_text': str(row.get('alt_text', '')),
                'sort_order': int(row.get('sort_order', 0) or 0),
                'is_primary': bool(row.get('is_primary', False))
            })
            
    with open('public/products.json', 'w') as f:
        json.dump(products, f)
    with open('public/variants.json', 'w') as f:
        json.dump(variants, f)
    with open('public/images.json', 'w') as f:
        json.dump(images, f)
        
    print(f"Products: {len(products)}, Variants: {len(variants)}, Images: {sum(len(v) for v in images.values())}")
except Exception as e:
    print(f"Error: {e}")