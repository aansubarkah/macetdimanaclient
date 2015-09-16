import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form-control',
  init() {
    this._super(...arguments);
    this.set('lastminutes', 30);
  },
  actions: {
    selectTime(){
      //this.set('lastminutes',30);
      //console.info(this.get('lastminutes'));
      //this.sendAction('selectTime',this.get('lastminutes'));
    }
  }
});
