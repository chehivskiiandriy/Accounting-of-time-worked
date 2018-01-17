function checkSickLeave(sickLeaveTest, start, finish) {
    for (let i = 0; i < sickLeaveTest.length; i++) {
        if( !(start > sickLeaveTest[i].finishDisease || finish < sickLeaveTest[i].startDisease) ) {
            return false;
        }
    }
    return true;
}

function checkBusinessTrip(businessTest, start, finish) {
    for (let i = 0; i < businessTest.length; i++) {
        if( !(start > businessTest[i].finishBusinessTrip || finish < businessTest[i].startBusinessTrip) ) {
            return false;
        }
    }
    return true;
}

function checkHoliday(holidaysTest, start, finish) {
    for (let i = 0; i < holidaysTest.length; i++) {  
        if( !(start > holidaysTest[i].finishHoliday || finish < holidaysTest[i].startHoliday) ) {
            return false;
        }
    }
    return true;
}

function checkHooky(hookyTest, start, finish) {
    for (let i = 0; i < hookyTest.length; i++) {    
        if( !(start > hookyTest[i].dayHooky || finish < hookyTest[i].dayHooky) ) {
            return false;
        }
    }
    return true;
}

function filteredWorkingDays(workTest, startYear, startMonth, finishYear, finishMonth) {
    let filter = [];
    filter = workTest.filter((e) => {
        return  (e.year == startYear && e.year == finishYear && e.month >= startMonth && e.month <= finishMonth) ||
                (startYear != finishYear && ((e.year == startYear && e.month >= startMonth) || (e.year == finishYear && e.month <= finishMonth) )) || 
                (e.year > startYear && e.year < finishYear);
    }); 
    console.log(filter);
    return filter;
}

