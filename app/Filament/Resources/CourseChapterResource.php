<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseChapterResource\Pages;
use App\Filament\Resources\CourseChapterResource\RelationManagers;
use App\Models\CourseChapter;
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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class CourseChapterResource extends NestedResource
{
    protected static ?string $model = CourseChapter::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $breadcrumbTitleAttribute = 'name';

    protected static ?string $label = 'Chương học';
    protected static ?string $pluralLabel = 'Chương học';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
//                Forms\Components\Select::make('course_section_id')
//                    ->required()
//                ->relationship('section', 'name'),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live()
                    ->afterStateUpdated(function (Get $get, Set $set, string $operation, ?string $old, ?string $state) {
                        if (($get('slug') ?? '') !== Str::slug($old) || $operation !== 'create') {
                            return;
                        }

                        $set('slug', Str::slug($state));
                    })
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('description')
                    ->maxLength(65535)
                    ->columnSpanFull(),
                Forms\Components\Hidden::make('duration')
                ->default(0),
                Forms\Components\Hidden::make('position')
                    ->default(0),
                Forms\Components\TextInput::make('video_url')
                    ->maxLength(255),
                Forms\Components\FileUpload::make('image_url')
                    ->image(),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
//                Tables\Columns\TextColumn::make('course_section_id')
//                    ->numeric()
//                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('duration')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('position')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('video_url')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image_url'),
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
            RelationManagers\LessonsRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourseChapters::route('/'),
            'create' => Pages\CreateCourseChapter::route('/create'),
            'edit' => Pages\EditCourseChapter::route('/{record}/edit'),
        ];
    }

    public static function getAncestor() : ?Ancestor
    {
        return Ancestor::make(
            CourseSectionResource::class,
            'section'
        );
    }
}
