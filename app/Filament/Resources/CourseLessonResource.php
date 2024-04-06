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
use Filament\Tables;
use Filament\Tables\Table;
use Guava\Filament\NestedResources\Ancestor;
use Guava\Filament\NestedResources\Resources\NestedResource;
use Illuminate\Support\Str;

class CourseLessonResource extends NestedResource
{
    protected static ?string $model = CourseLesson::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $label = 'Bài học';
    protected static ?string $pluralLabel = 'Bài học';

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
                            Forms\Components\Select::make('course_id')
                                ->label('Khóa học')
                                ->options(
                                    Course::all()->pluck('name', 'id')->toArray()
                                )
                                ->required()
                                ->live(),
                            Forms\Components\Select::make('course_section_id')
                                ->label('Phần học')
                                ->options(
                                    function (Get $get) {
                                        return CourseSection::where('course_id', $get('course_id'))->pluck('name', 'id')->toArray();
                                    }
                                )
                                ->createOptionForm(fn (Form $form) => CourseSectionResource::form($form))
                                ->createOptionUsing(function (array $data, Get $get, ) {
                                    return CourseSection::create($data + ['course_id' => $get('course_id')]);
                                })
                                ->live(),
                            Forms\Components\Select::make('course_chapter_id')
                                ->label('Chương học')
                                ->options(
                                    function (Get $get) {
                                        return CourseChapter::where('course_section_id', $get('course_section_id'))->pluck('name', 'id')->toArray();
                                    }
                                )
                                ->createOptionForm(fn (Form $form) => CourseChapterResource::form($form))
                                ->createOptionUsing(function (array $data, Get $get, ) {
                                    return CourseChapter::create($data + ['course_section_id' => $get('course_section_id')]);
                                })
                        ])->columns(3),

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
                        Forms\Components\RichEditor::make('description')
                            ->required()
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
                                ->numeric()
                                ->default(0),
                            Forms\Components\TextInput::make('seconds')
                                ->numeric()
                                ->default(0),
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
                Tables\Columns\TextColumn::make('course.name')
                    ->description(function ($record) {
                        if($record->course?->section?->name && $record->course?->chapter?->name){
                            return $record->course?->section?->name . ' - ' . $record->course?->chapter?->name;
                        }else if($record->course?->section?->name) {
                            return $record->course?->section?->name;
                        }
                        return '';
                    })
                    ->numeric()
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
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
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
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

    public static function getAncestor() : ?Ancestor
    {
        // This is just a simple configuration with a few helper methods
        return Ancestor::make(
            CourseResource::class, // Parent Resource Class
        );
    }
}
