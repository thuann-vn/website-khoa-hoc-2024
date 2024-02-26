<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Guava\Filament\NestedResources\Pages\NestedEditRecord;

class EditCourseLesson extends NestedEditRecord
{
    protected static string $resource = CourseLessonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
