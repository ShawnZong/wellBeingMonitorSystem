# Well-Being Monitor

App website: http://188.166.113.83/
Author: Junsheng Tan
Portfolio website: https://junshengtan.webflow.io

# introduction

Website to monitor your daily mood and produce statistical reports on a weekly and monthly level.

Techonologies: Deno runtime; Postgres Database; Oak framework for the router; Session is available; bcrypt is used for encrypted user credentials.

I used Docker-compose to setup Postgres database and Deno runtime, flyway for dynamically updating database schema.

Deployed on Digital Ocean, the application can be found in link: http://188.166.113.83/

for best UX, plese use Google Chrome browser

Endpoint /api/summary returns JSON with all uses' statistics, e.g., average mood of all users over the last 7 days.

Endpoint /api/summary/:year/:month/:day returns JSON the same statistics as above, but whthin a given day.

## Setup

1.  Run the follow SQL or run the SQL file from ./init.sql to create user and report table

        

``` 
        create table users (
        id serial not null constraint users_pkey primary key,
        email varchar(320) not null,
        password char(60) not null

    );

alter table
users owner to web;

create unique index users_lower_idx on users (lower(email :: text));

create table report (
id serial not null constraint report_pk primary key,
user_id integer constraint report_user_id_fkey references users,
type integer not null,
add_date date,
sleep_time integer,
sleep_quality integer,
sport_exercise_time integer,
study_time integer,
eat_regularity_quality integer,
mood integer
);

alter table
report owner to web;

create index report_user_id_index on report (user_id);

create index report_type_index on report (type);
create table users
(
id serial not null
constraint users_pkey
primary key,
email varchar(320) not null,
password char(60) not null
);

        alter table users
            owner to web;

        create unique index users_lower_idx
            on users (lower(email::text));

        create table report
        (
            id                     serial  not null
                constraint report_pk
                    primary key,
            user_id                integer
                constraint report_user_id_fkey
                    references users,
            type                   integer not null,
            add_date               date,
            sleep_time             integer,
            sleep_quality          integer,
            sport_exercise_time    integer,
            study_time             integer,
            eat_regularity_quality integer,
            mood                   integer
        );

        alter table report
            owner to web;

        create index report_user_id_index
            on report (user_id);

        create index report_type_index
            on report (type);
    ```

2.  Add database credentials

    2.1 create configuration object in ./config/config.js, add your own database credentials

    

``` 
        config.database = {
        hostname: "",
        database: "",
        user: "",
        password: "",
        port: "",
        };
    ```

    2.2 or set an environment variable DATABASE_URL, run this command in terminal. The configuration will be fed in automatically.

    

``` 
        export DATABASE_URL=postgres://<user>:<password>@<hostname>:<port>/<database>
    ```

    2.3 run the application. run this command in directory containing app.js, then the application can be access through http://localhost:7777/

    

``` 
        deno run --allow-net --unstable --allow-read --allow-env --allow-write app.js
    ```

3.  To run test, enter the directory of app.js and run the following command in terminal

``` 
    deno test --allow-all --unstable
```
