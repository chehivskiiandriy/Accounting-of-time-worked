var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Import Admin Module Containing Functions Related To Admin Data
var admin = require('../models/admin');
let checkAddData = require('./../controllers/check-data');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/get_subdiv', async(req, res) => {
    let subdiv = await admin.getSubdivision();
    console.log(subdiv);
    res.json(subdiv);
});

app.post('/create_subdiv', (req, res) => {
    var data = req.body;
    admin.findBySubdivision(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.addSubdivision(data, function(err, info) {
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
    admin.deleteSubdivision(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_subdiv', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.findBySubdivision(data.name, function(err, rows, fields) {
        if (rows.length == 1) {
            admin.sendResponse(false, res);
        } else {
            admin.editSubdivision(data, function(err, info) {
                if (err) throw err;
                console.log(info);
                admin.sendResponse(true, res);
            });
        };
    });
});

app.get('/get_employees', async(req, res) => {
    let employees = await admin.getEmployees();
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

    admin.addEmployee(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        res.json({id: info.insertId, 'success': 'true' });
     });
});


app.delete('/delete_employees', (req, res, next) => {
    var data = req.body;
    console.log(data);
    admin.deleteEmployee(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_employees', (req, res) => {
    var data = req.body;
    console.log(data);
    admin.editEmployee(data, function(err, info) {
        if (err) throw err;
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.get('/get_sickLeaves', async(req, res) => {
    let sickLeaves = await admin.getSickLeaves();
    sickLeaves = sickLeaves.map(e => {
        e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
        e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
        return e;
    });
    console.log(sickLeaves);
    res.json(sickLeaves);
});

app.post('/create_sickLeaves', (req, res) => {
    let data = req.body;
    console.log(data);
    let start = data.startDisease,
        finish = data.finishDisease,
        sickLeave, business, holidays, hooky;

    admin.findBySickLeave(data.employeeID, function(err, rows, fields) {
        if(err) {
            throw err;
        } else {
            sickLeave = rows.map(e => {
                e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
                e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
                return e;
            });
            if (checkAddData.checkSickLeave(sickLeave, start, finish) == false) {
                admin.sendResponse(false, res);
            } else {
                admin.findByBusinessTrip(data.employeeID, function(err, rows, fields) {
                    if(err) {
                        throw err;
                    } else {
                        business = rows.map(e => {
                            e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
                            e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
                            return e;
                        });
                        if (checkAddData.checkBusinessTrip(business, start, finish) == false) {
                            admin.sendResponse(false, res);
                        } else {
                            admin.findByHoliday(data.employeeID, function(err, rows, fields) {
                                if(err) {
                                    throw err;
                                } else {
                                    holidays = rows.map(e => {
                                        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
                                        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
                                        return e;
                                    });
                                    if (checkAddData.checkHoliday(holidays, start, finish) == false) {
                                        admin.sendResponse(false, res);
                                    } else {
                                        admin.findByHooky(data.employeeID, function(err, rows, fields) {
                                            if(err) {
                                                throw err;
                                            } else {
                                                hooky = rows.map(e => {
                                                    e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
                                                    return e;
                                                });
                                                if (checkAddData.checkHooky(hooky, start, finish) == false) {
                                                    admin.sendResponse(false, res);
                                                } else {
                                                    admin.findByWorkDays(data.employeeID, function(err, rows, fields) {
                                                        if (checkAddData.check(start, finish, sickLeave, business, holidays, hooky, rows) == false) {
                                                            admin.sendResponse(false, res);
                                                        } else {
                                                            admin.addSickLeave(data, function(err, info) {
                                                                if (err) throw err;
                                                                console.log(info);
                                                                res.json({id: info.insertId, 'success': 'true' });
                                                             });
                                                        };
                                                    });
                                                };
                                            }
                                        });
                                    };
                                }
                            });
                        };
                    }
                });
            };
        }
        
    });
});


app.delete('/delete_sickLeaves', (req, res, next) => {
    var data = req.body;
    console.log(data);
    admin.deleteSickLeave(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_sickLeave', (req, res) => {
    let data = req.body;
    console.log(data);
    let start = data.startDisease,
        finish = data.finishDisease,
        sickLeave, business, holidays, hooky;

    admin.findBySickLeave(data.employeeID, function(err, rows, fields) {
        if(err) {
            throw err;
        } else {
            sickLeave = rows.map(e => {
                e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
                e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
                return e;
            }).filter((i) => i.id !== data.id);
            if (checkAddData.checkSickLeave(sickLeave, start, finish) == false) {
                admin.sendResponse(false, res);
            } else {
                admin.findByBusinessTrip(data.employeeID, function(err, rows, fields) {
                    if(err) {
                        throw err;
                    } else {
                        business = rows.map(e => {
                            e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
                            e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
                            return e;
                        });
                        if (checkAddData.checkBusinessTrip(business, start, finish) == false) {
                            admin.sendResponse(false, res);
                        } else {
                            admin.findByHoliday(data.employeeID, function(err, rows, fields) {
                                if(err) {
                                    throw err;
                                } else {
                                    holidays = rows.map(e => {
                                        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
                                        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
                                        return e;
                                    });
                                    if (checkAddData.checkHoliday(holidays, start, finish) == false) {
                                        admin.sendResponse(false, res);
                                    } else {
                                        admin.findByHooky(data.employeeID, function(err, rows, fields) {
                                            if(err) {
                                                throw err;
                                            } else {
                                                hooky = rows.map(e => {
                                                    e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
                                                    return e;
                                                });
                                                if (checkAddData.checkHooky(hooky, start, finish) == false) {
                                                    admin.sendResponse(false, res);
                                                } else {
                                                    admin.findByWorkDays(data.employeeID, function(err, rows, fields) {
                                                        if (checkAddData.check(start, finish, sickLeave, business, holidays, hooky, rows) == false) {
                                                            admin.sendResponse(false, res);
                                                        } else {
                                                            admin.editSickLeave(data, function(err, info) {
                                                                if (err) throw err;
                                                                console.log(info);
                                                                admin.sendResponse(true, res);
                                                            });
                                                        };
                                                    });
                                                };
                                            }
                                        });
                                    };
                                }
                            });
                        };
                    }
                });
            };
        }
        
    });
});

/* 
    
get all services 

*/

app.get('/get_holidays', async(req, res) => {
    let holidays = await admin.getHolidays();
    holidays = holidays.map(e => {
        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
        return e;
    });
    console.log(holidays);
    res.json(holidays);
});

app.post('/create_holiday', (req, res) => {
    let data = req.body;
    console.log(data);
    let start = data.startHoliday,
        finish = data.finishHoliday,
        sickLeave, business, holidays, hooky;

    admin.findBySickLeave(data.employeeID, function(err, rows, fields) {
        if(err) {
            throw err;
        } else {
            sickLeave = rows.map(e => {
                e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
                e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
                return e;
            });
            if (checkAddData.checkSickLeave(sickLeave, start, finish) == false) {
                admin.sendResponse(false, res);
            } else {
                admin.findByBusinessTrip(data.employeeID, function(err, rows, fields) {
                    if(err) {
                        throw err;
                    } else {
                        business = rows.map(e => {
                            e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
                            e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
                            return e;
                        });
                        if (checkAddData.checkBusinessTrip(business, start, finish) == false) {
                            admin.sendResponse(false, res);
                        } else {
                            admin.findByHoliday(data.employeeID, function(err, rows, fields) {
                                if(err) {
                                    throw err;
                                } else {
                                    holidays = rows.map(e => {
                                        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
                                        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
                                        return e;
                                    });
                                    if (checkAddData.checkHoliday(holidays, start, finish) == false) {
                                        admin.sendResponse(false, res);
                                    } else {
                                        admin.findByHooky(data.employeeID, function(err, rows, fields) {
                                            if(err) {
                                                throw err;
                                            } else {
                                                hooky = rows.map(e => {
                                                    e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
                                                    return e;
                                                });
                                                if (checkAddData.checkHooky(hooky, start, finish) == false) {
                                                    admin.sendResponse(false, res);
                                                } else {
                                                    admin.findByWorkDays(data.employeeID, function(err, rows, fields) {
                                                        if (checkAddData.check(start, finish, sickLeave, business, holidays, hooky, rows) == false) {
                                                            admin.sendResponse(false, res);
                                                        } else {
                                                            admin.addHoliday(data, function(err, info) {
                                                                if (err) throw err;
                                                                console.log(info);
                                                                res.json({id: info.insertId, 'success': 'true' });
                                                             });
                                                        };
                                                    });
                                                };
                                            }
                                        });
                                    };
                                }
                            });
                        };
                    }
                });
            };
        }
        
    });
});


app.delete('/delete_holiday', (req, res, next) => {
    var data = req.body;
    console.log(data);
    admin.deleteHoliday(data.id, function(err, info) {
        if (err) {
            console.log(err);
            next(err);
            return res.send({ 'success': 'false' });
        }
        console.log(info);
        admin.sendResponse(true, res);
    });
});

app.put('/edit_holiday', (req, res) => {
    let data = req.body;
    console.log(data);
    let start = data.startHoliday,
        finish = data.finishHoliday,
        sickLeave, business, holidays, hooky;

    admin.findBySickLeave(data.employeeID, function(err, rows, fields) {
        if(err) {
            throw err;
        } else {
            sickLeave = rows.map(e => {
                e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
                e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
                return e;
            });
            if (checkAddData.checkSickLeave(sickLeave, start, finish) == false) {
                admin.sendResponse(false, res);
            } else {
                admin.findByBusinessTrip(data.employeeID, function(err, rows, fields) {
                    if(err) {
                        throw err;
                    } else {
                        business = rows.map(e => {
                            e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
                            e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
                            return e;
                        });
                        if (checkAddData.checkBusinessTrip(business, start, finish) == false) {
                            admin.sendResponse(false, res);
                        } else {
                            admin.findByHoliday(data.employeeID, function(err, rows, fields) {
                                if(err) {
                                    throw err;
                                } else {
                                    holidays = rows.map(e => {
                                        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
                                        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
                                        return e;
                                    }).filter((i) => i.id !== data.id);
                                    if (checkAddData.checkHoliday(holidays, start, finish) == false) {
                                        admin.sendResponse(false, res);
                                    } else {
                                        admin.findByHooky(data.employeeID, function(err, rows, fields) {
                                            if(err) {
                                                throw err;
                                            } else {
                                                hooky = rows.map(e => {
                                                    e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
                                                    return e;
                                                });
                                                if (checkAddData.checkHooky(hooky, start, finish) == false) {
                                                    admin.sendResponse(false, res);
                                                } else {
                                                    admin.findByWorkDays(data.employeeID, function(err, rows, fields) {
                                                        if (checkAddData.check(start, finish, sickLeave, business, holidays, hooky, rows) == false) {
                                                            admin.sendResponse(false, res);
                                                        } else {
                                                            admin.editHoliday(data, function(err, info) {
                                                                if (err) throw err;
                                                                console.log(info);
                                                                admin.sendResponse(true, res);
                                                            });
                                                        };
                                                    });
                                                };
                                            }
                                        });
                                    };
                                }
                            });
                        };
                    }
                });
            };
        }
        
    });
});



app.get('/get_businessTrips', async(req, res) => {
    let businessTrips = await admin.getBusinessTrips();
    businessTrips = businessTrips.map(e => {
        e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
        e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
        return e;
    });
    console.log(businessTrips);
    res.json(businessTrips);
});

app.get('/get_hooky', async(req, res) => {
    let hooky = await admin.getHooky();
    hooky = hooky.map(e => {
        e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
        return e;
    });
    console.log(hooky);
    res.json(hooky);
});

app.get('/get_workingDays', async(req, res) => {
    let workingDays = await admin.getWorkingDays();
    console.log(workingDays);
    res.json(workingDays);
});

function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

module.exports = app;