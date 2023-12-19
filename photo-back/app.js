"use strict";
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = 3000;

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5174",
            "http://localhost:5173",
            "http://localhost:5500",
        ],
    })
);

app.use(express.json());
