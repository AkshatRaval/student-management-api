import { Router } from "express";
import { addStudent, getStudents, getStudentWithId, deleteStudent, updateStudent} from "./students.controllers.js";

const studentRoutes = Router()

studentRoutes.get('/', getStudents)
studentRoutes.post('/', addStudent)
studentRoutes.put('/:id', updateStudent)
studentRoutes.get('/:id', getStudentWithId)
studentRoutes.delete('/:id', deleteStudent)

export default studentRoutes