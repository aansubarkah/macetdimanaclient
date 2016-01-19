/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dimanamacet-client-frontend',
    podModulePrefix: 'dimanamacet-client-frontend/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://cdn.datatables.net https://code.jquery.com https://maxcdn.bootstrapcdn.com https://cdnjs.cloudflare.com *.googleapis.com maps.gstatic.com",
      'font-src': "'self' https://maxcdn.bootstrapcdn.com https://cdn.datatables.net http://fonts.gstatic.com https://fonts.gstatic.com https://code.ionicframework.com",
      'connect-src': "'self' http://localhost:8765 http://api.macetdimana.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com *.twimg.com",
      'style-src': "'self' 'unsafe-inline' https://code.ionicframework.com https://maxcdn.bootstrapcdn.com https://cdn.datatables.net fonts.googleapis.com map.gstatic.com",
      'media-src': "'self'"
    },

    googleMap: {
      libraries: ['places', 'geometry'],
      //apiKey: 'AIzaSyCk4IJhW2Mm8VgO9qscE_qpQI3YtdGNGpc'//on production server
      apiKey: 'AIzaSyAwKFM_JN6cwBiSn13ALJVuoR9gcvAW1OE'//on localhost
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
