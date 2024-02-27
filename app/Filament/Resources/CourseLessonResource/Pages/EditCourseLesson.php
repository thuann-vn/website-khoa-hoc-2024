<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use FFMpeg\Format\Video\X264;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Guava\Filament\NestedResources\Pages\NestedEditRecord;
use Illuminate\Support\Facades\Log;
use ProtoneMedia\LaravelFFMpeg\Exporters\HLSExporter;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

class EditCourseLesson extends NestedEditRecord
{
    protected static string $resource = CourseLessonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $lowBitrate = (new X264)->setKiloBitrate(250);
        $midBitrate = (new X264)->setKiloBitrate(500);
        $highBitrate = (new X264)->setKiloBitrate(1000);
        $fileName = pathinfo($data['video_url'], PATHINFO_FILENAME);
        $encryptionKey = HLSExporter::generateEncryptionKey();
        FFMpeg::fromDisk('videos')
            ->open($data['video_url'])
            ->exportForHLS()
            ->addFormat($lowBitrate)
            ->addFormat($midBitrate)
            ->addFormat($highBitrate)
            ->toDisk('public')
            ->save($fileName . '.m3u8');
        $data['video_url'] = $fileName . '.m3u8';
        return $data;
    }
}
