window.ContactManager = {
  Models:{},
  Collections:{},
  Views:{},
  start: function(data) {
    var contacts = new ContactManager.Collections.Contacts(data.contacts);
    var router = new ContactManager.Router();

    router.on('route:home', function() {
      router.navigate('contacts', {
        trigger: true,
        replace: true
      });
    });

    router.on('route:showContacts', function() {
      var contactsView = new ContactManager.Views.Contacts({
        collection: contacts
      });
      $('.main-container').html(contactsView.render().$el);
    });

    router.on('route:newContacts', function() {
      console.log('new Contact');
    });

    router.on('route:editContacts', function(id) {
      console.log('Edit Contacts id = ', id);
    });

    Backbone.history.start();
  }
};
