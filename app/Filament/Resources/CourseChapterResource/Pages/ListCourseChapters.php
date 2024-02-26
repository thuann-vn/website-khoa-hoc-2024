<?php

namespace App\Filament\Resources\CourseChapterResource\Pages;

use App\Filament\Resources\CourseChapterResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Guava\Filament\NestedResources\Pages\NestedListRecords;

class ListCourseChapters extends NestedListRecords
{
    protected static string $resource = CourseChapterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
