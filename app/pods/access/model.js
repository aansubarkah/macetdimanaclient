import DS from 'ember-data';

export default DS.Model.extend({
    browser_id: DS.attr('number', {defaultValue: 1}),
    browserName: DS.attr('string', {defaultValue: ''}),
    browserVersion: DS.attr('string', {defaultValue: ''}),
    cpu_id: DS.attr('number', {defaultValue: 1}),
    cpuArchitecture: DS.attr('string', {defaultValue: ''}),
    device_id: DS.attr('number', {defaultValue: 1}),
    deviceModel: DS.attr('string', {defaultValue: ''}),
    deviceType: DS.attr('string', {defaultValue: ''}),
    deviceVendor: DS.attr('string', {defaultValue: ''}),
    engine_id: DS.attr('number', {defaultValue: 1}),
    engineName: DS.attr('string', {defaultValue: ''}),
    engineVersion: DS.attr('string', {defaultValue: ''}),
    system_id: DS.attr('number', {defaultValue: 1}),
    systemName: DS.attr('string', {defaultValue: ''}),
    systemVersion: DS.attr('string', {defaultValue: ''}),
    ip: DS.attr('string', {defaultValue: ''}),
    created: DS.attr('string'),
    modified: DS.attr('string'),
    active: DS.attr('boolean', {defaultValue: 1})
});
