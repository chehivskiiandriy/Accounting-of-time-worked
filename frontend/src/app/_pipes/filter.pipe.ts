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