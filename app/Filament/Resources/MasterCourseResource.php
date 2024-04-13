<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MasterCourseResource\Pages;
use App\Filament\Resources\MasterCourseResource\RelationManagers;
use App\Models\Course;
use App\Models\MasterCourse;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Pelmered\FilamentMoneyField\Forms\Components\MoneyInput;
use Pelmered\FilamentMoneyField\Tables\Columns\MoneyColumn;

class MasterCourseResource extends Resource
{
    protected static ?string $model = MasterCourse::class;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->columnSpanFull()
                    ->required(),
                Forms\Components\Select::make('courses')
                    ->live()
                    ->afterStateUpdated(function (Get $get, Set $set) {
                        $courses = $get('courses');
                        $price = 0;
                        foreach ($courses as $courseId) {
                            $course   = Course::find($courseId);
                            $price += $course->price;
                        }
                        $set('old_price', $price);
                    })
                    ->multiple()
                    ->preload()
                    ->columnSpanFull()
                    ->relationship('courses', 'name'),
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
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->maxLength(65535)
                    ->columnSpanFull(),
                Forms\Components\RichEditor::make('content')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                MoneyColumn::make('price')
                    ->money('VND')
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
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
//            RelationManagers\CoursesRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMasterCourses::route('/'),
            'create' => Pages\CreateMasterCourse::route('/create'),
            'edit' => Pages\EditMasterCourse::route('/{record}/edit'),
        ];
    }
}
