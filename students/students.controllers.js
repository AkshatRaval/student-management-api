import { db } from '../config/db.js'
export const getStudents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM students');
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const addStudent = async (req, res) => {
    const { name, email, phone, department, year } = req.body;
    try {
        const result = await db.query("INSERT INTO students (name, email, phone, department, year) VALUES ($1, $2, $3, $4, $5)", [name, email, phone, department, year])
        res.status(201).json({ success: true, data: result.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ success: false, message: "No data provided to update" });
    }
    const keys = Object.keys(updates)
    const values = Object.values(updates)

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ")
    values.push(parseInt(id))
    try {
        const result = await db.query(`UPDATE students SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`, values)
        res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const getStudentWithId = async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.query("SELECT * FROM students WHERE id = $1", [id])
        res.status(200).json({ success: true, data: result.rows[0] })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.query("DELETE FROM students WHERE id = $1", [id])
        res.status(200).json({ success: true, message: "Deleted Successfully" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}