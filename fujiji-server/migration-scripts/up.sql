CREATE DATABASE fujiji;
GO

USE fujiji;
GO

DROP TABLE IF EXISTS fujiji_user;

CREATE TABLE fujiji_user
(
    user_id bigint NOT NULL IDENTITY(1,1),
    name varchar(100) NOT NULL,
    email_address varchar(100) NOT NULL,
    phone_number varchar(30),
    password varchar(100) NOT NULL,
    CONSTRAINT PK_fujiji_user PRIMARY KEY NONCLUSTERED (user_id)
);

INSERT INTO fujiji_user
    (name, email_address, phone_number, password)
VALUES
    ('Fujiji Admin', 'fujiji_admin@gmail.com', '1234568888', 'super_secret_password');
GO

DROP TABLE IF EXISTS 
fujiji_listing;

CREATE TABLE fujiji_listing
(
    user_id bigint NOT NULL,
    listing_id bigint NOT NULL IDENTITY(1,1),
    title varchar(100) NOT NULL,
    condition varchar(30) NOT NULL,
    category varchar(30) NOT NULL,
    city varchar(30) NOT NULL,
    province_code varchar(2) NOT NULL,
    image_url varchar(255) NOT NULL,
    price float NOT NULL,
    description text,
    creation_date DATETIME NOT NULL,
    CONSTRAINT PK_fujiji_listing PRIMARY KEY NONCLUSTERED (listing_id),
    CONSTRAINT FK_fujiji_listing_user FOREIGN KEY (user_id) REFERENCES fujiji_user(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO fujiji_listing
    (user_id, title, condition, category, city, province_code, image_url, price, description, creation_date)
VALUES
    (1, 'Dummy Title', 'used', 'Other', 'Winnipeg', 'MB', 'https://source.unsplash.com/gySMaocSdqs/', 80.90, 'Some description here', GETUTCDATE());
GO

DROP TABLE IF EXISTS 
fujiji_comments;

CREATE TABLE fujiji_comments
(
    user_id bigint NOT NULL,
    listing_id bigint NOT NULL,
    comment_id bigint NOT NULL IDENTITY(1,1),
    comment text NOT NULL,
    isHighlighted int NOT NULL,
    isAuthor int NOT NULL,
    creation_date DATETIME NOT NULL,
    modified_date DATETIME,
    CONSTRAINT PK_fujiji_comments PRIMARY KEY NONCLUSTERED (comment_id),
    CONSTRAINT FK_fujiji_comments_user FOREIGN KEY (user_id) REFERENCES fujiji_user(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FK_fujiji_comments_listing FOREIGN KEY (listing_id) REFERENCES fujiji_listing(listing_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO fujiji_comments
    (user_id, listing_id, comment, isHighlighted, isAuthor, creation_date)
VALUES
    (1, 1, 'This furniture is limited', 0, 1, GETUTCDATE());
GO