function check(start, finish, sickLeaveTest, businessTest, holidaysTest, hookyTest, workTest) {
    let startTest = start.split('-'),
        finishTest = finish.split('-');
    let startYear = +startTest[0],
        startMonth = +startTest[1],
        startDate = +startTest[2],
        finishYear = +finishTest[0],
        finishMonth = +finishTest[1],
        finishDate = +finishTest[2];
    
    let sumDaysStart = 0,
        sumDaysFinish = 0,
        amountDaysStart = getAmountDaysInMonth(startYear, startMonth),
        amountDaysFinish = getAmountDaysInMonth(finishYear, finishMonth);

    workTest = filteredWorkingDays(workTest, startYear, startMonth, finishYear, finishMonth);
    console.log(workTest);
    
    for (let i = 0; i < sickLeaveTest.length; i++) {

        let sickLeaveStart = sickLeaveTest[i].startDisease.split('-'),
            sickLeaveFinish = sickLeaveTest[i].finishDisease.split('-');
        let sYear = +sickLeaveStart[0],
            sMonth = +sickLeaveStart[1],
            sDate = +sickLeaveStart[2],
            fYear = +sickLeaveFinish[0],
            fMonth = +sickLeaveFinish[1],
            fDate = +sickLeaveFinish[2];

        if(start > sickLeaveTest[i].finishDisease) {
            if(sMonth == startMonth) {
                sumDaysStart+= fDate - sDate + 1;
            } else if (fMonth == startMonth){
                sumDaysStart+= fDate;
            }
        } else {
            if(fMonth == finishMonth) {
                sumDaysFinish+= fDate - sDate + 1;
            } else if(sMonth == finishMonth){
                sumDaysFinish+= amountDaysFinish - sDate + 1;
            }
        } 
    }

    for (let i = 0; i < businessTest.length; i++) {
        
        let businessStart = businessTest[i].startBusinessTrip.split('-'),
            businessFinish = businessTest[i].finishBusinessTrip.split('-');
        let sYear = +businessStart[0],
            sMonth = +businessStart[1],
            sDate = +businessStart[2],
            fYear = +businessFinish[0],
            fMonth = +businessFinish[1],
            fDate = +businessFinish[2];

        if(start > businessTest[i].finishBusinessTrip) {
            if(sMonth == startMonth) {
                sumDaysStart+= fDate - sDate + 1;
            } else if (fMonth == startMonth){
                sumDaysStart+= fDate;
            }
        } else {
            if(fMonth == finishMonth) {
                sumDaysFinish+= fDate - sDate + 1;
            } else if(sMonth == finishMonth){
                sumDaysFinish+= amountDaysFinish - sDate + 1;
            }
        } 
    }

    for (let i = 0; i < holidaysTest.length; i++) {
        
        let holidaysStart = holidaysTest[i].startHoliday.split('-'),
            holidaysFinish = holidaysTest[i].finishHoliday.split('-');
        let sYear = +holidaysStart[0],
            sMonth = +holidaysStart[1],
            sDate = +holidaysStart[2],
            fYear = +holidaysFinish[0],
            fMonth = +holidaysFinish[1],
            fDate = +holidaysFinish[2];

        if(start > holidaysTest[i].finishHoliday) {
            if(sMonth == startMonth) {
                sumDaysStart+= fDate - sDate + 1;
            } else if (fMonth == startMonth){
                sumDaysStart+= fDate;
            }
        } else {
            if(fMonth == finishMonth) {
                sumDaysFinish+= fDate - sDate + 1;
            } else if(sMonth == finishMonth){
                sumDaysFinish+= amountDaysFinish - sDate + 1;
            }
        } 
    }

    for (let i = 0; i < hookyTest.length; i++) {

        let hooky = hookyTest[i].dayHooky.split('-');
        let sYear = +hooky[0],
            sMonth = +hooky[1],
            sDate = +hooky[2];

        if(start > hookyTest[i].dayHooky) {
            if(sMonth == startMonth) {
                sumDaysStart += 1;
            } 
        } else {
            if(sMonth == finishMonth) {
                sumDaysFinish += 1;
            } 
        } 
    }


    console.log("start: " + sumDaysStart);
    console.log("finish: " + sumDaysFinish);

    if (startMonth == finishMonth && startYear == finishYear) {

        if (workTest.length != 0 && startYear == workTest[0].year && startMonth == workTest[0].month) {
            
            let amountWork = workTest[0].actualAmountWorkDay;
            if ( (amountWork + sumDaysStart + sumDaysFinish + (finishDate - startDate + 1) ) > amountDaysFinish ) {
                return false;
            }

        } else {
            if ( (sumDaysStart + sumDaysFinish + (finishDate - startDate + 1) ) > amountDaysFinish ) {
                return false;
            }
        }

    } else {

        let k = 0;

        for (let i = 0; i < workTest.length; i++) {

            if (startYear == workTest[i].year && startMonth == workTest[i].month) {
                
                let amountStartWork = workTest[i].actualAmountWorkDay;
                if ( (amountStartWork + sumDaysStart + (amountDaysStart - startDate + 1) ) > amountDaysStart ) {
                    return false;
                }
                k++;

            } else if (finishYear == workTest[i].year && finishMonth == workTest[i].month) {
                
                let amountFinishWork = workTest[i].actualAmountWorkDay;
                if ( (amountFinishWork + sumDaysFinish + finishDate ) > amountDaysFinish ) {
                    return false;
                }
                k+=2;

            } else {
                if(workTest[i].actualAmountWorkDay != 0) {
                    return false;
                }
            }  
        }

        if (k == 1) {
            if ( (sumDaysFinish + finishDate ) > amountDaysFinish ) {
                return false;
            }
        } else if (k == 2) {
            if ( (sumDaysStart + (amountDaysStart - startDate + 1) ) > amountDaysStart ) {
                return false;
            }
        } else if (k == 0) {
            if ( ((sumDaysStart + (amountDaysStart - startDate + 1) ) > amountDaysStart) || ((sumDaysFinish + finishDate ) > amountDaysFinish) ) {
                return false;
            }
        }
        
    }

    return true;
}

