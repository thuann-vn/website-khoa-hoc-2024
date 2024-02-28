<?php

namespace App\Jobs;

use App\Models\CourseLessonVideo;
use Filament\Notifications\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use ProtoneMedia\LaravelFFMpeg\Exporters\HLSExporter;
use ProtoneMedia\LaravelFFMpeg\FFMpeg\ProgressListenerDecorator;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use Streaming\Format\X264;

class ProcessVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected CourseLessonVideo $lessonVideo;
    /**
     * Create a new job instance.
     */
    public function __construct($lessonVideo)
    {
        //
        $this->lessonVideo = $lessonVideo;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try{
            $lowBitrate = (new \FFMpeg\Format\Video\X264)->setKiloBitrate(250);
            $midBitrate = (new \FFMpeg\Format\Video\X264)->setKiloBitrate(500);
            $highBitrate = (new \FFMpeg\Format\Video\X264)->setKiloBitrate(1000);
            $fileName = pathinfo($this->lessonVideo->video_url, PATHINFO_FILENAME);
            $lessonVideo = $this->lessonVideo;
            $encryptionKey = HLSExporter::generateEncryptionKey();

            $newPath = 'lesson_'. $lessonVideo->courseLesson->id . '/' . $fileName . '.m3u8';

            FFMpeg::fromDisk('public')
                ->open($this->lessonVideo->video_url)
                ->exportForHLS()
                ->addFormat($lowBitrate)
                ->addFormat($midBitrate)
                ->addFormat($highBitrate)
                ->toDisk('public')
                ->onProgress(function ($percentage) use ($lessonVideo) {
                    echo "$percentage % transcoded" . PHP_EOL;
                    $lessonVideo->progress = $percentage;
                    $lessonVideo->save();
                })
                ->save($newPath);
            $lessonVideo->video_url = $newPath;
            $lessonVideo->completed_at = now();
            $lessonVideo->status = 1;
            $lessonVideo->save();
        }catch (\Exception $e){
            $this->lessonVideo->status = 2;
            $this->lessonVideo->save();
            Log::error($e->getMessage());
            return;
        }
    }
}
