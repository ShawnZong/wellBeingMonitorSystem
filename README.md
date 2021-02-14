# mornitoringWebFinalProject

# introduction

web software development course project
the application can be found in link: https://tjs-monitor-system.herokuapp.com/
for best UX, plese use Google Chrome browser
Junsheng Tan

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
