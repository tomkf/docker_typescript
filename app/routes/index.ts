import {Request, Response} from 'express';
import { StudentController } from '../controllers/studentController';

export class Routes{
    studentController :StudentController = new StudentController();

    public routes(app:any):void {
        app.route('/')
            .get(this.studentController.getAllStudents)
        
        app.route('/api/students/create')
            .get(this.studentController.getCreatedStudent)
       
        app.route('/update/:studentId')
            .get(this.studentController.getUpdatedStudent)

        app.route('/delete/:studentId')
            .get(this.studentController.getDeletedStudent)

        app.route('/update/:studentId')
            .post(this.studentController.updateStudent);

        app.route('/delete/:studentId')
            .post(this.studentController.deleteStudent);

        // Get all students
        app.route('/api/students')
            .get(this.studentController.getStudents);

        // Create a new student
        app.route('/api/students')
            .post(this.studentController.addNewStudent);

        // get a specific student
        app.route('/api/students/:studentId')
            .get(this.studentController.getStudentById);

        // update a specific student
        app.route('/api/students/:studentId')
            .put(this.studentController.updateStudent);
        
        // delete a specific student
        app.route('/api/students/:studentId')
            .delete(this.studentController.deleteStudent);
        
        // generate dummy data
        app.route('/api/dummy')
            .get(this.studentController.generateDummyData);

    }
}