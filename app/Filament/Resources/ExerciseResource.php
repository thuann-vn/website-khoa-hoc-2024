<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExerciseResource\Pages;
use App\Filament\Resources\ExerciseResource\RelationManagers;
use App\Models\Exercise;
use App\Models\UserCourse;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;

class ExerciseResource extends Resource
{
    protected static ?string $model = Exercise::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make()
                    ->schema([
                        Forms\Components\Tabs\Tab::make('Nội dung bài tập')
                            ->schema([
                                Forms\Components\Select::make('user_id')
                                    ->label('Học viên')
                                    ->options(function () {
                                        return \App\Models\Student::all()->pluck('name', 'id');
                                    })
                                    ->live()
                                    ->required(),
                                Forms\Components\Select::make('course_id')
                                    ->label('Khóa học')
                                    ->options(function (Forms\Get $get) {
                                        $userCourses = UserCourse::where('user_id', $get('user_id'))->pluck('course_id');
                                        return \App\Models\Course::whereIn('id', $userCourses)->pluck('name', 'id');
                                    })
                                    ->live()
                                    ->required(),
                                Forms\Components\Select::make('lesson_id')
                                    ->label('Bài học')
                                    ->options(function (Forms\Get $get) {
                                        return \App\Models\CourseLesson::where('course_id', $get('course_id'))->orderBy('position')->pluck('name', 'id');
                                    })
                                    ->required(),
                                TinyEditor::make('content')
                                    ->label('Nội dung bài tập')
                                    ->columnSpanFull(),
                                Forms\Components\FileUpload::make('attachments')
                                    ->label('Bài tập')
                                    ->multiple()
                                    ->previewable(false)
                                    ->downloadable()
                                    ->preserveFilenames()
                                    ->directory(function(Forms\Get $get){
                                        return 'exercises/' . $get('user_id') . '_' . $get('course_id') . '_' . $get('lesson_id');
                                    })
                                    ->required()
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make('Bài làm của học viên')
                            ->schema([
                                Forms\Components\FileUpload::make('completed_attachments')
                                    ->label('Bài làm của học viên')
                                    ->previewable(false)
                                    ->hiddenLabel()
                                    ->disabled()
                                    ->multiple()
                                    ->downloadable()
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make('Sửa bài làm')
                            ->schema([
                                Forms\Components\FileUpload::make('fixed_attachments')
                                    ->label('Bài làm đã sửa')
                                    ->previewable(false)
                                    ->directory(function(Forms\Get $get){
                                        return 'exercises/' . $get('user_id') . '_' . $get('course_id') . '_' . $get('lesson_id') . '/fixed';
                                    })
                                    ->downloadable()
                                    ->multiple()
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('comment')
                                    ->name('Bình luận của giáo viên')
                                    ->columnSpanFull(),
                            ])
                    ])
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Học viên')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('course.name')
                    ->label('Khóa học')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('lesson.name')
                    ->label('Bài học')
                    ->numeric()
                    ->sortable()
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
            'index' => Pages\ListExercises::route('/'),
            'create' => Pages\CreateExercise::route('/create'),
            'edit' => Pages\EditExercise::route('/{record}/edit'),
        ];
    }
}
