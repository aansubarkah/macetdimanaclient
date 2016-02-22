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

            var itemTime = item.get('created');
            if (item.get('twitTime') !== null) {
                itemTime = item.get('twitTime');
            }

            var content = '<p>';
            var placeName = '';
            var info = '';

            var category_id = item.get('category_id');
            var categoryName = item.get('category_name');
            var timeName = moment(itemTime).fromNow();
            var timeString = moment(itemTime).format('dddd, Do MMMM YYYY, h:mm:ss A');
            if (item.get('isTwitExist')) {
                placeName = item.get('twitPlaceName');
            }
            if (item.get('isPlaceNameExist')) {
                placeName = item.get('place_name');
            }
            if (item.get('info') !== '') {
                info = item.get('info');
            }

            if (category_id !== 3) {
                content = '<strong>' + categoryName + '</strong>&nbsp;';
                content = content + placeName + '&nbsp;';
                content = content + info + '&nbsp;';
            } else {
                content = placeName + '&nbsp;';
                content = content + info + '&nbsp;';
                content = content + '<strong>' + categoryName + '</strong>&nbsp;';
            }
            content = content + '<br/>';
            content = content + 'pada&nbsp;<strong>' + timeName + '</strong>&nbsp;';
            content = content + 'kondisi&nbsp;<strong>' + item.get('weather_name') + '</strong>&nbsp;';
            content = content + '<br/>';
            content = content + '(' + timeString + ')';
            content = content + '</p>';

            if (item.get('isTwitImageExist')) {
                content = content + "<p align='center'><a href='" + item.get('twitImage') + "' target='_blank'>" +
                    "<img src='" + item.get('twitImage') + "' alt='image' height='150' width='150'></a></p>";
            }
            /*var content = "<p><strong>Waktu:&nbsp;</strong>" + moment(itemTime).fromNow() + "</p>" +
              "<p>(" + moment(itemTime).format('dddd, Do MMMM YYYY, h:mm:ss A') + ")</p>";
              var placeName = '';
              var info = '';

              if (item.get('isTwitExist')) {
              placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('twitPlaceName') + "</p>";
              }
              if (item.get('isPlaceNameExist')) {
              placeName = "<p><strong>Tempat:&nbsp;</strong>" + item.get('place_name') + "</p>";
              }
              if (item.get('info') !== '') {
              info = "<p><strong>Keterangan:&nbsp;</strong>" + item.get('info') + "</p>";
              }

              content = content + placeName;
              content = content + info +
              "<p><strong>Cuaca:&nbsp</strong>" + item.get('weather_name') + "</p>";
              if (item.get('isTwitImageExist')) {
              content = content + "<p align='center'><a href='" + item.get('twitImage') + "' target='_blank'>" +
              "<img src='" + item.get('twitImage') + "' alt='image' height='150' width='150'></a></p>";
              }*/

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
        //didTransition: function () {
        //}
    }
});
