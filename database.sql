CREATE DATABASE todo_database;

-- \c into todo_database

CREATE TABLE todo(
    id VARCHAR primary key,
    title VARCHAR(100),
    notes VARCHAR(500),
    duedate VARCHAR(20),
    priority VARCHAR(10),
    done boolean,
    show boolean
);