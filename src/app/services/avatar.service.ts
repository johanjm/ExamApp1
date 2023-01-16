import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { domainToASCII } from 'url';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo, nombre: string, cedula: string, edad: string, latitud: number, longitud: number) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
        nombre,
        cedula,
        edad,
        latitud,
        longitud
      });
      return true;
    } catch (e) {
      return null;
    }
  }
}
