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
--     id INT  NOT NULL PRIMARY KEY,
--     last VARCHAR(40),
--     first VARCHAR(40),
--     email VARCHAR(40),
--     password VARCHAR(40),
--     role_id INT,
--     photo_id INT,
--     FOREIGN KEY(photo_id) REFERENCES photo(id),
--     FOREIGN KEY(role_id) REFERENCES role(id)
-- );

-- ALTER TABLE user
-- ADD role_id INT,
-- ADD FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE;
-- ADD FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE;

-- CREATE TABLE sharedtasks(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     sender_id INT,
--     recevier_id INT,
--     task_id INT,
--     task_type VARCHAR(40),

--     FOREIGN KEY(sender_id) REFERENCES user(id),
--     FOREIGN KEY(recevier_id) REFERENCES user(id)
-- );
-- CREATE TABLE dailylog(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     task_id INT,
--     date VARCHAR(40),
--     FOREIGN KEY(task_id) REFERENCES dailytask(id)
-- );
-- Alter Table dailylog Add Constraint sqlUniqueConstraint UNIQUE (task_id, date)

--  SET FOREIGN_KEY_CHECKS=0;
-- DROP TABLE sharedtasks;

