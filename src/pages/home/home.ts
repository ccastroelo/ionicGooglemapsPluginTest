import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent
} from '@ionic-native/google-maps';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mapaReady: boolean;
  map: GoogleMap;  // mapa


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController ) {
  }



  ionViewDidLoad() {
    this.mapaReady = false;
    this.loadMap();
  }

  loadMap() {
    if (this.map) {
      console.log("mapa exist");
      this.atualizaMapa()
    } else {
      console.log("mapa not exist");
      setTimeout(() => {
        this.map = GoogleMaps.create('map_canvas', {
          controls: {
            myLocationButton: true
          },
          camera: {
            zoom: 12,
            tilt: 0
          }
        });
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.map.setMyLocationEnabled(true);
          this.atualizaMapa();
        });
      }, 2000);
    }
  }

  moveCam(location) {
     this.map.moveCamera({
          target: location.latLng,
          zoom: 4,
          tilt: 0
      });
  }

  atualizaMapa() {
    console.log("mapa ready, getting location now");
    this.map.getMyLocation().then(location => {
        console.log('location ok');
        this.moveCam(location);
    }).catch(error => {
        console.log('Ocorreu um erro ao obter os preços.');
    });
  }
}

