<?php

namespace App\Filament\Resources\StudentResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CoursesRelationManager extends RelationManager
{
    protected static string $relationship = 'courses';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('pivot.courseSection.name')
                    ->label('Section')
                    ->default('All Sections')
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\AttachAction::make()
                    ->label('Add Course')
                    ->form(fn (Tables\Actions\AttachAction $action): array => [
                        Forms\Components\Select::make('recordId')
                            ->options(
                                \App\Models\Course::query()
                                    ->pluck('name', 'id')
                                    ->all()
                            )
                            ->searchable()
                            ->required(),
                        Forms\Components\Select::make('course_section_id')
                            ->label('Section')
                            ->hint('Skip this if allow to view all sections')
                            ->options(function (Forms\Get $get): array {
                                return \App\Models\CourseSection::query()
                                    ->where('course_id', $get('recordId'))
                                    ->pluck('name', 'id')
                                    ->all();
                            })
                            ->searchable(),
                    ])
            ])
            ->actions([
                Tables\Actions\DetachAction::make()->label('Remove Access'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
