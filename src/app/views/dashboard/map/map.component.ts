import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../../services/images.service';
import {Image} from '../../../classes/image';
import {LatLngPositionEvent} from '../../../interfaces/position.interface';
import {MatDialog} from '@angular/material';
import {UploadImageComponent} from '../../../components/modals/upload-image/upload-image.component';
import {environment} from '../../../../environments/environment';
import {ImageComment} from '../../../classes/comment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAP_FORM_CONTROLS, MAP_FORM_ERRORS} from './map.configs';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    public coords = environment.defaultCoords;
    public pins: Image[] = [];
    public comments: ImageComment[] = [];
    public preview: Image;
    public mapForm: FormGroup;
    public gMap: GoogleMapsAPIWrapper;

    constructor(private imagesService: ImagesService,
                private formBuilder: FormBuilder,
                private router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.initForm();
        this.getList();

    }

    private initForm(): void {
        this.mapForm = this.formBuilder.group(MAP_FORM_CONTROLS);
    }

    protected mapReady(map) {
        this.gMap = map;
        this.gMap.setCenter({lat: this.coords.lat, lng: this.coords.lng});
        this.gMap.panTo({lat: this.coords.lat, lng: this.coords.lng})
    }

    public add(event?: LatLngPositionEvent): void {
        let dialogRef = this.dialog.open(UploadImageComponent, {
            width: '350px',
            data: {
                title: 'Add image',
                message: 'Select image that you want to upload'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.imagesService.upload(result, event && event.coords.lat, event && event.coords.lng)
                    .subscribe(res => {
                        this.pins.push(res);
                    });
            }
        });
    }

    public openDetailedView(pin: Image): void {
        this.imagesService.getComments(pin.id).subscribe(response => {
            this.comments = response.data;
        });

        this.preview = pin;
    }

    public leaveComment(text: string, id: number) {
        this.imagesService.addComment({text}, id).subscribe(response => {
            this.comments.push(response);
        });
    }

    public getList(): void {
        if(this.gMap) {
            const latLng: any = this.gMap.getCenter();
            this.coords.lat = latLng.lat();
            this.coords.lng = latLng.lng()
        }

        const formValues = this.mapForm.value;
        this.coords.radius = formValues.distance / 112.2;
        this.imagesService.getList(this.coords).subscribe(response => {
            this.pins = response.data;
        })
    }

    public getErrorMessage(fieldName: string): string {
        const controlErrors = this.mapForm.controls[fieldName].errors;
        let errorText = 'error';
        Object.keys(controlErrors).forEach((error) => {
            if (error) {
                return errorText = this.obtainErrorText(fieldName, error);
            }
        });
        return errorText;
    }

    private obtainErrorText(fieldName: string, errorName: string): string {
        return MAP_FORM_ERRORS[fieldName][errorName];
    }
}
