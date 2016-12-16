create database web default charset='utf8';
create user web@'%' identified by 'web123';
grant all on web.* to web@'%';
use web;
create table member(
	id       serial,
	email    varchar(255),
	password varchar(255),
	name     varchar(255)
);
insert into member(email, password, name)
values('mark@facebook.com', sha2('mark123', 512), 
	'Mark Zuckerberg');
create table topic(
	id       serial,
	title    varchar(1023),
	detail   varchar(8191),
	photo    varchar(255)
);