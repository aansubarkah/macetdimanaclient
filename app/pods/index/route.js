//to make JSHint happy
/*global moment:false*/
/*global Hashids:false*/
import Ember from 'ember';
moment.locale('id');
var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Route.extend({
  breadCrumb: {
    title: 'Index'
  },
  model: function (params) {
    var query = {};

    if (Ember.isPresent(params.lastminutes)) {
      query.lastminutes = params.lastminutes;
    }

    return this.store.query('markerview', query);

  },
  setupController: function (controller, model) {
    this._super.apply(this, arguments);

    // ---------------------------------------------------------
    // ------------- create markers to display on maps ---------
    // ---------------------------------------------------------
    var markersForDisplay = [];

    model.forEach(function (item) {
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
  },
  actions: {
    didTransition: function () {
      var lastminutesText = '';
      switch (this.controller.get('lastminutes')) {
        case 30:
          lastminutesText = '(30 Mins)';
          break;
        case 60:
          lastminutesText = '(1 Hr)';
          break;
        case 180:
          lastminutesText = '(3 Hrs)';
          break;
        case 360:
          lastminutesText = '(6 Hrs)';
          break;
        case 720:
          lastminutesText = '(12 Hrs)';
          break;
        case 1440:
          lastminutesText = '(1 D)';
          break;
        case 10080:
          lastminutesText = '(1 W)';
          break;
        default:
          lastminutesText = '(30 M)';
          break;
      }

      this.controller.set('lastminutesText', lastminutesText);
      return true;
    }
  }
});
