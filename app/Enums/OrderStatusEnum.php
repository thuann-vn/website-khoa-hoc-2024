<?php
namespace App\Enums;
use Filament\Support\Contracts\HasLabel;

enum OrderStatusEnum: string implements HasLabel
{
    case Pending = 'pending';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Completed => 'Completed',
            self::Cancelled => 'Cancelled',
        };
    }
}
