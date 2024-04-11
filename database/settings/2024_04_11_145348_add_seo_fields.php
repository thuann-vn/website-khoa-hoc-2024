<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.seo_title', 'My website');
        $this->migrator->add('general.seo_description', 'This is my website');
        $this->migrator->add('general.seo_keywords', 'website, my website');
        $this->migrator->add('general.seo_image', '');
        $this->migrator->add('general.custom_js', '');
    }
};
