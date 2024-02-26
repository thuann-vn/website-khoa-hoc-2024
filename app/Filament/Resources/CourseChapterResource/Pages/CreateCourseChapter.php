<?php

namespace App\Filament\Resources\CourseChapterResource\Pages;

use App\Filament\Resources\CourseChapterResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Guava\Filament\NestedResources\Pages\NestedCreateRecord;

class CreateCourseChapter extends NestedCreateRecord
{
    protected static string $resource = CourseChapterResource::class;
}
