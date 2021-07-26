USE sql_todx;

-- CREATE TABLE list(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(40),
--     user_id INT,
--     task_id INT,
    
--     FOREIGN KEY(user_id) REFERENCES user(id),
--     FOREIGN KEY(task_id) REFERENCES task(id)
-- );

-- CREATE TABLE ltask(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,

--     task_id INT,
--     list_id INT,

--     FOREIGN KEY(list_id) REFERENCES list(id),
--     FOREIGN KEY(task_id) REFERENCES task(id)
-- );

-- CREATE TABLE task(

--      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     title VARCHAR(40),
--     content VARCHAR(40),
--     date VARCHAR(40),
--     time VARCHAR(40),
--     status VARCHAR(40),
--     notification VARCHAR(40),
--     favourite BOOLEAN

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

ALTER TABLE task
MODIFY COLUMN favourite VARCHAR(20);