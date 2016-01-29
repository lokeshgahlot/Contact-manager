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
      var newContactForm = new ContactManager.Views.ContactForm();

      newContactForm.on('form:submitted', function(attrs) {
        attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);
        contacts.add(attrs);
        router.navigate('contacts', true);
      });

      $('.main-container').html(newContactForm.render().$el);
    });

    router.on('route:editContacts', function(id) {
      console.log('Edit Contacts id = ', id);
    });

    Backbone.history.start();
  }
};
