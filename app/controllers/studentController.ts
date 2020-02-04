//   /app/controllers/studentController.ts
import * as mongoose from 'mongoose'
import { StudentSchema } from '../models/student';
import { Request, Response } from 'express';

const StudentMongooseModel = mongoose.model('Student', StudentSchema);

export class StudentController { 

    public addNewStudent (req: Request, res: Response) {    
        let student = req.body;
        if(!student.StartDate) {
            student.StartDate = new Date();
        }

        if(!student.FirstName || !student.LastName 
            || !student.School) {
                res.status(400);
                res.json(
                        {"error": "Bad data, could not be inserted into the database from index."}
                )
        } else {
            let newStudent = new StudentMongooseModel(student);
            newStudent.save((err, data) => {
            if (err){
                res.send(err);
            }    
               res.redirect("/");
            });
        }
    }

    public getCreatedStudent (req: Request, res: Response) {  
        StudentMongooseModel.find({} , (err, data) => {
            if (err) {
                res.send(err);
            }
            res.render("create", {
                title : "Create A Student",
                jsonData: data
            })

        });
    }

    public getStudents (req: Request, res: Response) {           
        StudentMongooseModel.find({}, (err, data) => {
            if (err){
                res.send(err);
            }
            res.redirect("/");
        });
    }

    public getAllStudents (req: Request, res: Response) {
        StudentMongooseModel.find({}, (err, data) => {
            if (err){
                res.send(err);
            }
            res.render("index", {
                title : "List Of Students",
                jsonData : data
            })
        });
    }
    public getStudentById (req: Request, res: Response) {           
        StudentMongooseModel.findById(req.params.studentId, (err, data) => {
            if (err){
                res.send(err);
            }
            res.redirect("/");
        });
    }

    public updateStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true }, 
            (err, data) => {
            if (err){
                res.send(err);
            }
            res.redirect("/");
        });
    }

    public getUpdatedStudent (req: Request, res: Response) {  
        StudentMongooseModel.findById(req.params.studentId, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.render("edit" , {
                title:"Edit the student",
                jsonData:data
            })
        });
    }
    public deleteStudent (req: Request, res: Response) {           
        StudentMongooseModel.findOneAndRemove({ _id: req.params.studentId }, (err, data) => {
            if (err){
                res.send(err);
            }
            res.redirect("/");
        });
    }

    public getDeletedStudent (req: Request, res: Response) { 
        StudentMongooseModel.findById(req.params.studentId, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.render("delete", {
                title : "Delete the student",
                jsonData : data
            });
        });
    }

    public generateDummyData (req: Request, res: Response) {     
        var data = [
            {
            "FirstName":"Sally",
            "LastName":"Baker",
            "School":"Mining",
            "StartDate": new Date("2012-02-20T08:30:00")
            },{
            "FirstName":"Jason",
            "LastName":"Plumber",
            "School":"Engineering",
            "StartDate": new Date("2018-03-17T17:32:00")
            },{
            "FirstName":"Sue",
            "LastName":"Gardner",
            "School":"Political Science",
            "StartDate": new Date("2014-06-20T08:30:00")
        },{
            "FirstName":"Linda",
            "LastName":"Farmer",
            "School":"Agriculture",
            "StartDate": new Date("2014-06-20T08:30:00")
            },{
            "FirstName":"Fred",
            "LastName":"Fisher",
            "School":"Environmental Sciences",
            "StartDate": new Date("2017-10-16T17:32:00")
            }
        ];
          
        StudentMongooseModel.collection.insert(data, function (err, docs) { 
            if (err){
                res.send(err);
            }
            res.redirect("/");
        });
    
    }
}
