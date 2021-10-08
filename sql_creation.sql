drop database web_push;

create database web_push;

use web_push;

create table user(
  user_id int AUTO_INCREMENT,
  user_name varchar(50) not null,
  created_at varchar(50) not null,
  deleted_at varchar(50) not null,
  primary key(user_id)
);

insert into user(  
  user_name,
  created_at,
  deleted_at
) values
('Ted256', '', ''),
('Maria956', '', ''),
('Sarah123', '', '')
;


create table notification(
  notification_id int AUTO_INCREMENT,
  notification_user_id int not null,
  notification_new_follower_id int,
  notification_title varchar(50) not null,
  notification_content varchar(50) not null,
  notification_type enum('new_follower', 'new_message', 'new_movies'),
  created_at varchar(50) not null,
  deleted_at varchar(50) not null,
  primary key(notification_id),
  foreign key(notification_user_id) references user(user_id),
  foreign key(notification_new_follower_id) references user(user_id)
);

insert into notification(
  notification_user_id,
  notification_new_follower_id,
  notification_title,
  notification_content,
  notification_type ,
  created_at,
  deleted_at
) values
  (1, 2, 'new_follower', 'hi, Ted256 is following you', 'new_follower', '', ''),
  (2, 3, 'new_follower', 'hi, Ted256 is following you', 'new_follower', '', ''),
  (3, 2, 'new_follower', 'hi, Ted256 is following you', 'new_follower', '', ''),
  (3, null, 'new_movie', 'hi, movie123 is recommended for you', 'new_movies', '', '')
;

