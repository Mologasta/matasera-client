import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'distance', pure: false })
export class DistancePipe implements PipeTransform {
    transform(distance: number): string {
        return (distance / 1609).toFixed(2) + ' mi' || '';
    }
}
