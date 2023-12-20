"use strict";

require("dotenv").config();
const { createPool } = require("./mysql-connection");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const dbInit = async () => {
    const pool = createPool();
    console.log("Deleting previous data...");
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    console.log("Database sucessfuly deleted");
    console.log("Creating new Data Base");
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    console.log("Database created successfuly");
    console.log(`USE ${DATABASE_NAME}`);
    console.log("Generating content...");
    await createTables(pool);
    console.log("All done");
    await pool.end();
};

async function createTables(pool) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id CHAR(36) PRIMARY KEY,
            email VARCHAR(120) NOT NULL UNIQUE,
            nickName VARCHAR(50) NOT NULL UNIQUE,
            userName VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(50),
            lastName VARCHAR (100),
            birthday TIMESTAMP,
            country VARCHAR(150),
            city VARCHAR(150),
            avatarURL VARCHAR(255),
            weddingCode VARCHAR(20),
            acceptedTOS BOOLEAN NOT NULL,
            role ENUM('Bride', 'Groom', 'Photographer'),
            typeUser ENUM('Admin', 'Moderator', 'User') DEFAULT 'User',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS weddingDate(
            id CHAR(36) PRIMARY KEY,
            weddingName VARCHAR(255) NOT NULL,
            idUser CHAR(36),
            weddingDay TIMESTAMP NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES users(id)
        );
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS photos(
            id CHAR(36) PRIMARY KEY,
            idWedding CHAR(36),
            idUser CHAR(36),
            imageURL VARCHAR(255) NOT NULL,
            FOREIGN KEY (idWedding) REFERENCES weddingDate(id),
            FOREIGN KEY (idUser) REFERENCES users(id)
        );
    `);
}
