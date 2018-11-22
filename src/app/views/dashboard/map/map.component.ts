import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../../services/images.service';
import { Image } from '../../../classes/image';
import { LatLngPositionEvent } from '../../../interfaces/position.interface';
import { MatDialog } from '@angular/material';
import { UploadImageComponent } from '../../../components/modals/upload-image/upload-image.component';
import { environment } from '../../../../environments/environment';
import { ImageComment } from '../../../classes/comment';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent  implements OnInit {
    public coords = environment.defaultCoords;
    public pins: Image[];
    public comments: ImageComment[] = [];
    public preview: Image;

    constructor( private imagesService: ImagesService, public dialog: MatDialog ) {
    }

    ngOnInit() {
        this.imagesService.getList(this.coords).subscribe(response => {
            this.pins = response.data;
        })
    }

    public add(event?: LatLngPositionEvent): void {
        let dialogRef = this.dialog.open(UploadImageComponent, {
            width: '350px',
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

    public openDetailedView (pin: Image): void {
        this.imagesService.getComments(pin.id).subscribe(response => {
            this.comments = response.data;
        });

        this.preview = pin;
    }

    public leaveComment(text: string, id: number) {
        this.imagesService.addComment( { text }, id).subscribe(response => {
            this.comments.push(response);
        });
    }
}
