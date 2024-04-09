<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use App\Filament\Traits\HasParentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateCourseLesson extends CreateRecord
{
    use HasParentResource;
    protected static string $resource = CourseLessonResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Set the parent relationship key to the parent resource's ID.
        $data[$this->getParentRelationshipKey()] = $this->parent->id;

        $data['duration'] = $data['minutes'] * 60 + $data['seconds'];
        unset($data['minutes']);
        unset($data['seconds']);
        return $data;
    }
    protected function getRedirectUrl(): string
    {
        return $this->previousUrl ?? static::getParentResource()::getUrl('lessons.index', [
            'parent' => $this->parent,
        ]);
    }
}
