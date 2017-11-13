var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'AccountingOfTimeWorked',
    timezone: 'utc'
});

connection.connect(function() {
    console.log("Database connected");
});


module.exports.getSubdivision = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Subdivision ORDER BY id ASC`, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addSubdivision = function(data, callback) {
    connection.query("INSERT INTO Subdivision SET ?", data, callback);
}

module.exports.deleteSubdivision = function(idDisc, callback) {
    connection.query(`DELETE FROM Subdivision WHERE id = ${idDisc}`, callback);
}

module.exports.editSubdivision = function(data, callback) {
    connection.query(`UPDATE Subdivision SET name = '${data.name}' WHERE id = ${data.id}`, callback);
}

module.exports.findBySubdivision = function(name, callback) {
    connection.query(`SELECT * FROM Subdivision WHERE name = '${name}'`, callback);
}

module.exports.getEmployees = () => {
    let query = `select Employee.*, Subdivision.name as 'subdivision'
                    from subdivision 
                    inner join Employee where Subdivision.id = Employee.subdivisionID
                    ORDER BY Employee.id ASC;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addEmployee = function(data, callback) {
    connection.query("INSERT INTO Employee SET ?", data, callback);
}

module.exports.deleteEmployee = function(idEmplo, callback) {
    connection.query(`DELETE FROM Employee WHERE id = ${idEmplo}`, callback);
}

module.exports.editEmployee = function(data, callback) {
    connection.query(`UPDATE Employee SET surname = '${data.surname}', name = '${data.name}', patronymic = '${data.patronymic}', age = '${data.age}', subdivisionID = '${data.subdivisionID}'  WHERE id = ${data.id}`, callback);
}

module.exports.getSickLeaves = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, Employee.age, SickLeave.*
                    from ((Employee 
                        join SickLeave on SickLeave.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by SickLeave.startDisease asc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}