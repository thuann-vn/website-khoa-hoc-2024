<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use App\Settings\SiteSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageSite extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationGroup = 'Settings';

    protected static string $settings = SiteSettings::class;

    public function form(Form $form): Form
    {
        $banks = [
            'vcb' => 'Vietcombank',
            'tcb' => 'Techcombank',
            'bidv' => 'BIDV',
            'vtb' => 'Vietinbank',
            'acb' => 'ACB',
            'mb' => 'MB',
            'vpb' => 'VPBank',
            'agb' => 'Agribank',
            'shb' => 'SHB',
            'hdb' => 'HDBank',
            'nab' => 'NAB',
            'vib' => 'VIB',
            'seab' => 'SeABank',
            'bacab' => 'BacABank',
            'oceanb' => 'OceanBank',
            'pgb' => 'PGBank',
            'lvpb' => 'LienVietPostBank',
            'tpb' => 'TPBank',
            'abb' => 'ABBank',
            'ocb' => 'OCB',
            'bvb' => 'BaoVietBank',
        ];
        return $form
            ->schema([
                Forms\Components\Tabs::make()
            ->tabs([
                Forms\Components\Tabs\Tab::make('General Information')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->label('Title')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\Textarea::make('description')
                        ->label('Description')
                        ->required()
                        ->maxLength(65535),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('phone')
                        ->label('Phone')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('zalo')
                        ->label('Zalo')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('facebook')
                        ->label('Facebook')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('messenger')
                        ->label('Messenger')
                        ->required()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('address')
                        ->label('Address')
                        ->required()
                        ->maxLength(65535),
                    Forms\Components\TextInput::make('company_name')
                        ->label('Company name')
                        ->required()
                        ->maxLength(65535),
                    Forms\Components\TextInput::make('company_tax_text')
                        ->label('Tax Text')
                        ->required()
                        ->maxLength(65535),
                    Forms\Components\TextInput::make('refund_text')
                        ->label('Refund Text')
                        ->required()
                        ->maxLength(65535),
                ]),
                Forms\Components\Tabs\Tab::make('SEO Information')
                    ->schema([
                        Forms\Components\TextInput::make('seo_title')
                            ->label('SEO Title')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('seo_description')
                            ->label('SEO Description')
                            ->maxLength(65535),
                        Forms\Components\TextInput::make('seo_keywords')
                            ->label('SEO Keywords')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('custom_js')
                            ->label('Custom JS')
                            ->maxLength(65535),
                    ]),
                Forms\Components\Tabs\Tab::make('Bank Information')
                    ->schema([

                        Forms\Components\TextInput::make('bank_number')
                            ->label('Bank Number')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('bank_account')
                            ->label('Bank Account')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('bank_name')
                            ->options($banks)
                            ->label('Bank Name')
                            ->required(),
                    ]),
                Forms\Components\Tabs\Tab::make('Home Banner')
                    ->schema([
                        Forms\Components\TextInput::make('banner_title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('banner_description')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\FileUpload::make('banner_image')
                            ->required(),
                        Forms\Components\FileUpload::make('mobile_banner_image')
                            ->required(),
                    ])
            ])

            ])->columns(1);
    }
}
