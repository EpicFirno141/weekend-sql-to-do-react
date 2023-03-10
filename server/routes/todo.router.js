const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todo" ORDER BY "id" ASC`;
    pool.query(queryText).then((result) => {
        let todoList = result.rows;
        res.send(todoList);
    }).catch((error) => {
        console.log(`Error trying to GET ${error}`);
        res.sendStatus(500);
    })
});

// POST
router.post('/', (req, res) => {
    let todo = req.body;
    console.log(todo);
    let queryText = `INSERT INTO "todo" ("task", "description") VALUES ($1, $2)`;
    pool.query(queryText, [todo.task, todo.description]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error trying to POST ${error}`);
        res.sendStatus(500);
    })
});

// PUT
router.put('/:id', (req, res) => {
    let todoId = req.params.id;
    let todo = req.body;
    let queryText = `UPDATE "todo" SET "task" = $1, "description" = $2 WHERE "id" = $3`;
    pool.query(queryText, [todo.task, todo.description, todoId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error trying to PUT ${error}`);
        res.sendStatus(500);
    })
});

router.put('/status/:id', (req, res) => {
    let todoId = req.params.id;
    let queryText = `UPDATE "todo" SET "status" = 'Complete' WHERE "id" = $1`;
    pool.query(queryText, [todoId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error trying to DELETE ${error}`);
        res.sendStatus(500);
    })
});

// DELETE
router.delete('/:id', (req, res) => {
    let todoId = req.params.id;
    let queryText = `DELETE FROM "todo" WHERE "id" = $1`;
    pool.query(queryText, [todoId]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error trying to DELETE ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;
