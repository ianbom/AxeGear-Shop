Act as a senior Laravel DevOps engineer.

Set up my existing Laravel Inertia React TypeScript project to run on a VPS using Laravel Sail with Docker.

Stack:
- Laravel
- Inertia.js
- React
- TypeScript
- Vite
- MySQL
- Redis
- Queue worker
- Scheduler

Important VPS context:
- The VPS has limited resources, for example 2 GB RAM.
- Optimize the Docker/Sail setup so it does not consume too much RAM.
- Use Laravel Sail as the base, but customize it for VPS usage.
- MySQL and Redis data should use named Docker volumes.
- MySQL, Redis, queue worker, and scheduler should have reasonable memory limits.
- Do not expose MySQL and Redis ports publicly.
- Do not run Vite dev server permanently in VPS production usage.
- Frontend assets should be built with `npm run build`.

Requirements:

1. Inspect the current project first.
   - Check if Laravel Sail is already installed.
   - Check if `docker-compose.yml`, `compose.yaml`, `Dockerfile`, or Sail files already exist.
   - Check `.env`, `.env.example`, `package.json`, `vite.config.ts`, and Laravel queue/cache/session config.
   - Do not overwrite important files without explaining what will change.

2. Install Laravel Sail if missing.
   - Use:
     `composer require laravel/sail --dev`
     `php artisan sail:install`
   - Select only:
     - mysql
     - redis
   - Do not include unnecessary services like Meilisearch, Mailpit, Selenium, PostgreSQL, or MinIO unless already required by the project.

3. Configure Docker Compose / Sail services.

   Create or update the Sail compose file so it contains:
   - laravel app service
   - mysql service
   - redis service
   - queue worker service
   - scheduler service

   Services:
   - laravel.test
   - mysql
   - redis
   - queue
   - scheduler

4. Use named volumes.

   Configure named volumes like:
   - sail-mysql-data
   - sail-redis-data

   The volume section should be clean and explicit.

   Example:
   - MySQL data should be stored in a named volume.
   - Redis data should be stored in a named volume if Redis persistence is enabled.
   - Do not store database files directly inside the project folder.

5. Add container memory limits.

   Because this VPS has limited RAM, add reasonable resource constraints.

   Suggested limits:
   - Laravel app container: 256MB to 512MB
   - Queue worker: 128MB to 256MB
   - Scheduler: 128MB to 256MB
   - MySQL: 128MB to 256MB
   - Redis: 128MB to 256MB

   Use Docker Compose-compatible memory configuration such as:
   - `mem_limit`
   - `memswap_limit`
   - `cpus`

   If `deploy.resources` is used, explain whether it works with regular Docker Compose or only Swarm mode. Prefer configuration that works with normal `docker compose`.

6. Optimize MySQL for small VPS.

   Add a custom MySQL config file, for example:
   `docker/mysql/conf.d/custom.cnf`

   Configure MySQL to use less memory.

   Suggested MySQL settings:
   - innodb_buffer_pool_size = 256M
   - max_connections = 50
   - performance_schema = OFF
   - table_open_cache = 200
   - sort_buffer_size = 1M
   - read_buffer_size = 1M
   - read_rnd_buffer_size = 1M
   - tmp_table_size = 32M
   - max_heap_table_size = 32M

   Mount this config file into the MySQL container.

7. Optimize Redis for small VPS.

   Add a custom Redis config file, for example:
   `docker/redis/redis.conf`

   Configure Redis with:
   - maxmemory 128mb
   - maxmemory-policy allkeys-lru
   - appendonly yes or no depending on whether persistence is needed
   - save configuration if persistence is enabled

   Mount this config into the Redis container.

8. Configure `.env`.

   Use Docker service names:

   Database:
   - DB_CONNECTION=mysql
   - DB_HOST=mysql
   - DB_PORT=3306
   - DB_DATABASE=laravel
   - DB_USERNAME=sail
   - DB_PASSWORD=password

   Redis:
   - REDIS_HOST=redis
   - REDIS_PASSWORD=null
   - REDIS_PORT=6379

   Queue:
   - QUEUE_CONNECTION=redis

   Cache and session:
   - CACHE_STORE=redis
   - SESSION_DRIVER=redis

   App:
   - APP_ENV=production
   - APP_DEBUG=false
   - APP_URL=https://your-domain.com

