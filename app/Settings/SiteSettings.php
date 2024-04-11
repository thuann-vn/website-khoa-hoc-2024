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

    public string $banner_title;

    public string $banner_description;

    public string $banner_image;

    public string $mobile_banner_image;


    public string $company_name;
    public string $company_tax_text;
    public string $refund_text;

    public string $seo_title;
    public string $seo_description;
    public string $seo_keywords;
    public string $seo_image;
    public string $custom_js;

    public static function group(): string
    {
        return 'general';
    }
}
