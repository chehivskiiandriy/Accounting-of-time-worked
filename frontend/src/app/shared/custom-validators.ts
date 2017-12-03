import { AbstractControl } from "@angular/forms";

export function datePatternValidator(control: AbstractControl): { [key: string]: any } {

    let value = control.value;
    let result;
    console.log(value);

    if(!value) return null;

    if(value.hasOwnProperty('_pf')) {
        result = value._pf.unusedInput.length > 0 ? false : true;
    } else {
        return null;
    }
    

    if (result) {
        return null;
    } else {
        return { "datePatternValidator": { value } }
    }
}