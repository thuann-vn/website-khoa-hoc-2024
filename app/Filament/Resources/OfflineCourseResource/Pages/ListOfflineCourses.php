<?php

namespace App\Filament\Resources\OfflineCourseResource\Pages;

use App\Filament\Resources\OfflineCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListOfflineCourses extends ListRecords
{
    protected static string $resource = OfflineCourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
