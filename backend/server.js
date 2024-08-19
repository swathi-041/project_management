const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://projectmaanagement.netlify.app/'
}));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "swathi",
    port: "3306",
    database: "crud",
    connectionLimit: 10 // Adjust the pool size as needed
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM PROJECT";
    pool.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.get("/project/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM PROJECT WHERE id = ?";
    
    pool.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Project not found" });
        }
        return res.json(data[0]);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO PROJECT (ProjectName, ProjectDescription, Professor, Contact) VALUES (?)";
    const values = [
        req.body.projectname,
        req.body.projectdescription,
        req.body.professor,
        req.body.contact
    ];
    pool.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE PROJECT SET ProjectName = ?, ProjectDescription = ?, Professor = ?, Contact = ? WHERE id = ?";
    const values = [
        req.body.projectname,
        req.body.projectdescription,
        req.body.professor,
        req.body.contact
    ];
    const id = req.params.id;
    pool.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.delete('/project/:id', (req, res) => {
    const sql = "DELETE FROM PROJECT WHERE id = ?";
    const id = req.params.id;
    pool.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(3080, () => {
    console.log("Listening on port 3080");
});
