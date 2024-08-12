CREATE DATABASE bannerdb;

USE bannerdb;

CREATE TABLE banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isVisible BOOLEAN DEFAULT false,
    description TEXT,
    timer INT,
    link VARCHAR(255)
);

INSERT INTO banner (isVisible, description, timer, link)
VALUES(false, 'Default Banner', 60, '');
