import Ember from 'ember';
var parser = new UAParser();

export default Ember.Controller.extend({
    geolocation: Ember.inject.service(),
    userLocation: null,
    init: function () {
        this.set('isShowingModal', true);
        var that = this;
        this.get('geolocation').getLocation().then(function () {
            var currentLocation = that.get('geolocation').get('currentLocation');
            that.set('userLocation', currentLocation);

            // if user share her location, relocate lat and lng, otherwise it will use defaul
            // value which is suarasurabaya office
            that.set('lat', currentLocation[0]);
            that.set('lng', currentLocation[1]);

            //@todo save to accesses table
            var parserResult = parser.getResult();
            that.set('userLat', currentLocation[0]);
            that.set('userLng', currentLocation[1]);

            var dataToSave = {
                browser_id: 1,
                browserName: parserResult.browser.name,
                browserVersion: parserResult.browser.version,
                cpu_id: 1,
                cpuArchitecture: parserResult.cpu.architecture,
                device_id: 1,
                deviceModel: parserResult.device.model,
                deviceType: parserResult.device.type,
                deviceVendor: parserResult.device.vendor,
                engine_id: 1,
                engineName: parserResult.engine.name,
                engineVersion: parserResult.engine.version,
                system_id: 1,
                systemName: parserResult.os.name,
                systemVersion: parserResult.os.version,
                ip: '',
                lat: that.get('userLat'),
                lng: that.get('userLng'),
                created: '',
                modified: '',
                active: 1
            };

            const store = that.get('store');
			var access = store.createRecord('access', dataToSave);
            access.save();
			//access.save().then(function () {
				// @warn refresh template
				//that.get('target.router').refresh();
				//that.transitionToRoute('markers');
			//});

            //console.log(parserResult);
            //console.log(dataToSave);
        });
    },
    queryParams: ['lastminutes'],
    lastminutes: 180,
    //lat: -7.290293,
    //lng: 112.727226,-6.175104, 106.827185
    userLat: 0,
    userLng: 0,
    lat: -6.175104,
    lng: 106.827185,
    newLat: 0,
    newLng: 0,
    zoom: 14,
    isShowingModal: false,
    triggerSuggestions: 1,
    actions: {
        toggleAddModal(){
            this.toggleProperty('isShowingModal');
        },
        refreshPlace(lat, lng){
            this.set('lat', lat);
            this.set('lng', lng);
        }
    }
});
