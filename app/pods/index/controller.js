import Ember from 'ember';

export default Ember.Controller.extend({
  geolocation: Ember.inject.service(),
  userLocation: null,
  init: function () {
    var that = this;
    this.get('geolocation').getLocation().then(function () {
      var currentLocation = that.get('geolocation').get('currentLocation');
      that.set('userLocation', currentLocation);

      // if user share her location, relocate lat and lng, otherwise it will use defaul
      // value which is suarasurabaya office
      that.set('lat', currentLocation[0]);
      that.set('lng', currentLocation[1]);
    });
  },
  queryParams: ['lastminutes'],
  lastminutes: 30,
  lat: -7.290293,
  lng: 112.727226,
  newLat: 0,
  newLng: 0,
  zoom: 14,
  isShowingModal: false,
  triggerSuggestions: 1,
  actions: {
    refreshPlace(lat, lng){
      this.set('lat', lat);
      this.set('lng', lng);
    }
  }
});
