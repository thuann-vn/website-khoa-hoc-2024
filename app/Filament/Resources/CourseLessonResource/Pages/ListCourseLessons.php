<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use App\Filament\Traits\HasParentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Guava\Filament\NestedResources\Pages\NestedListRecords;

class ListCourseLessons extends ListRecords
{
    use HasParentResource;
    protected static string $resource = CourseLessonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->url(
                    fn (): string => static::getParentResource()::getUrl('lessons.create', [
                        'parent' => $this->parent,
                    ])
                ),
        ];
    }
}
