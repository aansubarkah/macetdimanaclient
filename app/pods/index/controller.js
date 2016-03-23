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
        });

        var parserResult = parser.getResult();
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
            created: '',
            modified: '',
            active: 1
        };

        const store = this.get('store');
        var access = store.createRecord('access', dataToSave);
        access.save();
    },
    queryParams: ['lastminutes'],
    lastminutes: 180,
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
