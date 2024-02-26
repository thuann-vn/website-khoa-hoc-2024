<?php

namespace App\Filament\Resources\CourseSectionResource\Pages;

use App\Filament\Resources\CourseSectionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Guava\Filament\NestedResources\Pages\NestedListRecords;

class ListCourseSections extends NestedListRecords
{
    protected static string $resource = CourseSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
