import { LatLngBounds } from "@agm/core";

export interface LatLngPosition {
    lat: number;
    lng: number;
}

export interface LatLngPositionEvent {
    coords: LatLngPosition;
}

export interface LatLngMarker extends LatLngPosition {
    name: string;
}

export interface MapSettings extends LatLngPosition {
    placeBounds: LatLngBounds;
}
