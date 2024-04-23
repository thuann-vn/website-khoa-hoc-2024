<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseLessonResource\Pages\CreateCourseLesson;
use App\Filament\Resources\CourseLessonResource\Pages\EditCourseLesson;
use App\Filament\Resources\CourseLessonResource\Pages\ListCourseLessons;
use App\Filament\Resources\CourseResource\Pages;
use App\Filament\Resources\CourseResource\RelationManagers;
use App\Models\Course;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Guava\Filament\NestedResources\Resources\NestedResource;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;
use Pelmered\FilamentMoneyField\Forms\Components\MoneyInput;
use Pelmered\FilamentMoneyField\Tables\Columns\MoneyColumn;

class CourseResource extends NestedResource
{

    public static function getRecordTitle(?Model $record): string|null|Htmlable
    {
        return $record->name ?? '';
    }

    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $breadcrumbTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image')
                    ->label('Image')
                    ->image()
                    ->required()
                ->columnSpanFull(),
                Forms\Components\Select::make('teacher_id')
                    ->relationship('teacher', 'name')
                    ->required(),
                Forms\Components\Select::make('course_category_id')
                    ->relationship('category', 'name')
                    ->required(),
                Forms\Components\Select::make('masterCourses')
                    ->relationship('masterCourses', 'name')
                    ->multiple()
                    ->preload()
                ->columnSpanFull(),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (Get $get, Set $set, string $operation, ?string $old, ?string $state) {
                        if (($get('slug') ?? '') !== Str::slug($old) || $operation !== 'create') {
                            return;
                        }

                        $set('slug', Str::slug($state));
                    })
                    ->maxLength(255),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),
                TinyEditor::make('description')
                    ->required()
                    ->maxLength(65535)
                    ->columnSpanFull(),
                MoneyInput::make('price')
                    ->required()
                    ->prefix('$'),
                MoneyInput::make('old_price')
                    ->prefix('$'),
                MoneyInput::make('one_on_one_price')
                    ->required()
                    ->prefix('$'),
                MoneyInput::make('old_one_on_one_price')
                    ->prefix('$'),
                Forms\Components\DatePicker::make('sale_start'),
                Forms\Components\DatePicker::make('sale_end'),
                Forms\Components\Toggle::make('is_active')
                    ->columnSpanFull()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('teacher.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                MoneyColumn::make('price')
                    ->money('VND')
                    ->sortable(),
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
                Tables\Actions\Action::make('Manage lessons')
                    ->color('success')
                    ->icon('heroicon-m-academic-cap')
                    ->url(
                        fn (Course $record): string => static::getUrl('lessons.index', [
                            'parent' => $record->id,
                        ])
                    ),
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
//            RelationManagers\LessonsRelationManager::class,
            RelationManagers\SectionsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),

            // Lessons
            'lessons.index' => ListCourseLessons::route('/{parent}/lessons'),
            'lessons.create' => CreateCourseLesson::route('/{parent}/lessons/create'),
            'lessons.edit' => EditCourseLesson::route('/{parent}/lessons/{record}/edit'),
        ];
    }
}
