<?php

namespace App\Filament\Resources\OfflineCourseResource\Pages;

use App\Filament\Resources\OfflineCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOfflineCourse extends EditRecord
{
    protected static string $resource = OfflineCourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
