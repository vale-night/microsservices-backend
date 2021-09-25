<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;


class Event extends Model
{
    use SoftDeletes;
    use HasTimestamps;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name','description', 'highlight','age_group'
    ];

    protected $collection ='events';
}
