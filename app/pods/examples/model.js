import DS from 'ember-data';

export default DS.Model.extend({
  twitTime: DS.attr('string'),
  twitPlaceName: DS.attr('string'),
  info: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number')
});
