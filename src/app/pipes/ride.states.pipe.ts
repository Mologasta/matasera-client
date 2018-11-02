import { Pipe, PipeTransform } from '@angular/core';
import { RideStates } from '../enums/ride-states.enum';

const STATES = {
    [RideStates.searching]: 'Searching',
    [RideStates.arriving]: 'Arriving',
    [RideStates.arrived]: 'Arrived',
    [RideStates.started]: 'Started',
    [RideStates.finished]: 'Finished',
    [RideStates.canceled]: 'Canceled'
};

@Pipe({ name: 'rideStates', pure: false })
export class RideStatesPipe implements PipeTransform {
    transform(text: RideStates): string {
        return STATES[text] || '';
    }
}
