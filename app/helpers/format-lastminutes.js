import Ember from 'ember';

export function formatLastminutes(params/*, hash*/) {
  var lastminutesText = '';
  switch (params[0]) {
    case 30:
      lastminutesText = '(30m)';
      break;
    case 60:
      lastminutesText = '(1h)';
      break;
    case 180:
      lastminutesText = '(3h)';
      break;
    case 360:
      lastminutesText = '(6h)';
      break;
    case 720:
      lastminutesText = '(12h)';
      break;
    case 1440:
      lastminutesText = '(1d)';
      break;
    case 10080:
      lastminutesText = '(1w)';
      break;
    default:
      lastminutesText = '(30m)';
      break;
  }

  return ' ' + lastminutesText;
}

export default Ember.Helper.helper(formatLastminutes);
