<?php

namespace App\Filament\Resources\CourseChapterResource\Pages;

use App\Filament\Resources\CourseChapterResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Guava\Filament\NestedResources\Pages\NestedEditRecord;

class EditCourseChapter extends NestedEditRecord
{
    protected static string $resource = CourseChapterResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
