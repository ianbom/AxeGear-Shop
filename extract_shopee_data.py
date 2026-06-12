import pandas as pd
import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text)
    return text.strip('-')

try:
    df = pd.read_csv('public/shopee-co-id-2026-05-12.csv')
    df = df.fillna('')
    
    products = []
    variants = []
    images = {}
    
    for i, row in df.iterrows():
        name = str(row.get('Nama', '')).strip()
        if not name: continue
        
        slug = slugify(name)
        price_str = str(row.get('Harga', 0))
        price = float(re.sub(r'[^\d]', '', price_str)) if price_str else 0
        
        products.append({
            'name': name,
            'slug': slug,
            'sku': f"SHP-{i+1:03d}",
            'category_slug': 'baju-setelan',
            'collection_slug': 'shopee-collection',
            'brand': 'Anemi Official',
            'short_description': f"{name} koleksi terbaru yang modis dan nyaman dipakai.",
            'description': f"{name} hadir dengan desain kekinian yang cocok untuk berbagai aktivitas Anda. Dibuat dengan material berkualitas.",
            'material': 'Bahan berkualitas',
            'care_instruction': 'Cuci lembut, pisahkan warna, hindari pemutih, jemur teduh, setrika suhu rendah bila diperlukan.',
            'base_price': price,
            'sale_price': None,
            'weight': 500,
            'length': 30,
            'width': 25,
            'height': 5,
            'status': 'published',
            'is_featured': True,
            'is_new_arrival': True,
            'is_best_seller': False,
            'meta_title': f"{name} | Anemi Official",
            'meta_description': f"Beli {name} berkualitas dengan harga terbaik di Anemi Official."
        })
        
        variants.append({
            'product_slug': slug,
            'sku': f"SHP-{i+1:03d}-ALL",
            'color_name': 'Default Color',
            'color_hex': '#000000',
            'size': 'All Size',
            'additional_price': 0.0,
            'stock': 50, # Modifikasi agar stock tidak 0
            'reserved_stock': 0,
            'image_url': str(row.get('image', '')),
            'is_active': True
        })
        
        img_cols = ['image', 'image2', 'image3', 'image4']
        slug_imgs = []
        sort_order = 0
        
        for col in img_cols:
            img_url = str(row.get(col, '')).strip()
            if img_url:
                slug_imgs.append({
                    'image_url': img_url,
                    'alt_text': f"{name} foto {sort_order+1}",
                    'sort_order': sort_order,
                    'is_primary': sort_order == 0
                })
                sort_order += 1
                
        images[slug] = slug_imgs
        
    with open('public/products_shopee.json', 'w') as f:
        json.dump(products, f)
    with open('public/variants_shopee.json', 'w') as f:
        json.dump(variants, f)
    with open('public/images_shopee.json', 'w') as f:
        json.dump(images, f)
        
    print(f"Parsed {len(products)} products from CSV")
except Exception as e:
    print(f"Error: {e}")