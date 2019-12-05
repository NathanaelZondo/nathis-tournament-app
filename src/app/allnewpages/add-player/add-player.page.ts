import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  playerNode = {
    fullName: '',
    palyerImage: '',
    DOB : '',
    previousTeam : '',
    DateCreated : new Date,
    playerPosition: '',
    height: '',
    Achievements : [] 
  }
  addPlayerForm: FormGroup;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  isuploading: false
  uploadprogress = 0;
  logoImage
  GJerseyImage
  TjerseyImage
  
  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera ,
    public loadingController: LoadingController,
    private router: Router,
    public toastController: ToastController ) {
    this.addPlayerForm = this.formBuilder.group({
      DOB: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])),
    previousTeam: new FormControl('', Validators.required),
    height: new FormControl('', Validators.compose([Validators.required])),
    playerPosition: new FormControl('', Validators.compose([Validators.required])),
      Achievements: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  ngOnInit() {
  }
  async createTeam(addPlayerForm: FormGroup): Promise<void> {
    if (!addPlayerForm.valid) {
      addPlayerForm.value
    }
    else  {
      // load the profile creation process
      const load = await this.loadingController.create({
        message: 'Creating Your Team..'
      });
      load.present();
      
      parseInt(this.playerNode.height)
      const user = this.db.collection('Teams').doc(firebase.auth().currentUser.uid).collection('Players').doc().set(this.playerNode)
      
      // upon success...
      user.then(async() => {
        this.router.navigateByUrl('manage-team')
        const toast = await this.toastController.create({
          message: 'User Team added.',
          duration: 2000,

        });
        toast.present();
     
        load.dismiss();

        // catch any errors.
      }).catch(async err => {
        const toast =  await this.toastController.create({
          message: 'Error creating Team.',
          duration: 2000
        })
        toast.present();

        load.dismiss();
      })
    }

  }


  //Functions to upload images

  async selectImage() {
    let option: CameraOptions = {
    
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      quality: 90,
      targetHeight : 600,
      targetWidth : 600,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    await this.camera.getPicture(option).then(res => {
      console.log(res);
      const image = `data:image/jpeg;base64,${res}`;

      this.TjerseyImage = image;
      const filename = Math.floor(Date.now() / 1000);
      let file = 'Teams-Players-image/' + firebase.auth().currentUser.uid + filename + '.jpg';
      const UserImage = this.storage.child(file);

      const upload = UserImage.putString(image, 'data_url');
      upload.on('state_changed', snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadprogress = progress;
        if (progress == 100) {
          this.isuploading = false;
        }
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(downUrl => {
          this.playerNode.palyerImage = downUrl;
          console.log('Image downUrl', downUrl);


        })
      })
    }, err => {
      console.log("Something went wrong: ", err);
    })

  }  

  

  validation_messages = {
    'fullName': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name must be at least 4 characters long.' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your Name must not contain numbers and special characters.' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'previousTeam': [
      { type: 'required', message: 'location is required.' },
      { type: 'minlength', message: 'location must be at least 4 characters long.' },
      { type: 'maxlength', message: 'location cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your location must not contain numbers and special characters.' },
      { type: 'validUsername', message: 'Your location has already been taken.' }
    ],
    'playerPosition': [
      { type: 'required', message: 'Salon contact number is required.' }
    ],
    'height': [
      { type: 'required', message: 'Number of hairdresses is required.' }
    ],
    'Achievements': [
      { type: 'required', message: 'Number of hairdresses is required.' }
    ],
  };

}
