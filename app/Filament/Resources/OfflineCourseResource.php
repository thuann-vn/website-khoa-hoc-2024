<?php

namespace App\Filament\Resources;

use App\Filament\Form\SEOFields;
use App\Filament\Resources\OfflineCourseResource\Pages;
use App\Filament\Resources\OfflineCourseResource\RelationManagers;
use App\Models\Course;
use App\Models\OfflineCourse;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Mohamedsabil83\FilamentFormsTinyeditor\Components\TinyEditor;
use Pelmered\FilamentMoneyField\Forms\Components\MoneyInput;

class OfflineCourseResource extends Resource
{
    protected static ?string $model = OfflineCourse::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make()
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('General info')
                            ->schema([

                                Forms\Components\FileUpload::make('image')
                                    ->columnSpanFull()
                                    ->image(),
                                Forms\Components\TextInput::make('name')
                                    ->label('Tên khóa học')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (Forms\Get $get, Forms\Set $set, string $operation, ?string $old, ?string $state) {
                                        if (($get('slug') ?? '') !== Str::slug($old) || $operation !== 'create') {
                                            return;
                                        }

                                        $set('slug', Str::slug($state));
                                    })
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Select::make('teacher_id')
                                    ->relationship('teacher', 'name')
                                    ->required(),
                                Forms\Components\TextInput::make('address')
                                    ->label('Địa chỉ học')
                                    ->maxLength(255)
                                    ->default(null),
                                Forms\Components\TextInput::make('time')
                                    ->label('Thời gian học')
                                    ->placeholder('Ví dụ: 3 tháng')
                                    ->maxLength(255)
                                    ->default(null),
                                Forms\Components\TextInput::make('period_time')
                                    ->label('Thời gian học thử')
                                    ->placeholder('Ví dụ: 1 ngày')
                                    ->maxLength(255)
                                    ->default(null),
                                Forms\Components\Select::make('type')
                                    ->label('Lịch khai giảng')
                                    ->options([
                                        'weekly' => 'Hàng tuần',
                                        'date' => 'Ngày cố định',
                                    ])
                                    ->live()
                                    ->default(null),
                                Forms\Components\DatePicker::make('start_date')
                                    ->disabled(function (Forms\Get $get){
                                        return $get('type') === 'weekly';
                                    })
                                    ->label('Ngày khai giảng'),
                                Forms\Components\Textarea::make('prepare')
                                    ->label('Chuẩn bị')
                                    ->columnSpanFull(),
                                TinyEditor::make('content')
                                    ->label('Nội dung khóa học')
                                    ->columnSpanFull(),
                                MoneyInput::make('price')
                                    ->label('Học phí')
                                    ->required()
                                    ->default(0)
                                    ->prefix('$'),
                                MoneyInput::make('old_price')
                                    ->label('Học phí cũ')
                                    ->required()
                                    ->default(0),
                                Forms\Components\Toggle::make('has_online')
                                    ->label('Có học online không?')
                                    ->columnSpanFull()
                                    ->live()
                                    ->required(),
                                Forms\Components\Select::make('online_course_id')
                                    ->relationship('onlineCourse', 'name')
                                    ->visible(function(Forms\Get $get){
                                        return $get('has_online');
                                    })
                                    ->label('Khóa học online')
                                    ->columnSpanFull()
                                    ->required(),
                            ]),
                        Forms\Components\Tabs\Tab::make('SEO')
                            ->schema([
                                SEOFields::create()
                            ])
                    ])->columns(1)->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('old_price')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
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
            'index' => Pages\ListOfflineCourses::route('/'),
            'create' => Pages\CreateOfflineCourse::route('/create'),
            'edit' => Pages\EditOfflineCourse::route('/{record}/edit'),
        ];
    }
}
