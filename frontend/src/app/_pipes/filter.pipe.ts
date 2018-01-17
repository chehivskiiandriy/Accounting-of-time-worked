import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items) {
        return [];
    }
    if (!value) {
        return items;
    }
    value = value.toLowerCase();

    return items.filter(e => {
        for (let key in e) {
            if ((e[key]+"").toLowerCase().includes(value)) {
                return true;
            }
        }
        return false;
    });

   }
}

@Pipe({
    name: 'workingDaysFilter'
  })
  export class WorkingDaysFilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
      if (!items) {
          return [];
      }
  
      if (!value) {
        return items;
      } else {
        return items.filter(item => item.amountWorkingDays > 0);
      }
     }
  }

  @Pipe({
    name: 'businessTripFilter'
  })
  export class BusinessTripFilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
      if (!items) {
          return [];
      }
  
      if (!value) {
        return items;
      } else {
        return items.filter(item => item.businessTrip > 0);
      }
     }
  }

  @Pipe({
    name: 'holidaysFilter'
  })
  export class HolidaysFilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
      if (!items) {
          return [];
      }
  
      if (!value) {
        return items;
      } else {
        return items.filter(item => item.holidays > 0);
      }
     }
  }

  @Pipe({
    name: 'hookyFilter'
  })
  export class HookyFilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
      if (!items) {
          return [];
      }
  
      if (!value) {
        return items;
      } else {
        return items.filter(item => item.hooky > 0);
      }
     }
  }

  @Pipe({
    name: 'sickLeaveFilter'
  })
  export class SickLeaveFilterPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
      if (!items) {
          return [];
      }
  
      if (!value) {
        return items;
      } else {
        return items.filter(item => item.sickLeave > 0);
      }
     }
  }