import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'duration', pure: false })
export class DurationPipe implements PipeTransform {
    transform(duration: number): string {
        return (duration / 60).toFixed(2) + ' min' || '';
    }
}
