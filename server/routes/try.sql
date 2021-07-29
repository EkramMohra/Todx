
USE sql_todx;

-- CREATE TABLE todolist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     todotask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(todotask_id) REFERENCES todotask(id)
-- );

-- CREATE TABLE dailylist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     user_id INT,
--     dailytask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(dailytask_id) REFERENCES dailytask(id)
-- );
-- CREATE TABLE timedlist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     timedtask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(timedtask_id) REFERENCES timedtask(id)
-- );

-- CREATE TABLE toDoTask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     date VARCHAR(40),
--     status VARCHAR(40),
--     priority BOOLEAN
-- );
-- CREATE TABLE dailyTask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     status VARCHAR(40)
-- );
-- CREATE TABLE timedtask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     date VARCHAR(40),
--     time VARCHAR(40),
--     status VARCHAR(40),
--     notification VARCHAR(40)
-- );

-- CREATE TABLE ltask(
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

-- CREATE TABLE todolist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     todotask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(todotask_id) REFERENCES todotask(id)
-- );
-- CREATE TABLE dailylist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     user_id INT,
--     dailytask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(dailytask_id) REFERENCES dailytask(id)
-- );
-- CREATE TABLE timedlist(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     timedtask_id INT,
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(timedtask_id) REFERENCES timedtask(id)
-- );
-- CREATE TABLE toDoTask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     date VARCHAR(40),
--     status VARCHAR(40),
--     priority BOOLEAN
-- );
-- CREATE TABLE dailyTask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     status VARCHAR(40)
-- );
-- CREATE TABLE timedtask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     date VARCHAR(40),
--     time VARCHAR(40),
--     status VARCHAR(40),
--     notification VARCHAR(40)
-- );




--  INSERT INTO 
--         todotask(title,content,date,priority,status)
--         VALUES('Clean the house','Clean bedroom and garden','2021/07/27',0,'pending');

-- SELECT todotask.* 
--                 FROM todotask JOIN todolist 
--                 WHERE todolist.user_id = '1'
--                 AND todolist.todotask_id = todotask.id
--                 AND todotask.date = '2021/07/27'
--                 AND todotask.status = 'pending';
    --   UPDATE todotask 
    --     SET title = 'clean house',
    --         content = 'fold clothes',
    --         date = '2021-07-27',
    --         status = 'pending',
    --         priority = 1
    --     WHERE id = 4;


--     UPDATE todotask 
--         SET status = 'done'
--         WHERE id = 38;
-- ALTER TABLE dailyTask
-- RENAME TO dailytask ;

-- SELECT timedtask.* 
--               FROM timedtask JOIN timedlist 
--               WHERE timedlist.user_id = 1
--               AND timedlist.timedtask_id = timedtask.id
--               AND timedtask.date = "2021-07-29"
