export class CheckErrorValidators {

    today = new Date();
    day = this.today.getDate();
    month = this.today.getMonth() + 1;
    year = this.today.getFullYear();

    maxDate = this.pad(this.day) + "." + this.pad(this.month) + "." + (this.year - 16);
    minDate = this.pad(this.day) + "." + this.pad(this.month) + "." + (this.year - 66);
    currentDay = this.pad(this.day) + "." + this.pad(this.month) + "." + (this.year);
    yearAgo = this.pad(this.day) + "." + this.pad(this.month) + "." + (this.year - 1);

    pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
    }

    validationMessages = {
        "surname": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "name": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "patronymic": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "birthday": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.minDate} .`,
            "matDatepickerMax": `The value must not be more than ${this.maxDate} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "selectedSubdivision": {
            "required": "Required field."
        },
        "selectedEmployee": {
            "required": "Required field."
        },
        "startDisease": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "finishDisease": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "disease": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 40 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "startHoliday": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "finishHoliday": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "startBusinessTrip": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "finishBusinessTrip": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "dayHooky": {
            "required": "Required field.",
            "matDatepickerMin": `The value must be at least ${this.yearAgo} .`,
            "matDatepickerMax": `The value must not be more than ${this.currentDay} .`,
            "matDatepickerParse": "The value must be in format dd.mm.yyyy .",
            "datePatternValidator": "The value must be in format dd.mm.yyyy ."
        },
        "year": {
            "required": "Required field.",
            "min": "min",
            "max": "max"
        },
        "month": {
            "required": "Required field.",
            "min": "min",
            "max": "max"
        },
        "actualAmountWorkDay": {
            "required": "Required field.",
            "min": "min",
            "max": "max"
        }
    };

    onValueChange(userForm, formErrors, data?: any) {
        if (!userForm) return;
        let form = userForm;
  
        for (let field in formErrors) {
            formErrors[field] = "";

            let control = form.get(field);
            
            if (control.invalid && (control.touched || control.dirty) ) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    console.log(key);
                    formErrors[field] += message[key] + " ";
                }
            }
        }
    }
}