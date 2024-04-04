<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.mobile_banner_image', '');
        $this->migrator->add('general.company_name', 'CTY TNHH AMILY');
        $this->migrator->add('general.company_tax_text', 'MST: 170 229 1721');
    }
};
