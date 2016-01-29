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
      var newContactForm = new ContactManager.Views.ContactForm({
        model: new ContactManager.Models.Contact()
      });

      newContactForm.on('form:submitted', function(attrs) {
        attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);
        contacts.add(attrs);
        router.navigate('contacts', true);
      });

      $('.main-container').html(newContactForm.render().$el);
    });

    router.on('route:editContacts', function(id) {
      var contact = contacts.get(id);
      var editContact;
      if (contact) {
        editContact  = new ContactManager.Views.ContactForm({
          model: contact
        });
        editContact.on('form:submitted', function(attrs) {
          contact.set(attrs);
          router.navigate('contacts', true);
        });

        $('.main-container').html(editContact.render().$el);
      } else {
        router.navigate('contacts', true) ;
      }
    });

    Backbone.history.start();
  }
};
