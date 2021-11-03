<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post('/events', 'EventController@store');
$router->get('/events', 'EventController@index');
$router->get('/events/{event}', 'EventController@show');
$router->put('/events/{event}', 'EventController@update');
$router->delete('/events/{event}', 'EventController@delete');