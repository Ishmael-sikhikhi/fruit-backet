create table fruitBacket(      
    id serial not null primary key,
    type text not null,
    qty int not null,
    price decimal(13,2) not null
);
insert into fruitbacket (type,qty,price) values ('Orange', 1, 3.50);
insert into fruitbacket (type,qty,price) values ('Apple', 1, 3.00);
insert into fruitbacket (type,qty,price) values ('Banana', 1, 4.50);
insert into fruitbacket (type,qty,price) values ('Mango', 1, 10.50);
insert into fruitbacket (type,qty,price) values ('Guava', 1, 2.50);
insert into fruitbacket (type,qty,price) values ('Grapes', 1, 15.00);


create table cars (
    id serial not null,
    color text not null,
    mileage float not null,
    primary key(id)
);