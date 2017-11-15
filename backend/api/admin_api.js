var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Import User Module Containing Functions Related To User Data
var user = require('../models/admin');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/get_subdiv', async(req, res) => {
    let subdiv = await user.getSubdivision();
    console.log(subdiv);
    res.json(subdiv);
});

app.post('/create_subdiv', (req, res) => {
    var data = req.body;
    user.findBySubdivision(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            user.sendResponse(false, res);
        } else {
            user.addSubdivision(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                res.json({id: info.insertId, 'success': 'true' });
            });
        };
    });
});

app.delete('/delete_subdiv', (req, res, next) => {
    var data = req.body;
    console.log(data);
    user.deleteSubdivision(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        user.sendResponse(true, res);
    });
});

app.put('/edit_subdiv', (req, res) => {
    var data = req.body;
    console.log(data);
    user.findBySubdivision(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            user.sendResponse(false, res);
        } else {
            user.editSubdivision(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                user.sendResponse(true, res);
            });
        };
    });
});

app.get('/get_employees', async(req, res) => {
    let employees = await user.getEmployees();
    employees = employees.map(e => {
        e.birthday = e.birthday.getFullYear() + "-" + pad(e.birthday.getMonth() + 1) + "-" + pad(e.birthday.getDate());
        return e;
    });
    console.log(employees);
    res.json(employees);
});

app.post('/create_employees', (req, res) => {
    var data = req.body;
    console.log(data);

    user.addEmployee(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        res.json({id: info.insertId, 'success': 'true' });
     });
});


app.delete('/delete_employees', (req, res, next) => {
    var data = req.body;
    console.log(data);
    user.deleteEmployee(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        user.sendResponse(true, res);
    });
});

app.put('/edit_employees', (req, res) => {
    var data = req.body;
    console.log(data);
    user.editEmployee(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        user.sendResponse(true, res);
    });
});

app.get('/get_sickLeaves', async(req, res) => {
    let sickLeaves = await user.getSickLeaves();
    sickLeaves = sickLeaves.map(e => {
        e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
        e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
        return e;
    });
    console.log(sickLeaves);
    res.json(sickLeaves);
});

app.post('/create_sickLeaves', (req, res) => {
    var data = req.body;
    console.log(data);

    user.addSickLeave(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        res.json({id: info.insertId, 'success': 'true' });
     });
});

function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

module.exports = app;