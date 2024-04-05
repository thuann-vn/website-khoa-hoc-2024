<?php

namespace App\Filament\Resources\CourseLessonResource\Pages;

use App\Filament\Resources\CourseLessonResource;
use App\Jobs\ProcessVideo;
use App\Models\CourseLessonVideo;
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
        $data['duration'] = $data['minutes'] * 60 + $data['seconds'];
        unset($data['minutes']);
        unset($data['seconds']);

        //Check if video is changed
        $oldVideoUrl = $this->record->video_url;
        $lessonVideo = CourseLessonVideo::where('course_lesson_id', $this->record->id)->first();
        if((!empty($data['video_url']) && $oldVideoUrl != $data['video_url']) || empty($lessonVideo) || ($lessonVideo->status == 2) || ($lessonVideo->status == 1 && $lessonVideo->progress < 100)){
            if(!empty($lessonVideo)){
                $lessonVideo->delete();
            }

            $lessonVideo = new CourseLessonVideo([
                'course_lesson_id' => $this->record->id,
                'status' => 0,
                'progress' => 0,
                'video_url' => $data['video_url'],
                'started_at' => null,
                'completed_at' => null
            ]);

            $lessonVideo->save();

            dispatch(new ProcessVideo($lessonVideo));
        }

        return $data;
    }
}
