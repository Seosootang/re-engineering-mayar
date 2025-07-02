<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Webinar extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'payment_type',
        'price',
        'original_price',
        'description',
        'webinar_link',
        'start_datetime',
        'end_datetime',
        'cover_image_path',
        'instructions',
        'terms_and_conditions',
        'sales_start_datetime',
        'registration_close_datetime',
        'max_participants',
        'redirect_url',
        'is_affiliatable',
        'affiliate_commission_percentage',
    ];

    protected $casts = [
        'is_affiliatable' => 'boolean',
        'price' => 'float',
        'original_price' => 'float',
        'affiliate_commission_percentage' => 'float',
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
        'sales_start_datetime' => 'datetime',
        'registration_close_datetime' => 'datetime',
    ];

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }
}
