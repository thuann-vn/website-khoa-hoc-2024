<?php

namespace App\Filament\Resources\MasterCourseResource\Pages;

use App\Filament\Resources\MasterCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Log;
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
    public function refresh():void
    {
        $this->refreshFormData(['old_price' => $this->record->courses->sum('price')]);
    }
}
