<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.title', 'My App');
        $this->migrator->add('general.description', 'My App Description');
        $this->migrator->add('general.logo', 'logo.png');
        $this->migrator->add('general.favicon', 'favicon.png');
        $this->migrator->add('general.email', '');
        $this->migrator->add('general.phone', '');
        $this->migrator->add('general.zalo', '');
        $this->migrator->add('general.facebook', '');
        $this->migrator->add('general.address', '');
        $this->migrator->add('general.bank_number', '');
        $this->migrator->add('general.bank_account', '');
        $this->migrator->add('general.bank_name', '');

    }
};
