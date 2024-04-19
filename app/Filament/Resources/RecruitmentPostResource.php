<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RecruitmentPostResource\Pages;
use App\Filament\Resources\RecruitmentPostResource\RelationManagers;
use App\Models\RecruitmentPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class RecruitmentPostResource extends Resource
{
    protected static ?string $model = RecruitmentPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    /**
     * The resource navigation group.
     */
    protected static ?string $navigationGroup = 'Collections';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('image')
                    ->columnSpanFull()
                    ->image(),
                Forms\Components\TextInput::make('title')
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
                Forms\Components\TextInput::make('salary')
                    ->placeholder('Ví dụ: 10 - 15 triệu / Thoả thuận')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('location')
                    ->placeholder('Ví dụ: 123 Võ Văn Kiệt ,P2, Q5, TP.HCM')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('position')
                    ->placeholder('Ví dụ: Nhân viên kinh doanh')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('type')
                    ->placeholder('Toàn thời gian cố định / Thời vụ')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('total_positions')
                    ->placeholder('Số lượng tuyển dụng')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('probation_period')
                    ->placeholder('Thời gian thử việc')
                    ->required(),
                Forms\Components\DatePicker::make('expiry_date')
                    ->placeholder('Ngày hết hạn tuyển dụng')
                    ->required(),
                Forms\Components\TextInput::make('contact')
                    ->placeholder('Số điện thoại hoặc email liên hệ')
                    ->required()
                    ->maxLength(255),
                Forms\Components\RichEditor::make('content')
                    ->placeholder('Mô tả công việc')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('position')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('total_positions')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('expiry_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('contact')
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
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRecruitmentPosts::route('/'),
            'create' => Pages\CreateRecruitmentPost::route('/create'),
            'edit' => Pages\EditRecruitmentPost::route('/{record}/edit'),
        ];
    }
}
