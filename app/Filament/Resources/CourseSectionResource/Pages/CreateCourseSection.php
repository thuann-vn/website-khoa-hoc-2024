<?php

namespace App\Filament\Resources\CourseSectionResource\Pages;

use App\Filament\Resources\CourseSectionResource;
use Guava\Filament\NestedResources\Pages\NestedCreateRecord;

class CreateCourseSection extends NestedCreateRecord
{
    protected static string $resource = CourseSectionResource::class;
}
