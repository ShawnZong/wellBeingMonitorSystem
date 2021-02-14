create table users (
    id serial not null constraint users_pkey primary key,
    email varchar(320) not null,
    password char(60) not null
);

alter table
    users owner to username;

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
    report owner to username;

create index report_user_id_index on report (user_id);

create index report_type_index on report (type);