9. Configure the queue worker.

   The queue service should run:

   `php artisan queue:work redis --sleep=3 --tries=3 --timeout=90 --memory=256`

   Requirements:
   - Use the same build/image as the Laravel app container.
   - Depends on mysql and redis.
   - Restart automatically unless stopped.
   - Use the same project volume as the app.
   - Add a memory limit suitable for small VPS.

10. Configure the scheduler.

   The scheduler service should run:

   `php artisan schedule:work`

   Requirements:
   - Use the same build/image as the Laravel app container.
   - Depends on mysql and redis.
   - Restart automatically unless stopped.
   - Use the same project volume as the app.
   - Add a small memory limit.

11. Configure frontend build for Inertia React TypeScript.

   Make sure:
   - `npm install` works inside Sail.
   - `npm run build` generates production assets.
   - Vite manifest is generated correctly.
   - Laravel can load the built assets from `public/build`.

   Do not run `npm run dev` permanently on the VPS.

12. Add a clean deployment flow.

   Deployment commands should include:

   - git pull
   - docker compose up -d --build
   - docker compose exec laravel.test composer install --no-dev --optimize-autoloader
   - docker compose exec laravel.test npm install
   - docker compose exec laravel.test npm run build
   - docker compose exec laravel.test php artisan migrate --force
   - docker compose exec laravel.test php artisan config:cache
   - docker compose exec laravel.test php artisan route:cache
   - docker compose exec laravel.test php artisan view:cache
   - docker compose ps
   - docker compose logs -f

13. Add safe permissions.

   Add commands to fix permissions for:
   - storage
   - bootstrap/cache

   Use safe Linux commands and explain them.

14. Add documentation.

   Include commands for:
   - start containers
   - stop containers
   - rebuild containers
   - restart containers
   - view logs
   - enter app container
   - run artisan
   - run composer
   - run npm
   - run migration
   - clear cache
   - check memory usage
   - inspect volume usage
   - backup MySQL volume/database
   - prune unused Docker images safely

15. Reverse proxy and SSL.

   Add notes for using Nginx or Caddy as a reverse proxy.

   Requirements:
   - Laravel container should only expose the app port locally.
   - Public traffic should go through Nginx/Caddy.
   - Nginx/Caddy handles domain and SSL.
   - MySQL and Redis must not be publicly accessible.

16. Security requirements.

   Make sure:
   - APP_DEBUG=false
   - `.env` is not committed to Git
   - MySQL port is not exposed publicly
   - Redis port is not exposed publicly
   - Only HTTP/HTTPS ports are public
   - Midtrans, Biteship, Google OAuth, and other secrets remain in `.env`
   - MySQL and Redis passwords are not weak in production
   - Docker volumes are not exposed through the web server

17. Troubleshooting guide.

   Add troubleshooting for:
   - MySQL connection refused
   - Redis connection refused
   - Vite manifest not found
   - Permission denied on storage
   - Queue not processing jobs
   - Scheduler not running
   - App showing 500 after deployment
   - APP_KEY missing
   - Port already in use
   - VPS RAM full
   - MySQL using too much memory
   - Redis using too much memory
   - Docker volume disk usage too large

18. Final output.

   Produce:
   - Updated Docker/Sail compose file
   - MySQL custom config file
   - Redis custom config file
   - Updated `.env.example`
   - Deployment commands
   - Explanation of each service
   - Memory optimization explanation
   - Volume explanation
   - Reverse proxy notes
   - Troubleshooting guide

Important:
- Use Laravel Sail, but adapt it carefully for VPS usage.
- Keep the setup simple and maintainable.
- Do not use Kubernetes, Traefik, Docker Swarm, or complex infrastructure.
- Prefer Docker Compose + Sail + optional Nginx/Caddy reverse proxy.
- Optimize for a small VPS with limited RAM.
- Before making changes, inspect the project structure and existing Docker/Sail files.