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
    public coords = { lat: 49.9935, long: 36.2303 };
    public pins: Image[];

    constructor( private imagesService: ImagesService, public dialog: MatDialog ) {
    }

    ngOnInit() {
        this.pins = [new Image({ lat: 49.9935, long: 36.2303, url: 'https://www.w3schools.com/w3css/img_forest.jpg'})]
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

                this.imagesService.upload(result).subscribe( res => {

                })
            }
        })
    }
}
