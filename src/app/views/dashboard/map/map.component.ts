import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../../services/images.service';
import { Image } from '../../../classes/image';
import { LatLngPositionEvent } from '../../../interfaces/position.interface';
import { MatDialog } from '@angular/material';
import { UploadImageComponent } from '../../../components/modals/upload-image/upload-image.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit {
    public coords = { lat: 49.9935, lng: 36.2303, radius: 200 };
    public pins: Image[];

    constructor( private imagesService: ImagesService, public dialog: MatDialog ) {
    }

    ngOnInit() {
        this.imagesService.getList(this.coords).subscribe(response => {
            this.pins = response.data;
        })
    }

    public add(event?: LatLngPositionEvent): void {
        let dialogRef = this.dialog.open(UploadImageComponent, {
            height: '600px',
            width: '400px',
            data: {
                title: 'Add image',
                message: 'Select image that you want to upload'
            }
        });

        dialogRef.afterClosed().subscribe( result => {
            if (result) {

                this.imagesService.upload(result, event.coords && event.coords.lat, event.coords && event.coords.lng)
                    .subscribe( res => {
                    this.pins.push(res);
                })
            }
        })
    }
}
