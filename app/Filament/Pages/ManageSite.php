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
            'bvb' => 'BVB',
            'abb' => 'ABBank',
            'ocb' => 'OCB',
            'bvb' => 'BaoVietBank',
            'nab' => 'NamABank',
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
                        ->live()
                        ->maxLength(255),
                    Forms\Components\Textarea::make('description')
                        ->label('Description')
                        ->required()
                        ->maxLength(65535),
                    Forms\Components\TextInput::make('email')
                        ->label('Email')
                        ->required()
                        ->live()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('phone')
                        ->label('Phone')
                        ->required()
                        ->live()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('zalo')
                        ->label('Zalo')
                        ->required()
                        ->live()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('facebook')
                        ->label('Facebook')
                        ->required()
                        ->live()
                        ->maxLength(255),
                    Forms\Components\TextInput::make('address')
                        ->label('Address')
                        ->required()
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
                    ])
            ])

            ])->columns(1);
    }
}
