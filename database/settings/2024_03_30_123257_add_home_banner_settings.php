<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.banner_title', '<span className="text-decoration-underline">AMILY</span>{\' \'}<br />Đào tạo thiết kế trang sức online!');
        $this->migrator->add('general.banner_description', 'Học trực tuyến tại nhà với giáo trình chuyên nghiệp, giáo viên tận tâm.');
        $this->migrator->add('general.banner_image', '');
    }
};
