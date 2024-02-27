<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends User{
    protected $table =  'users';
    protected static function boot()
    {
        static::addGlobalScope('type', function (Builder $builder) {
            $builder->where('type', 'teacher');
        });

        parent::boot();
    }
}
