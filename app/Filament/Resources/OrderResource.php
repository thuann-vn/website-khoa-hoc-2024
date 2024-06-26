<?php

namespace App\Filament\Resources;

use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\MasterCourse;
use App\Models\OfflineCourse;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Pelmered\FilamentMoneyField\Forms\Components\MoneyInput;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('offline_course_id')
                    ->label('Offline course')
                    ->afterStateUpdated(function(Forms\Get $get, Forms\Set $set){
                        if($get('offline_course_id')){
                            $courseSection = OfflineCourse::find($get('offline_course_id'));
                            $set('total_price', intval($courseSection->price));
                        }
                    })
                    ->live()
                    ->options(function(Forms\Get $get){
                        return OfflineCourse::pluck('name', 'id');
                    }),
                Forms\Components\Select::make('master_course_id')
                    ->label('Master course')
                    ->afterStateUpdated(function(Forms\Get $get, Forms\Set $set){
                        if($get('master_course_id')){
                            $courseSection = MasterCourse::find($get('master_course_id'));
                            $set('total_price', intval($courseSection->price));
                        }
                    })
                    ->live()
                    ->options(function(Forms\Get $get){
                        return MasterCourse::pluck('name', 'id');
                    }),
                Forms\Components\Select::make('course_id')
                    ->label('Course')
                    ->live()
                    ->afterStateUpdated(function(Forms\Get $get, Forms\Set $set){
                        if($get('course_id')){
                            $course = Course::find($get('course_id'));
                            $set('total_price', $course->price);
                        }
                    })
                    ->options(function(Forms\Get $get){
                        return Course::pluck('name', 'id');
                    }),
                Forms\Components\Select::make('course_section_id')
                    ->live()
                    ->afterStateUpdated(function(Forms\Get $get, Forms\Set $set){
                        if($get('course_section_id')){
                            $courseSection = CourseSection::find($get('course_section_id'));
                            $set('total_price', $courseSection->price);
                        }
                    })
                    ->options(function(Forms\Get $get){
                        $courseId = $get('course_id');
                        return CourseSection::whereCourseId($courseId)->pluck('name', 'id');
                    }),
                Forms\Components\Select::make('user_id')
                    ->label('Student')
                    ->hint('After creating the user, assign the order to see history.')
                    ->options(function(Forms\Get $get){
                        return \App\Models\Student::pluck('name', 'id');
                    }),
                Forms\Components\Select::make('type')
                    ->enum(OrderTypeEnum::class)
                    ->options(OrderTypeEnum::class)
                    ->required(),
                MoneyInput::make('total_price')
                    ->required()
                    ->default(0)
                    ->prefix('$'),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone')
                    ->tel()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('zalo')
                    ->tel()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('voucher_code')
                    ->maxLength(255),
                Forms\Components\TextInput::make('discount')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Forms\Components\Select::make('status')
                    ->enum(OrderStatusEnum::class)
                    ->options(OrderStatusEnum::class)
                    ->required(),
                Forms\Components\Textarea::make('notes')
                    ->maxLength(65535)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('masterCourse.name')
                    ->default('-')
                    ->sortable(),
                Tables\Columns\TextColumn::make('course.name')
                    ->sortable(),
                Tables\Columns\TextColumn::make('courseSection.name')
                    ->default('-')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_price')
                    ->numeric(locale: 'vi')
                    ->sortable(),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
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
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
