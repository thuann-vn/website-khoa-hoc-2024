<?php

namespace App\Filament\Resources\CourseSectionResource\Pages;

use App\Filament\Resources\CourseSectionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Guava\Filament\NestedResources\Pages\NestedEditRecord;

class EditCourseSection extends NestedEditRecord
{
    protected static string $resource = CourseSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
