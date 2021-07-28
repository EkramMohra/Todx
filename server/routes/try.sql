USE sql_todx;

-- CREATE TABLE photo(

--      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     photo VARCHAR(40)
-- );


-- CREATE TABLE user(
--      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     last VARCHAR(40),
--     first VARCHAR(40),
--     email VARCHAR(40),
--     password VARCHAR(40),
--     role VARCHAR(40),
--     photo_id INT,
--      FOREIGN KEY(photo_id) REFERENCES photo(id)
-- );

-- CREATE TABLE task(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--    content VARCHAR(40),
--    date VARCHAR(40),
--    status VARCHAR(40)
-- );


-- CREATE TABLE list(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     task_id INT,
    
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(task_id) REFERENCES task(id)
-- );

CREATE TABLE todolist(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date VARCHAR(40),
    user_id INT,
    todotask_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(todotask_id) REFERENCES todotask(id)
);
CREATE TABLE dailylist(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT,
    dailytask_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(dailytask_id) REFERENCES dailytask(id)
);
-- CREATE TABLE timedlist(
-- CREATE TABLE ltask(
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




-- =================================================

-- INSERT task(title,content,date,time,status,notification,favourite)
-- VALUES('Clean garden','plant new trees','25/07/2021',null,'pending','on',0);

-- INSERT user(last,first,email,password,photo_id)
-- VALUES('Mohra','Ekram','mohraekram@gmail.com','1234',2);

-- INSERT INTO list (date,user_id,task_id)
--     VALUES('25/07/2021','2' ,'9');

-- INSERT INTO list (date,user_id,task_id)
--     VALUES('01/08/2021','2' ,'6');

-- ===============================

-- SELECT task.* 
--     FROM task JOIN list 
--     WHERE list.user_id = 1
--     AND list.task_id = task.id
--     AND task.date = '25/07/2021'

    -- SELECT task.* 
    --         FROM task JOIN list 
    --         WHERE list.user_id = '1'
    --         AND list.task_id = task.id
    --         AND task.date = '25/07/2021'
    --         AND task.status = 'pending';


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
      UPDATE todotask 
        SET title = 'clean house',
            content = 'fold clothes',
            date = '2021-07-27',
            status = 'pending',
            priority = 1
        WHERE id = 4;
