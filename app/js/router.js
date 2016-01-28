ContactManager.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'contacts': 'showContacts',
    'contacts/new': 'newContacts',
    'contacts/edit/:id':'editContacts'
  }
});
