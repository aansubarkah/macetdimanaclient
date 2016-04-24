import Ember from 'ember';
var parser = new UAParser();

export default Ember.Controller.extend({
    init: function() {
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
            page_id: 5,
            ip: '',
            created: '',
            modified: '',
            active: 1
        };

        const store = this.get('store');
        var access = store.createRecord('access', dataToSave);
        access.save();
    }
});
