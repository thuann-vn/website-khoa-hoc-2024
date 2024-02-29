<?php

namespace App\Filament\Resources\CourseLessonVideoResource\Pages;

use App\Filament\Resources\CourseLessonVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCourseLessonVideos extends ListRecords
{
    protected static string $resource = CourseLessonVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
