import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { SplashComponent } from './splash/splash.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],


})
export class AppComponent {
  constructor(
    private geolocation: Geolocation,
    private modalController: ModalController
  ) {
    this.presentSplash();
  //  this.getGeolocation();
  }
  async presentSplash(){
    const modal= await this.modalController.create({
      component: SplashComponent,
      cssClass: "my-custom-class"
    });
    return await modal.present();
  }
   //getGeolocation() {

  //  this.geolocation.getCurrentPosition().then((resp) => {
  //    console.log("resp", resp)
      // resp.coords.latitude
      // resp.coords.longitude
   // }).catch((error) => {
  //    console.log('Error getting location', error);
   // });

   // let watch = this.geolocation.watchPosition();
   // watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
  //  });

  //} 
}
