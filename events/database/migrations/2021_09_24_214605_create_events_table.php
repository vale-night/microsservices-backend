<?php


use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('highlight')->default(false);
            $table->string('age_group')->nullable();
            $table->geospatial('location', '2dsphere');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
}
