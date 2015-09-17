//to make JSHint happy
/*global Hashids:false*/
/*global ip:false*/
import Ember from 'ember';
import ip from 'npm:ip';

var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Controller.extend({
  displayMap: false,
  geolocation: Ember.inject.service(),
  userLocation: null,
  originPlaceholder: 'Origin',
  queryParams: ['lastminutes'],
  lastminutes: 30,
  lat: -7.290293,
  lng: 112.727226,
  origin: [-7.290293, 112.727226],
  destination: [0, 0],
  zoom: 14,
  isShowingModal: false,
  triggerSuggestions: 1,
  actions: {
    refreshPlace(lat, lng){
      this.set('lat', lat);
      this.set('lng', lng);
    },
    getOriginCoordinate(lat, lng){
      this.set('origin', [lat, lng]);
    },
    getDestinationCoordinate(lat, lng){
      this.set('destination', [lat, lng]);
    },
    getRoute(){
      this.set('displayMap', true);

      this.set('routesForDisplay', []);
      var origin = this.get('origin');

      this.set('lat', origin[0]);
      this.set('lng', origin[1]);

      this.routesForDisplay.addObject({
        id: hashids.encode(new Date().getTime(), ip.toLong(ip.address())),
        origin: this.get('origin'),
        destination: this.get('destination'),
        travelMode: 'driving',
        strokeColor: '#3333FF',
        strokeOpacity: 0.6,
        strokeWeight: 6,
        region: 'id'
      });
    },
    refreshPage(){
      this.set('lastminutes', 30);
      this.set('displayMap', false);
      this.transitionToRoute('journey');
    }
  }
});
