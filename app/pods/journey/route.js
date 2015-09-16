//to make JSHint happy
/*global moment:false*/
/*global Hashids:false*/
import Ember from 'ember';
moment.locale('id');
var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Route.extend({
  actions: {
    willTransition: function () {//before leave this route
      //this.controller.set('lastminutes', 30);
      this.controller.set('displayMap', false);
      this.controller.set('originPlaceholder', 'Origin');
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

      if (item.get('isTwitExist') == 1) {
        placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('twitPlaceName') + "</p>";
      }
      if (item.get('isPlaceNameExist') == 1) {
        placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('place_name') + "</p>";
      }

      content = content + placeName;
      content = content + "<p><strong>Keterangan:&nbsp;</strong>" + item.get('info') + "</p>" +
        "<p><strong>Cuaca:&nbsp</strong>" + item.get('weather_name') + "</p>";

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
