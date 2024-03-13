const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Employee = require('./Employee');

const app = express();
const port = 3000;

// connecting mongo db

mongoose.connect('mongodb+srv://myurl**** hashed/')
.then(()=>console.log('connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:',err));


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// CRUD task

app.post('/employees', async (req, res)=> {
    try{
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee);
    }catch(err){
        res.status(400).send(err);
    }
});
app.get('/employees', async (req, res)=> {
    try{
        const employee = await Employee.find();
        res.send(employee);
    }catch(err){
        res.status(500).send(err);
    }
});

app.put('/employees/:id', async (req, res)=> {
    try{
        const employee = await Employee.findByIdAndUpdate(req.params.id, re.body, {new: true });
        if(!employee){
            return res.status(404).send('Employee not found');
        }
        res.send(employee);
    }catch(err){
        res.status(400).send(err);
    }
});

app.delete('/employees/:id', async (req, res)=> {
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if(!employee){
            return res.status(404).send('Employee not found');
        }
        res.send(employee);
    }catch(err){
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})

