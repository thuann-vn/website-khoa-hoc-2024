<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Guava\Filament\NestedResources\Pages\NestedListRecords;

class ListCourseLessons extends NestedListRecords
{
    protected static string $resource = CourseLessonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
