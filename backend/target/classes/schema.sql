create table if not exists MPKLines
(
    name varchar(5) not null primary key,
    type int        not null
);

create table if not exists Stops
(
    stop_id   int primary key auto_increment,
    name      varchar(50) not null,
    latitude  float       not null,
    longitude float       not null
);

create table if not exists FavouritePlaces
(
    id        int primary key auto_increment,
    name      varchar(30) not null,
    latitude  float       not null,
    longitude float       not null,
    client_id varchar(50) not null
);

create table if not exists Connections
(
    departure_stop_id int        not null,
    arrival_stop_id   int        not null,
    departure_time    time       not null,
    arrival_time      time       not null,
    line              varchar(5) not null,
    FOREIGN KEY (departure_stop_id) REFERENCES Stops (stop_id),
    FOREIGN KEY (arrival_stop_id) REFERENCES Stops (stop_id),
    FOREIGN KEY (line) REFERENCES MPKLines (name)
);

create table if not exists Routes
(
    line varchar(5) not null,
    stop int        not null,
    id   int        not null,
    FOREIGN KEY (stop) REFERENCES Stops (stop_id),
    FOREIGN KEY (line) REFERENCES MPKLines (name)
);