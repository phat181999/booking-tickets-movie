CREATE DATABASE movie

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT,
    password VARCHAR(100),
    role VARCHAR(50)
);

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    director VARCHAR(100),
    description VARCHAR(800),
    type VARCHAR(100),
    trailer VARCHAR(500),
    avatar VARCHAR(200)
);

DROP TABLE IF EXISTS movies;

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    description VARCHAR(800),
    rating VARCHAR(100),
    userName VARCHAR(100)
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE seats(
    id SERIAL PRIMARY KEY,
    row VARCHAR(100),
    seatNumber VARCHAR(100)
);

CREATE TABLE theaters(
    id SERIAL PRIMARY KEY,
    nameTheater VARCHAR(100),
    seat VARCHAR(100)
);

CREATE TABLE showTimes(
    id SERIAL PRIMARY KEY,
    showTime DATE,
    nameTheater VARCHAR(100)
);

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(100),
    showTime DATE,
    totalPrice DECIMAL,
    seat VARCHAR(100)
);