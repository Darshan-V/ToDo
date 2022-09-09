const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'newdb',
    password: 'password',
    port: 5432,
});

const insertUser = async (id, done, duedate, notes, priority, show, title) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO my_todo (id,done,duedate,notes,priority,show,title)  
             VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id, done, duedate, notes, priority, show, title]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};

insertUser(1, false, '', 'lkdsjjflk', 'none', false, 'hello').then(result => {
    if (result) {
        console.log('User inserted');
    }
});