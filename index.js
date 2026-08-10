import express from 'express';
import studentRoutes from './students/students.routes.js';

const app = express()
app.use(express.json())

app.use('/students', studentRoutes)

app.listen(3000, () => {
    console.log('SERVER IS RUNNING AT: http://localhost:3000')
})