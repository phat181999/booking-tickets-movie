CREATE DATABASE movie

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT,
    password VARCHAR(100),
    numberPhone VARCHAR(15),
    role VARCHAR(50)
);

DROP TABLE IF EXISTS users;

CREATE TABLE movies(
    movies_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    director VARCHAR(100),
    description VARCHAR(800),
    type VARCHAR(100),
    trailer VARCHAR(500),
    avatar VARCHAR(200),
    theater_id INTEGER REFERENCES theaters
);

ALTER TABLE movies ADD COLUMN showTime timestamp;
ALTER TABLE movies ADD COLUMN timeCount INTEGER;
DROP TABLE IF EXISTS movies;

CREATE TABLE reviews(
    review_id SERIAL PRIMARY KEY,
    description VARCHAR(800),
    rating VARCHAR(100),
    userName_id INTEGER REFERENCES users (user_id),
    reviewMovie_id INTEGER REFERENCES movies (movies_id)
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE seats(
    seat_id SERIAL PRIMARY KEY, 
    row VARCHAR(100),
    seatNumber VARCHAR(100)
);

DROP TABLE IF EXISTS seats;

CREATE TABLE theaters(
    theater_id SERIAL PRIMARY KEY,
    nameTheater VARCHAR(100),
    seat VARCHAR(100),
    seat_id INTEGER REFERENCES seats (seat_id),
    showTimes_id INTEGER REFERENCES showTimes(showtime_id)
);

DROP TABLE IF EXISTS theaters;

CREATE TABLE showTimes(
    showtime_id SERIAL PRIMARY KEY,
    showTime DATE,
    nameTheater VARCHAR(100)
);

ALTER TABLE showTimes ADD COLUMN time timestamp;
DROP TABLE IF EXISTS showTimes;

CREATE TABLE tickets(
    ticket_id SERIAL PRIMARY KEY,
    userName_id INTEGER REFERENCES users (user_id),
    movie_id INTEGER REFERENCES movies (movies_id),
    totalPrice DECIMAL
);

DROP TABLE IF EXISTS tickets;

CREATE TABLE bookingTheater(
    bookingTheater_id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies (movies_id),
    theater_id INTEGER REFERENCES theaters (theater_id),
    timer INTEGER
);
ALTER TABLE bookingTheater ADD COLUMN createAt timestamp;
ALTER TABLE bookingTheater ADD COLUMN deleteAt timestamp;
ALTER TABLE bookingTheater ADD COLUMN status VARCHAR(50);