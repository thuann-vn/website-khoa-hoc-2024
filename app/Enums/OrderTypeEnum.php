<?php
namespace App\Enums;
use Filament\Support\Contracts\HasLabel;

enum OrderTypeEnum: string implements HasLabel
{
    case Normal = 'default';
    case OneOnOne = 'one-on-one';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Normal => 'Normal',
            self::OneOnOne => 'One on one',
        };
    }
}
