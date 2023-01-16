import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;
  latitud: number;
  longitud: number;
  nombre: string;
  cedula: string;
  miembros: number;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private geolocation: Geolocation

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async obtenerCoordenadas(){
    const obtenerCoordenadas=await this.geolocation.getCurrentPosition();
    this.latitud=obtenerCoordenadas.coords.latitude;
    this.longitud=obtenerCoordenadas.coords.longitude;
    
   }
 
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage(formulario: NgForm) {
    const nombre=formulario.value.nombre
    const cedula=formulario.value.cedula
    const miembros=formulario.value.miembros
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image,nombre,cedula,miembros,this.latitud,this.longitud);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'Los datos no están llenos',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
