CREATE TABLE IF NOT EXISTS 'todos' (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  prioritet int,
  content varchar(255),
  create_date DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
