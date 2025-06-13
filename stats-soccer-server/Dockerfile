FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git unzip zip curl sqlite3 libsqlite3-dev libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite zip

COPY --from=composer:2.8.6 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chmod -R 777 storage bootstrap/cache

RUN mkdir -p database && \
    touch database/database.sqlite && \
    chmod 666 database/database.sqlite

ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/app/database/database.sqlite

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000