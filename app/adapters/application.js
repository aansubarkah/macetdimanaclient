/**
 * Created by aan on 14/08/15.
 */
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  shouldReloadAll: function () {
    return false;
  },
  shouldBackgroundReloadRecord: function () {
    return false;
  },
  host: 'http://api.macetdimana.com',// @todo change this on development server
  //host: 'http://localhost:8765',// @todo change this on production server
  ajax: function (url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: false};
    return this._super(url, method, hash);
  }
});
