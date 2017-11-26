import { Injectable } from '@angular/core';

import { SickLeaveService } from './sick-leave.service';
import { WorkingDaysService } from './working-days.service';
import { HolidaysService } from './holidays.service';
import { BusinessTripService } from './business-trip.service';
import { HookyService } from './hooky.service';

@Injectable()
export class EditCheckDataService {

    startDate: string;
    finishDate: string;

    constructor(
        private sickLeaveService: SickLeaveService,
        private workingDaysService: WorkingDaysService,
        private holidaysService: HolidaysService,
        private businessTripService: BusinessTripService,
        private hookyService: HookyService
    ) { }
    
    pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
      }
      
    check(employeeID, start, finish, id, type) {
        let startYear = start._d.getFullYear(),
        startMonth = start._d.getMonth() + 1,
        startDate = start._d.getDate(),
        finishYear = finish._d.getFullYear(),
        finishMonth = finish._d.getMonth() + 1,
        finishDate = finish._d.getDate();
    
        let sumDaysStart = 0,
            sumDaysFinish = 0,
            amountDays = this.getAmountDaysInMonth(finishYear, finishMonth);

        start = startYear + "-" + this.pad(startMonth) + "-" + this.pad(startDate);
        finish = finishYear + "-" + this.pad(finishMonth) + "-" + this.pad(finishDate);

        this.startDate = start;
        this.finishDate = finish;
        
        let sickLeaveTest = this.sickLeaveService.getFilteredbyEmployee(employeeID);
        console.log(sickLeaveTest);

        let businessTest = this.businessTripService.getFilteredbyEmployee(employeeID);
        console.log(businessTest);

        let holidaysTest = this.holidaysService.getFilteredbyEmployee(employeeID);
        console.log(holidaysTest);

        let hookyTest = this.hookyService.getFilteredbyEmployee(employeeID);
        console.log(hookyTest);

        let workTest = this.workingDaysService.getFilteredbyEmployeeStartAndFinishDate(employeeID, startYear, startMonth, finishYear, finishMonth);
        console.log(workTest);

        for (let i = 0; i < sickLeaveTest.length; i++) {

            if (type === "sickLeave" && id === sickLeaveTest[i].id) {
                continue;
            }

            if( !(start > sickLeaveTest[i].finishDisease || finish < sickLeaveTest[i].startDisease) ) {
                return false;
            }

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
                    sumDaysFinish+= amountDays - sDate + 1;
                }
            } 
        }

        for (let i = 0; i < businessTest.length; i++) {
            
            if (type === "businessTrip" && id === businessTest[i].id) {
                continue;
            }

            if( !(start > businessTest[i].finishBusinessTrip || finish < businessTest[i].startBusinessTrip) ) {
                return false;
            }

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
                    sumDaysFinish+= amountDays - sDate + 1;
                }
            } 
        }

        for (let i = 0; i < holidaysTest.length; i++) {
            
            if (type === "holidays" && id === holidaysTest[i].id) {
                continue;
            }

            if( !(start > holidaysTest[i].finishHoliday || finish < holidaysTest[i].startHoliday) ) {
                return false;
            }

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
                    sumDaysFinish+= amountDays - sDate + 1;
                }
            } 
        }

        for (let i = 0; i < hookyTest.length; i++) {
            
            if (type === "hooky" && id === hookyTest[i].id) {
                continue;
            }

            if( !(start > hookyTest[i].dayHooky || finish < hookyTest[i].dayHooky) ) {
                return false;
            }

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
                if ( (amountWork + sumDaysStart + sumDaysFinish + (finishDate - startDate + 1) ) > amountDays ) {
                    return false;
                }

            } else {
                if ( (sumDaysStart + sumDaysFinish + (finishDate - startDate + 1) ) > amountDays ) {
                    return false;
                }
            }

        } else {

            let k = 0;

            for (let i = 0; i < workTest.length; i++) {

                if (startYear == workTest[i].year && startMonth == workTest[i].month) {
                    
                    let amountStartWork = workTest[i].actualAmountWorkDay;
                    if ( (amountStartWork + sumDaysStart + (amountDays - startDate + 1) ) > amountDays ) {
                        return false;
                    }
                    k++;

                } else if (finishYear == workTest[i].year && finishMonth == workTest[i].month) {
                    
                    let amountFinishWork = workTest[i].actualAmountWorkDay;
                    if ( (amountFinishWork + sumDaysFinish + finishDate ) > amountDays ) {
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
                if ( (sumDaysFinish + finishDate ) > amountDays ) {
                    return false;
                }
            } else if (k == 2) {
                if ( (sumDaysStart + (amountDays - startDate + 1) ) > amountDays ) {
                    return false;
                }
            } else if (k == 0) {
                if ( ((sumDaysStart + (amountDays - startDate + 1) ) > amountDays) || ((sumDaysFinish + finishDate ) > amountDays) ) {
                    return false;
                }
            }
            
        }

        return true;
    }

    getAmountDaysInMonth(finishYear, finishMonth) {
        switch (finishMonth) {
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
                if(finishYear % 4 == 0)
                    return 29; 
                else 
                    return 28;
          }
    }
}   