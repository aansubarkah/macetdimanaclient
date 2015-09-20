//to make JSHint happy
/*global moment:false*/
/*global Hashids:false*/
import Ember from 'ember';
moment.locale('id');
var hashids = new Hashids("m4c3tsur4b4y4");

export default Ember.Route.extend({
  model: function (params) {
    var query = {};

    if (Ember.isPresent(params.lastminutes)) {
      query.lastminutes = params.lastminutes;
    }

    return this.store.query('example', query);
    //return this.store.query('example');

  },
  setupController: function (controller, model) {
    this._super.apply(this, arguments);

    // ---------------------------------------------------------
    // ------------- create markers to display on maps ---------
    // ---------------------------------------------------------
    var markersForDisplay = [];

    model.forEach(function (item) {
      var itemTime = item.get('twitTime');

      var content = "<p><strong>Waktu:&nbsp;</strong>" + moment(itemTime).fromNow() + "</p>" +
        "<p>(" + moment(itemTime).format('dddd, Do MMMM YYYY, h:mm:ss A') + ")</p>";
      var placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('twitPlaceName') + "</p>";


      content = content + placeName;
      content = content + "<p><strong>Keterangan:&nbsp;</strong>" + item.get('info') + "</p>" +
        "<p><strong>Cuaca:&nbsp</strong>Cerah</p>";

      var result = {
        id: hashids.encode(item.get('id')),
        lat: item.get('lat'),
        lng: item.get('lng'),
        title: 'macet',
        icon: 'images/dark/1.png',
        infoWindow: {
          content: content,
          visible: false
        }
      };
      markersForDisplay.push(result);
    });
    controller.set('markersForDisplay', markersForDisplay);
  }
});
