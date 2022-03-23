DROP TABLE IF EXISTS userscomments;
DROP TABLE IF EXISTS InappropriateWords;
DROP TABLE IF EXISTS UsersUsers;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS photoscategories;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS users;

CREATE TABLE Users (
    userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    telephone VARCHAR(32) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    username VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    avatarUrl VARCHAR(512)
);

CREATE TABLE Photos (
    photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(512),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    url VARCHAR(512) NOT NULL,
    visibility VARCHAR(16) NOT NULL, 
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private'))
);

CREATE TABLE Categories (
    categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) UNIQUE
);

CREATE TABLE PhotosCategories (
    photoCategoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    categoryId INT NOT NULL,
    photoId INT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Categories (categoryId),
    FOREIGN KEY (photoId) REFERENCES Photos (photoId),
    unique(categoryId, photoId)
);

CREATE TABLE Ratings (
    ratingId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    value INT NOT NULL,
    userId INT NOT NULL,
    photoId INT NOT NULL,
    CONSTRAINT ValidValue CHECK (value >= 1 and value <= 5),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (photoId) REFERENCES photos(photoId)
);


CREATE TABLE Comments (
    commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text varchar(400) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    photoId INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (photoId) REFERENCES photos(photoId),
    CONSTRAINT ValidText CHECK (LENGTH(TEXT)>0)
);

CREATE TABLE UsersUsers (
    userUserId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userSource INT NOT NULL,
    userTarget INT NOT NULL,
    FOREIGN KEY (userSource) REFERENCES users(userId),
    FOREIGN KEY (userTarget) REFERENCES users(userId),
    CONSTRAINT ValidFollow CHECK (userSource != userTarget)
    -- RN-A08: Auto-Seguimiento
);
CREATE TABLE InappropriateWords(
    InappropriateWordId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    word varchar(20) NOT NULL
);

CREATE TABLE userscomments (
    userCommentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    commentId INT NOT NULL,
    VALUE INT,
    FOREIGN KEY (userId) REFERENCES users (userId),
    UNIQUE KEY (userId, commentId),
    FOREIGN KEY (commentId) REFERENCES comments (commentId),
    CONSTRAINT ValidValue CHECK (VALUE = 1 OR VALUE = -1)
);