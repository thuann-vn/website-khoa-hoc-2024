<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseLessonResource\Pages;
use App\Models\Course;
use App\Models\CourseChapter;
use App\Models\CourseLesson;
use App\Models\CourseSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Guava\Filament\NestedResources\Ancestor;
use Guava\Filament\NestedResources\Resources\NestedResource;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Livewire\Component;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;

class CourseLessonResource extends Resource
{
    protected static ?string $model = CourseLesson::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $label = 'Bài học';
    protected static ?string $pluralLabel = 'Bài học';

    protected static ?string $slug = 'lessons';
    public static string $parentResource = CourseResource::class;

    protected static bool $shouldRegisterNavigation = false;

    public static function getRecordTitle(?Model $record): string|null|Htmlable
    {
        return $record->title;
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Tabs')->tabs([

                    Forms\Components\Tabs\Tab::make('Lesson Info')->schema([
                        Forms\Components\FileUpload::make('image_url')
                            ->image()
                            ->columnSpanFull(),
                        Forms\Components\Group::make([
                            Forms\Components\Hidden::make('course_id')
                                ->default(request()->route('parent') ?? request()->input('parent'))
                                ->required(),
                            Forms\Components\Select::make('course_section_id')
                                ->label('Phần học')
                                ->visible(function (Get $get){
                                    $course = Course::find($get('course_id'));
                                    return $course->sections()->count();
                                })
                                ->options(
                                    function (Get $get) {
                                        return CourseSection::where('course_id', $get('course_id'))->pluck('name', 'id')->toArray();
                                    }
                                )
                                ->createOptionForm(fn (Form $form) => CourseSectionResource::form($form))
                                ->createOptionUsing(function (array $data, Get $get, ) {
                                    return CourseSection::create($data + ['course_id' =>  request()->route('parent') ?? request()->input('parent')]);
                                })
                                ->live(),
                            Forms\Components\Select::make('course_chapter_id')
                                ->label('Chương học')
                                ->visible(function (Get $get){
                                    $courseId = $get('course_id');
                                    $course = Course::find($courseId);
                                    return $course->sections()->whereHas('chapters')->count();
                                })
                                ->options(
                                    function (Get $get) {
                                        return CourseChapter::where('course_section_id', $get('course_section_id'))->pluck('name', 'id')->toArray();
                                    }
                                )
                                ->createOptionForm(fn (Form $form) => CourseChapterResource::form($form))
                                ->createOptionUsing(function (array $data, Get $get, ) {
                                    return CourseChapter::create($data + ['course_section_id' => $get('course_section_id')]);
                                })
                        ])->columns(2),

                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Get $get, Set $set, string $operation, ?string $old, ?string $state) {
                                if (($get('slug') ?? '') !== Str::slug($old) || $operation !== 'create') {
                                    return;
                                }

                                $set('slug', Str::slug($state));
                            })
                            ->maxLength(255)
                            ->columnSpanFull(),
                        TinyEditor::make('description')
                            ->maxLength(65535)
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('duration')
                            ->visible(false)
                            ->numeric()
                            ->afterStateHydrated(function (string $state, Set $set) {
                                $set('minutes', floor($state / 60));
                                $set('seconds', $state % 60);
                            })
                            ->default(0),
                        Forms\Components\Group::make([
                            Forms\Components\TextInput::make('minutes')
                                ->required()
                                ->numeric(),
                            Forms\Components\TextInput::make('seconds')
                                ->required()
                                ->numeric(),
                        ])->columns(2),
                        Forms\Components\Hidden::make('position')
                            ->default(0),
                        Forms\Components\Toggle::make('is_trial')
                            ->default(false)
                            ->required(),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->required(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Attachments')->schema([
                        Forms\Components\FileUpload::make('attachments')
                            ->multiple()
                            ->previewable(false)
                            ->preserveFilenames()
                            ->columnSpanFull(),
                    ]),
                    Forms\Components\Tabs\Tab::make('Video')->schema([
                        Forms\Components\FileUpload::make('video_url')
                            ->visibility('private')
                            ->acceptedFileTypes(['video/*'])
                            ->previewable(false)
                            ->columnSpanFull(),
                    ])
                ])->columnSpanFull()

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_url'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('chapter.name')
                    ->label('Chương học')
                    ->numeric()
                    ->searchable(),
                Tables\Columns\TextColumn::make('duration')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('position')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_trial')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('position', 'asc')
//            ->defaultGroup('section.name')
            ->reorderable('position')
            ->filters([
                //
//                Tables\Filters\SelectFilter::make('course_id')
//                    ->options(
//                        Course::all()->pluck('name', 'id')->toArray()
//                    )
//                    ->label('Khóa học'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->url(
                        fn (Pages\ListCourseLessons $livewire, Model $record): string => static::$parentResource::getUrl('lessons.edit', [
                            'record' => $record,
                            'parent' => $livewire->parent,
                        ])
                    ),
                Tables\Actions\DeleteAction::make(),
            ])
            ->filtersLayout(Tables\Enums\FiltersLayout::AboveContent)
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourseLessons::route('/'),
            'create' => Pages\CreateCourseLesson::route('/create'),
            'edit' => Pages\EditCourseLesson::route('/{record}/edit'),
        ];
    }
}
