import { AbstractControl } from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {

    const emailRegex = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
    const value = control.value;
    const result = emailRegex.test(value);

    if (!result) {
        return { emailValidator: { value } };
    }
    return null;
}

export function rangeValidator(minValue: number, maxValue: number): { [key: string]: any } | null {
    return (control: AbstractControl): any => {
        const value = +control.value;
        if (isNaN(value)) {
            return {
                rangeValidator: { value }
            };
        } else if (value < minValue || value > maxValue) {
            return {
                rangeValidator: { value }
            };
        }

        return null;
    }
}