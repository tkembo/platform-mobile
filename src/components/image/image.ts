import { Component, ViewChild } from '@angular/core';
import { Button, ActionSheetController, AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormGroupName, FormControl, FormControlName } from '@angular/forms';

import { Value } from '../../models/value';
import { Attribute } from '../../models/attribute';

import { LoggerService } from '../../providers/logger-service';

@Component({
  selector: 'field-image',
  templateUrl: 'image.html',
  inputs: ['value', 'attribute', 'formGroup']
})
export class ImageComponent {

  formGroup: FormGroup;
  attribute: Attribute = null;
  value: Value = null;
  imageData: string = null;
  imageThumbnail: SafeResourceUrl = null;

  @ViewChild('button') button: Button;

  constructor(
    public sanitizer:DomSanitizer,
    public logger:LoggerService,
    public alertController:AlertController,
    public actionController:ActionSheetController) {
  }

  ngOnInit() {
    this.logger.info(this, "Attribute", this.attribute, "Value", this.value);
  }

  showOptions() {
    let actionSheet = this.actionController.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Photo Library',
          handler: () => {
            this.choosePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto() {
    this.logger.info(this, "takePhoto");
    let options = {
      targetWidth: 800,
      targetHeight: 600,
      encodingType: Camera.EncodingType.JPEG,
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then (
      (data) => {
        this.imageData = "data:image/jpeg;base64," + data;
        this.imageThumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageData);
      },
      (error) => {
        this.logger.error(this, "choosePhoto", error);
        let alert = this.alertController.create({
          title: 'Problem Taking Photo',
          subTitle: "There was a problem trying to take a photo.",
          buttons: ['OK']
        });
        alert.present();
      });
  }

  choosePhoto() {
    this.logger.info(this, "choosePhoto");
    let options = {
      targetWidth: 800,
      targetHeight: 600,
      encodingType: Camera.EncodingType.JPEG,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
    };
    Camera.getPicture(options).then(
      (data) => {
        this.imageData = "data:image/jpeg;base64," + data;
        this.imageThumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageData);
      },
      (error) => {
        this.logger.error(this, "takePhoto", error);
        let alert = this.alertController.create({
          title: 'Problem Choosing Photo',
          subTitle: "There was a problem trying to choose photo from the library.",
          buttons: ['OK']
        });
        alert.present();
      });
  }

  deletePhoto() {
    this.logger.info(this, "deletePhoto");
  }
}
