create table users(
    id int primary key AUTO_INCREMENT,
    nombre varchar(250),
    telefono varchar(20),
    email varchar(50),
    password varchar(250),
    UNIQUE (email)
)
insert into users (nombre,telefono, email, password) values('Joffre Rodriguez','0987310681','jofrerodriguez1@gmail.com','123456')