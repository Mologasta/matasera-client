import { AbstractControl } from '@angular/forms';
export class Validation {

    static matchPassword(c: AbstractControl) {
        const password = c.get('newPassword').value;
        const confirmPassword = c.get('confirmPassword').value;
        if (password !== confirmPassword) {
            c.get('confirmPassword').setErrors({matchPassword: true});
        } else {
            return null;
        }
    }
}
