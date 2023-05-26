create table if not exists mpk_lines
(
    name varchar(5) not null primary key,
    type int        not null
);

create table if not exists stops
(
    stop_id   int primary key,
    name      varchar(50) not null,
    latitude  float       not null,
    longitude float       not null
);

create table if not exists favourite_places
(
    id        int primary key auto_increment,
    name      varchar(30) not null,
    latitude  float       not null,
    longitude float       not null,
    client_id varchar(50) not null
);

create table if not exists connections
(
    id                int primary key auto_increment,
    departure_stop_id int        not null,
    arrival_stop_id   int        not null,
    departure_time    time       not null,
    arrival_time      time       not null,
    line              varchar(5) not null,
    FOREIGN KEY (departure_stop_id) REFERENCES stops (stop_id),
    FOREIGN KEY (arrival_stop_id) REFERENCES stops (stop_id),
    FOREIGN KEY (line) REFERENCES mpk_lines (name)
);

create table if not exists Routes
(
    line varchar(5) not null,
    stop int        not null,
    id   int        not null,
    FOREIGN KEY (stop) REFERENCES stops (stop_id),
    FOREIGN KEY (line) REFERENCES mpk_lines (name)
);