function sumSickLeave(rows, year, month, period) {
    let sum = 0;
    let sickLeave = rows.map(e => {
        e.startDisease = e.startDisease.getFullYear() + "-" + pad(e.startDisease.getMonth() + 1) + "-" + pad(e.startDisease.getDate());
        e.finishDisease = e.finishDisease.getFullYear() + "-" + pad(e.finishDisease.getMonth() + 1) + "-" + pad(e.finishDisease.getDate());
        return e;
    });
    
    if(period === "month") {
        let countDayInMonth = getAmountDaysInMonth(year, month);

        if(month < 10) month = '0' + month;
        
        let s = `${year}-${month}-01`,
            f = `${year}-${month}-${countDayInMonth}`;
        for (let i = 0; i < sickLeave.length; i++) {
             if(sickLeave[i].startDisease >= s && sickLeave[i].finishDisease <= f) {
                let days = new Date(sickLeave[i].startDisease);
                let dayf = new Date(sickLeave[i].finishDisease);
                sum += dayf.getDate() - days.getDate() + 1;
                console.log("@3");
            } else if(sickLeave[i].startDisease <= s && sickLeave[i].finishDisease >= f) {
                sum += countDayInMonth;
                console.log("@4");
            } else if(sickLeave[i].finishDisease >= s && sickLeave[i].finishDisease <= f) {
                let day = new Date(sickLeave[i].finishDisease);
                sum += day.getDate();
                console.log("@1");
            } else if(sickLeave[i].startDisease >= s && sickLeave[i].startDisease <= f) {
                let day = new Date(sickLeave[i].startDisease);
                sum += countDayInMonth - day.getDate() + 1;
                console.log("@2");
            }
        }
    } else if(period === "allTime") {
        for (let i = 0; i < sickLeave.length; i++) {
            let days = new Date(sickLeave[i].startDisease);
            let dayfb = new Date(sickLeave[i].finishDisease);
            sum += Math.ceil((dayfb.getTime()-days.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        } 
    }
    console.log(sum);
    
    return sum;
}

function sumBusiness(rows, year, month, period) {
    let sum = 0;
    let businessTrip = rows.map(e => {
        e.startBusinessTrip = e.startBusinessTrip.getFullYear() + "-" + pad(e.startBusinessTrip.getMonth() + 1) + "-" + pad(e.startBusinessTrip.getDate());
        e.finishBusinessTrip = e.finishBusinessTrip.getFullYear() + "-" + pad(e.finishBusinessTrip.getMonth() + 1) + "-" + pad(e.finishBusinessTrip.getDate());
        return e;
    });

    if(period === "month") {
        let countDayInMonth = getAmountDaysInMonth(year, month);

        if(month < 10) month = '0' + month;
        
        let s = `${year}-${month}-01`,
            f = `${year}-${month}-${countDayInMonth}`;

        for (let i = 0; i < businessTrip.length; i++) {
            if(businessTrip[i].startBusinessTrip >= s && businessTrip[i].finishBusinessTrip <= f) {
                let days = new Date(businessTrip[i].startBusinessTrip);
                let dayf = new Date(businessTrip[i].finishBusinessTrip);
                sum += dayf.getDate() - days.getDate() + 1;
            } else if(businessTrip[i].startBusinessTrip <= s && businessTrip[i].finishBusinessTrip >= f) {
                sum += countDayInMonth;
            } else if(businessTrip[i].finishBusinessTrip >= s && businessTrip[i].finishBusinessTrip <= f) {
                let day = new Date(businessTrip[i].finishBusinessTrip);
                sum += day.getDate();
            } else if(businessTrip[i].startBusinessTrip >= s && businessTrip[i].startBusinessTrip <= f) {
                let day = new Date(businessTrip[i].startBusinessTrip);
                sum += countDayInMonth - day.getDate() + 1;
            }
        }
    } else if(period === "allTime") {
        for (let i = 0; i < businessTrip.length; i++) {
            let days = new Date(businessTrip[i].startBusinessTrip);
            let dayfb = new Date(businessTrip[i].finishBusinessTrip);
            sum += Math.ceil((dayfb.getTime()-days.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        } 
    }
    return sum;
}

function sumHolidays(rows, year, month, period) {
    let sum = 0;
    let holiday = rows.map(e => {
        e.startHoliday = e.startHoliday.getFullYear() + "-" + pad(e.startHoliday.getMonth() + 1) + "-" + pad(e.startHoliday.getDate());
        e.finishHoliday = e.finishHoliday.getFullYear() + "-" + pad(e.finishHoliday.getMonth() + 1) + "-" + pad(e.finishHoliday.getDate());
        return e;
    });
    if(period === "month") {
        let countDayInMonth = getAmountDaysInMonth(year, month);

        if(month < 10) month = '0' + month;
        
        let s = `${year}-${month}-01`,
            f = `${year}-${month}-${countDayInMonth}`;

        for (let i = 0; i < holiday.length; i++) {
            if(holiday[i].startHoliday >= s && holiday[i].finishHoliday <= f) {
                let days = new Date(holiday[i].startHoliday);
                let dayf = new Date(holiday[i].finishHoliday);
                sum += dayf.getDate() - days.getDate() + 1;
            } else if(holiday[i].startHoliday <= s && holiday[i].finishHoliday >= f) {
                sum += countDayInMonth;
            } else if(holiday[i].finishHoliday >= s && holiday[i].finishHoliday <= f) {
                let day = new Date(holiday[i].finishHoliday);
                sum += day.getDate();
            } else if(holiday[i].startHoliday >= s && holiday[i].startHoliday <= f) {
                let day = new Date(holiday[i].startHoliday);
                sum += countDayInMonth - day.getDate() + 1;
            }
        }
    } else if(period === "allTime") {
        for (let i = 0; i < holiday.length; i++) {
            let days = new Date(holiday[i].startHoliday);
            let dayfb = new Date(holiday[i].finishHoliday);
            sum += Math.ceil((dayfb.getTime()-days.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        } 
    }

    return sum;
}

function sumHooky(rows, year, month, period) {
    let sum = 0;
    let hooky = rows.map(e => {
        e.dayHooky = e.dayHooky.getFullYear() + "-" + pad(e.dayHooky.getMonth() + 1) + "-" + pad(e.dayHooky.getDate());
        return e;
    });

    if(period === "month") {
        for (let i = 0; i < hooky.length; i++) {
            day = new Date(hooky[i].dayHooky);
            if(day.getFullYear() === year && (day.getMonth() +1) === month) 
                sum++;
        }
    } else if(period === "allTime") {
        sum += hooky.length;
    }

    return sum;
}

function sumWorkingDays(rows) {
    let sum = 0;
    console.log(rows);
    for(let i = 0; i < rows.length; i++) {
        sum += rows[i].actualAmountWorkDay; 
    } 
    console.log(sum);

    return sum;
}

function getAmountDaysInMonth(Year, Month) {
    switch (Month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8: 
        case 10:
        case 12:
          return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if(Year % 4 == 0)
                return 29; 
            else 
                return 28;
      }
}

function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

function testSumSickLeave(sickLeave, year, month, period) {
    let sum = 0;
    
    if(period === "month") {
        let countDayInMonth = getAmountDaysInMonth(year, month);

        if(month < 10) month = '0' + month;
        
        let s = `${year}-${month}-01`,
            f = `${year}-${month}-${countDayInMonth}`;
        for (let i = 0; i < sickLeave.length; i++) {
             if(sickLeave[i].startDisease >= s && sickLeave[i].finishDisease <= f) {
                let days = new Date(sickLeave[i].startDisease);
                let dayf = new Date(sickLeave[i].finishDisease);
                sum += dayf.getDate() - days.getDate() + 1;
            } else if(sickLeave[i].startDisease <= s && sickLeave[i].finishDisease >= f) {
                sum += countDayInMonth;
            } else if(sickLeave[i].finishDisease >= s && sickLeave[i].finishDisease <= f) {
                let day = new Date(sickLeave[i].finishDisease);
                sum += day.getDate();
            } else if(sickLeave[i].startDisease >= s && sickLeave[i].startDisease <= f) {
                let day = new Date(sickLeave[i].startDisease);
                sum += countDayInMonth - day.getDate() + 1;
            }
        }
    } else if(period === "allTime") {
        for (let i = 0; i < sickLeave.length; i++) {
            let days = new Date(sickLeave[i].startDisease);
            let dayfb = new Date(sickLeave[i].finishDisease);
            sum += Math.ceil((dayfb.getTime()-days.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        } 
    }
    
    return sum;
}

module.exports = {
    checkSickLeave,
    checkBusinessTrip,
    checkHoliday,
    checkHooky,
    check,
    getAmountDaysInMonth,
    sumSickLeave,
    sumBusiness,
    sumHolidays,
    sumHooky,
    sumWorkingDays,
    testSumSickLeave
};