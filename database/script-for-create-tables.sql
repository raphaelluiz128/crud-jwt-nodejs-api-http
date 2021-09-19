CREATE TABLE IF NOT EXISTS address (
    addressId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    street VARCHAR(45),
    country VARCHAR(25),
    city VARCHAR(30),
    state VARCHAR(20),
    num INT,
    FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
    email VARCHAR(100),
    password VARCHAR(100)
);
