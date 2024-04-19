#!/bin/bash

# Execute git pull to update the repository
git pull

# Execute the build script
export NODE_OPTIONS=--max_old_space_size=4096
npm run build-no-check

# Clear cache
php artisan optimize
php artisan filament:clear-cached-components
php artisan filament:cache-components
