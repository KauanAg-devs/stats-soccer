# Imagem base com PHP 8.3
FROM php:8.3-cli

# Instala dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    git unzip zip curl sqlite3 libsqlite3-dev libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite zip

# Instala Composer 2.8.6
COPY --from=composer:2.8.6 /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Garante que storage e cache tenham permissões
RUN chmod -R 777 storage bootstrap/cache

# Cria arquivo SQLite se não existir
RUN mkdir -p database && \
    touch database/database.sqlite && \
    chmod 666 database/database.sqlite

# Define variáveis padrão (pode ser sobrescrito via .env)
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/app/database/database.sqlite

# Expõe a porta da API
EXPOSE 8000

# Comando para rodar a API
CMD php artisan serve --host=0.0.0.0 --port=8000