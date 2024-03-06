<?php

namespace App\Filament\Resources\TeacherResource\Pages;

use App\Filament\Resources\TeacherResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateTeacher extends CreateRecord
{
    protected static string $resource = TeacherResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['type'] = 'teacher';
        if(!empty($data['password'])){
            $data['password'] = \Hash::make($data['password']);
        }else{
            unset($data['password']);
        }
        return $data;
    }
}
