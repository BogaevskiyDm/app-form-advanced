import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

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

export function asyncUrlValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const urlRegex = /(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?/;
    const value = control.value;
    const result = urlRegex.test(value);

    return new Promise((resolve) => {
        setTimeout(() => {
            if (result) { resolve(null) } else {
                resolve({ urlNotAllowed: { value } })
            }
        }, 5000)
    })

}
export function observableUrlValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const urlRegex = /(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?/;
    const value = control.value;
    const result = urlRegex.test(value);

    return new Observable<ValidationErrors | null>((observer) => {
        if (result) { observer.next(null); } else {
            observer.next({ urlNotAllowed: { value }});
        }

        observer.complete();

    }).pipe(delay(5000))

}