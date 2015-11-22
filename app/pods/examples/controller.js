import Ember from 'ember';

export default Ember.Controller.extend({
  lat: -6.171476,
  lng: 106.826937,
  newLat: 0,
  newLng: 0,
  zoom: 10,
  isShowingModal: false,
  triggerSuggestions: 1,
  actions: {
    refreshPlace(lat, lng){
      this.set('lat', lat);
      this.set('lng', lng);
    }
  }
});
