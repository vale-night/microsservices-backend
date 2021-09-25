<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;


class Event extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
}
