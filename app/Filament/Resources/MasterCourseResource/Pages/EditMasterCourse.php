<?php

namespace App\Filament\Resources\MasterCourseResource\Pages;

use App\Filament\Resources\MasterCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Livewire\Attributes\On;

class EditMasterCourse extends EditRecord
{
    protected static string $resource = MasterCourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    #[On('refreshOldPrice')]
    public function refreshOldPrice()
    {
        $this->record->refresh();
    }
}
