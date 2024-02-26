<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Guava\Filament\NestedResources\Pages\NestedCreateRecord;
use Guava\Filament\NestedResources\RelationManagers\NestedRelationManager;

class CreateCourseLesson extends NestedCreateRecord
{
    protected static string $resource = CourseLessonResource::class;
}
