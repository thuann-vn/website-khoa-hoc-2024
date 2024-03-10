<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class SiteSettings extends Settings
{
    public string $title;

    public string $description;

    public string $logo;

    public string $favicon;

    public string $email;

    public string $phone;

    public string $zalo;

    public string $facebook;

    public string $address;

    public string $bank_number;

    public string $bank_account;

    public string $bank_name;

    public static function group(): string
    {
        return 'general';
    }
}
