<?php
return [
    'default' => 'mongodb',
    'connections' => [
        'mongodb' => [
                'driver' => 'mongodb',
                'dsn' => env('DB_URI', 'mongodb+srv://username:password@<atlas-cluster-uri>/myappdb?retryWrites=true&w=majority'),
                'database' => 'myappdb',
                'options' => [
                    'database' => 'admin' // sets the authentication database required by mongo 3
                ]
            ],
        ],
        'migrations' => 'migrations',
    ];
