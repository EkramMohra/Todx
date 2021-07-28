-- CREATE DATABASE sql_todx;
USE sql_todx;

-- CREATE TABLE photo(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     photo VARCHAR(40)
-- );

-- CREATE TABLE role(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     role VARCHAR(40)
-- );

-- CREATE TABLE user(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     last VARCHAR(40),
--     first VARCHAR(40),
--     email VARCHAR(40),
--     password VARCHAR(40),
--     role_id INT,
--     photo_id INT,
--     FOREIGN KEY(photo_id) REFERENCES photo(id),
--     FOREIGN KEY(role_id) REFERENCES role(id)
-- );