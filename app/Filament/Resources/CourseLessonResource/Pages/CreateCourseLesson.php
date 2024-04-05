<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use App\Jobs\ProcessVideo;
use App\Models\CourseLessonVideo;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Guava\Filament\NestedResources\Pages\NestedCreateRecord;
use Guava\Filament\NestedResources\RelationManagers\NestedRelationManager;

class CreateCourseLesson extends NestedCreateRecord
{
    protected static string $resource = CourseLessonResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['duration'] = $data['minutes'] * 60 + $data['seconds'];
        unset($data['minutes']);
        unset($data['seconds']);
        return $data;
    }
}
