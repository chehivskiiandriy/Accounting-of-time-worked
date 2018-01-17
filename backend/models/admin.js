var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'AccountingOfTimeWorked'
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

module.exports.getEmployeesInSubdivision = function(id) {
    let query = `select Employee.*, Subdivision.name as 'subdivision'
                    from subdivision 
                    inner join Employee where Subdivision.id = Employee.subdivisionID and Subdivision.id = '${id}'
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
    connection.query(`UPDATE Employee SET surname = '${data.surname}', name = '${data.name}', patronymic = '${data.patronymic}', birthday = '${data.birthday}', subdivisionID = '${data.subdivisionID}'  WHERE id = ${data.id}`, callback);
}

module.exports.getSickLeaves = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, SickLeave.*
                    from ((Employee 
                        join SickLeave on SickLeave.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by SickLeave.finishDisease desc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findBySickLeave = function(employeeID, callback) {
    connection.query(`SELECT * FROM SickLeave WHERE employeeID = '${employeeID}'`, callback);
}

module.exports.findBySickLeaveWithPromise = function(employeeID) {
    let query = `SELECT * FROM SickLeave WHERE employeeID = '${employeeID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addSickLeave = function(data, callback) {
    connection.query("INSERT INTO SickLeave SET ?", data, callback);
}

module.exports.deleteSickLeave = function(idSickLeave, callback) {
    connection.query(`DELETE FROM SickLeave WHERE id = ${idSickLeave}`, callback);
}

module.exports.editSickLeave = function(data, callback) {
    connection.query(`UPDATE SickLeave SET startDisease = '${data.startDisease}', finishDisease = '${data.finishDisease}', disease = '${data.disease}' WHERE id = ${data.id}`, callback);
}

module.exports.getHolidays = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, Holiday.*
                    from ((Employee 
                        join Holiday on Holiday.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by Holiday.finishHoliday desc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findByHoliday = function(employeeID, callback) {
    connection.query(`SELECT * FROM Holiday WHERE employeeID = '${employeeID}'`, callback);
}

module.exports.findByHolidayWithPromise = function(employeeID) {
    let query = `SELECT * FROM Holiday WHERE employeeID = '${employeeID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addHoliday = function(data, callback) {
    connection.query("INSERT INTO Holiday SET ?", data, callback);
}

module.exports.deleteHoliday = function(idHoliday, callback) {
    connection.query(`DELETE FROM Holiday WHERE id = ${idHoliday}`, callback);
}

module.exports.editHoliday = function(data, callback) {
    connection.query(`UPDATE Holiday SET startHoliday = '${data.startHoliday}', finishHoliday = '${data.finishHoliday}' WHERE id = ${data.id}`, callback);
}

module.exports.getBusinessTrips = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, BusinessTrip.*
                    from ((Employee 
                        join BusinessTrip on BusinessTrip.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by BusinessTrip.finishBusinessTrip desc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findByBusinessTrip = function(employeeID, callback) {
    connection.query(`SELECT * FROM BusinessTrip WHERE employeeID = '${employeeID}'`, callback);
}

module.exports.findByBusinessTripWithPromise = function(employeeID) {
    let query = `SELECT * FROM BusinessTrip WHERE employeeID = '${employeeID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addBusinessTrip = function(data, callback) {
    connection.query("INSERT INTO BusinessTrip  SET ?", data, callback);
}

module.exports.deleteBusinessTrip = function(idBusinessTrip , callback) {
    connection.query(`DELETE FROM BusinessTrip  WHERE id = ${idBusinessTrip }`, callback);
}

module.exports.editBusinessTrip = function(data, callback) {
    connection.query(`UPDATE BusinessTrip  SET startBusinessTrip = '${data.startBusinessTrip}', finishBusinessTrip = '${data.finishBusinessTrip}' WHERE id = ${data.id}`, callback);
}

module.exports.getHooky = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, Hooky.*
                    from ((Employee 
                        join Hooky on Hooky.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by Hooky.dayHooky desc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findByHooky = function(employeeID, callback) {
    connection.query(`SELECT * FROM Hooky WHERE employeeID = '${employeeID}'`, callback);
}

module.exports.findByHookyWithPromise = function(employeeID) {
    let query = `SELECT * FROM Hooky WHERE employeeID = '${employeeID}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addHooky = function(data, callback) {
    connection.query("INSERT INTO Hooky  SET ?", data, callback);
}

module.exports.deleteHooky = function(idHooky , callback) {
    connection.query(`DELETE FROM Hooky  WHERE id = ${idHooky }`, callback);
}

module.exports.editHooky = function(data, callback) {
    connection.query(`UPDATE Hooky  SET dayHooky = '${data.dayHooky}' WHERE id = ${data.id}`, callback);
}

module.exports.getWorkingDays = () => {
    let query = `select Subdivision.name as subdivision, CONCAT(Employee.surname, ' ', Employee.name, ' ', Employee.patronymic) as fullName, WorkDays.*
                    from ((Employee 
                        join WorkDays on WorkDays.employeeID = Employee.id) 
                        join Subdivision on Subdivision.id = Employee.subdivisionID) 
                    order by WorkDays.year desc, WorkDays.month desc;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findByWorkingDays = function(employeeID, callback) {
    connection.query(`SELECT * FROM WorkDays WHERE employeeID = ${employeeID}`, callback);
}

module.exports.findByWorkingDaysWithPromise = function(employeeID) {
    let query = `SELECT * FROM WorkDays WHERE employeeID = ${employeeID}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.findByWorkingDaysYearMonthId = function(data, callback) {
    connection.query(`SELECT * FROM WorkDays WHERE year = ${data.year} and month = ${data.month} and employeeID = ${data.employeeID}`, callback);
}

module.exports.findByWorkingDaysYearMonthIdWithPromise = function(year, month, employeeID) {
    let query = `SELECT * FROM WorkDays WHERE year = ${year} and month = ${month} and employeeID = ${employeeID}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports.addWorkingDays = function(data, callback) {
    connection.query("INSERT INTO WorkDays SET ?", data, callback);
}

module.exports.deleteWorkingDays = function(data, callback) {
    connection.query(`DELETE FROM WorkDays WHERE year = ${data.year} and month = ${data.month} and employeeID = ${data.employeeID}`, callback);
}

module.exports.editWorkingDays = function(data, callback) {
    connection.query(`UPDATE WorkDays SET actualAmountWorkDay = ${data.actualAmountWorkDay} WHERE year = ${data.year} and month = ${data.month} and employeeID = ${data.employeeID}`, callback);
}

module.exports.sendResponse = function(success, res) {
    if (success) {
        res.send({ 'success': 'true' });
    } else {
        res.send({ 'success': 'false' });
    }
}