<?php

namespace App\Filament\Resources\CourseLessonVideoResource\Pages;

use App\Filament\Resources\CourseLessonVideoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCourseLessonVideo extends EditRecord
{
    protected static string $resource = CourseLessonVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
