const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.PG_ADMIN_USER,
    host: process.env.PG_HOST,
    database: 'postgres',
    password: process.env.PG_ADMIN_PASSWORD,
    port: process.env.PG_PORT,
});

client.connect()
        .then(()=> console.log('Connected to PostgreSQL'))
        .then(()=> client.query(`CREATE DATABASE ${process.env.PG_DB_NAME}`))
        .then(()=> console.log('Database created'))
        .catch(err => console.error(err.stack))
        .finally(()=>client.end())