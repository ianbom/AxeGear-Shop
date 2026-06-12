# VPS Docker Sail Deployment

## Inspection result

- Laravel Sail already installed in `composer.json`: `laravel/sail`.
- No existing `docker-compose.yml`, `compose.yaml`, `compose.yml`, root `Dockerfile` found before change.
- Existing `.env`, `.env.example`, `package.json`, `vite.config.ts`, `config/queue.php`, `config/cache.php`, `config/session.php` inspected.
- `vite.config.ts` already builds `resources/css/app.css` and `resources/js/app.tsx`; Vite manifest goes to `public/build` via Laravel Vite plugin.

## Deploy

```bash
git pull
docker compose up -d --build
docker compose exec laravel.test composer install --no-dev --optimize-autoloader
docker compose exec laravel.test npm install
docker compose exec laravel.test npm run build
docker compose exec laravel.test php artisan migrate --force
docker compose exec laravel.test php artisan config:cache
docker compose exec laravel.test php artisan route:cache
docker compose exec laravel.test php artisan view:cache
docker compose ps
docker compose logs -f
```

## Permissions

```bash
docker compose exec laravel.test chown -R www-data:www-data storage bootstrap/cache
docker compose exec laravel.test chmod -R ug+rwX storage bootstrap/cache
```

These allow web user/group write Laravel cache, logs, sessions, compiled files.

## Operations

```bash
# start / stop / rebuild / restart
docker compose up -d
docker compose down
docker compose up -d --build
docker compose restart

# logs / shell
docker compose logs -f
docker compose exec laravel.test bash

# artisan / composer / npm
docker compose exec laravel.test php artisan about
docker compose exec laravel.test composer install --no-dev --optimize-autoloader
docker compose exec laravel.test npm install
docker compose exec laravel.test npm run build

# migrations / cache
docker compose exec laravel.test php artisan migrate --force
docker compose exec laravel.test php artisan optimize:clear

# memory / volumes
docker stats
docker system df
docker volume ls
docker volume inspect anemicommerce_sail-mysql-data

# MySQL backup
docker compose exec mysql mysqldump -u sail -p laravel > backup.sql

# safe prune unused images only
docker image prune
```

## Services

- `laravel.test`: Sail PHP app, bound to `127.0.0.1:${APP_PORT:-80}:80` for reverse proxy only.
- `mysql`: MySQL 8.4, no public port, named volume `sail-mysql-data`.
- `redis`: Redis 7 Alpine, no public port, named volume `sail-redis-data`.
- `queue`: same Sail image, runs `php artisan queue:work redis --sleep=3 --tries=3 --timeout=90 --memory=256`.
- `scheduler`: same Sail image, runs `php artisan schedule:work`.

## Memory optimization

`mem_limit`, `memswap_limit`, and `cpus` work with normal `docker compose`. `deploy.resources` mostly targets Swarm mode, so not used. MySQL uses small buffers and fewer connections. Redis capped at `128mb` with `allkeys-lru`.

## Reverse proxy / SSL

Use Nginx or Caddy on VPS host. Public ports: only `80` and `443`. Proxy to `http://127.0.0.1:${APP_PORT:-80}`. MySQL and Redis expose no host ports.

Caddy example:

```caddyfile
your-domain.com {
    reverse_proxy 127.0.0.1:80
}
```

Nginx upstream target: `proxy_pass http://127.0.0.1:80;`.

## Security

- Set `APP_DEBUG=false`.
- Never commit `.env`.
- Replace default `DB_PASSWORD=password` in production.
- Keep Midtrans, Biteship, Google OAuth, and other secrets in `.env` only.
- Do not expose Docker volumes through web server.
- Firewall: allow 22, 80, 443 only as needed.

## Troubleshooting

- MySQL connection refused: check `docker compose ps mysql`, `DB_HOST=mysql`, logs `docker compose logs mysql`.
- Redis connection refused: check `REDIS_HOST=redis`, `docker compose logs redis`.
- Vite manifest not found: run `docker compose exec laravel.test npm run build`; verify `public/build/manifest.json`.
- Permission denied on storage: run permission commands above.
- Queue not processing jobs: check `docker compose logs queue`; ensure `QUEUE_CONNECTION=redis`.
- Scheduler not running: check `docker compose logs scheduler`; verify scheduled tasks in `routes/console.php` or app schedule config.
- App 500 after deployment: run `docker compose logs laravel.test`; clear/cache config again.
- APP_KEY missing: `docker compose exec laravel.test php artisan key:generate --force`.
- Port already in use: set `APP_PORT=8080` then proxy to `127.0.0.1:8080`.
- VPS RAM full: run `docker stats`; reduce workers/services; add swap.
- MySQL too much memory: lower `innodb_buffer_pool_size` in `docker/mysql/conf.d/custom.cnf`.
- Redis too much memory: lower `maxmemory` in `docker/redis/redis.conf`.
- Docker volume disk usage large: `docker system df -v`; backup then clean old data carefully.
```
