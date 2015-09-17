//to make JSHint happy
/*global moment:false*/
/*global Hashids:false*/
import Ember from 'ember';
moment.locale('id');
var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  userLocation: null,
  actions: {
    willTransition: function () {//before leave this route
      this.controller.set('displayMap', false);
      this.controller.set('originPlaceholder', 'Origin');
      return true;
    },
    didTransition: function () {//before enter this route
      //to get user current location
      var that = this;
      this.get('geolocation').getLocation().then(function () {
        var currentLocation = that.get('geolocation').get('currentLocation');
        that.set('userLocation', currentLocation);

        // if user share her location, relocate lat and lng, otherwise it will use defaul
        // value which is suarasurabaya office
        that.controller.set('lat', currentLocation[0]);
        that.controller.set('lng', currentLocation[1]);
        that.controller.set('originPlaceholder', 'Origin (blank mean your location)');
        that.controller.set('origin', currentLocation);
      });
      return true;
    }
  },
  breadCrumb: {
    title: 'Index'
  },
  model: function (params) {
    var query = {};

    if (Ember.isPresent(params.lastminutes)) {
      query.lastminutes = params.lastminutes;
    }

    return Ember.RSVP.hash({
      markerview: this.store.query('markerview', query)
    });

  },
  setupController: function (controller, model) {
    controller.set('markerview', model.markerview);
    var markerviews = [];
    controller.set('markerviews', markerviews);

    // ---------------------------------------------------------
    // ------------- create markers to display on maps ---------
    // ---------------------------------------------------------
    var markersForDisplay = [];
    model.markerview.forEach(function (item) {
      var isPinned = "Tidak";
      var isCleared = "Belum";

      if (item.get('pinned')) {
        isPinned = "Ya";
      }

      if (item.get('cleared')) {
        isCleared = "Ya";
      }

      var content = "<p><strong>Waktu:&nbsp;</strong>" + moment(item.get('created')).fromNow() + "</p>" +
        "<p>(" + moment(item.get('created')).format('dddd, Do MMMM YYYY, h:mm:ss A') + ")</p>";
      var placeName = '';

      if (item.get('isTwitExist')) {
        placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('twitPlaceName') + "</p>";
      }
      if (item.get('isPlaceNameExist')) {
        placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('place_name') + "</p>";
      }

      content = content + placeName;
      content = content + "<p><strong>Keterangan:&nbsp;</strong>" + item.get('info') + "</p>" +
        "<p><strong>Cuaca:&nbsp</strong>" + item.get('weather_name') + "</p>";

      if (item.get('isTwitImageExist')) {
        content = content + "<p align='center'><a href='" + item.get('twitImage') + "' target='_blank'>" +
          "<img src='" + item.get('twitImage') + "' alt='image' height='150' width='150'></a></p>";
      }

      var result = {
        id: hashids.encode(item.get('id')),
        lat: item.get('lat'),
        lng: item.get('lng'),
        title: item.get('category_name'),
        icon: 'images/dark/' + item.get('category_id') + '.png',
        infoWindow: {
          content: content,
          visible: false
        }
      };
      markersForDisplay.push(result);
    });
    controller.set('markersForDisplay', markersForDisplay);

    var routesForDisplay = [];
    controller.set('routesForDisplay', routesForDisplay);
  },
  queryParams: {
    lastminutes: {
      refreshModel: true
    }
  }
});
