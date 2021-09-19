CREATE TABLE IF NOT EXISTS address (
    addressId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    street VARCHAR(45),
    country VARCHAR(20),
    city VARCHAR(10),
    state VARCHAR(10),
    num INT,
    FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45),
    email VARCHAR(100),
    password VARCHAR(100)
);
