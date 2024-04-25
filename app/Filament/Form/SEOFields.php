<?php

namespace App\Filament\Form;

use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;

class SEOFields extends Group
{
    public static function create(): static
    {
        return static::make([
            Grid::make()
                ->schema([
                    TextInput::make('seo_title')
                        ->label('SEO Title')
                        ->maxLength(255),
                    Textarea::make('seo_description')
                        ->label('SEO Description')
                        ->maxLength(255),
                    TextInput::make('seo_keywords')
                        ->label('SEO Keywords')
                        ->maxLength(255)
                ])->columns(1),
        ]);
    }
}
