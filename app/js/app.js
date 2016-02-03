var ContactManager = new Marionette.Application({
  Models:{},
  Collections:{},
  Views:{}
});

ContactManager.addRegions({
  mainRegion: '.main-container'
});
ContactManager.addInitializer(function(data) {
  var contacts = new ContactManager.Collections.Contacts(data.contacts);
  var router = new ContactManager.Router();

  router.on('route:home', function() {
    router.navigate('contacts', {
      trigger: true,
      replace: true
    });
  });

  router.on('route:showContacts', function() {
    var contactView = new ContactManager.Views.Contacts({
      collection: contacts
    });
  });

  router.on('route:newContact', function() {
    var newContactForm = new ContactManager.Views.ContactForm( {
      model: new ContactManager.Models.Contact()
    });
    newContactForm.on('form:submitted', function(attrs) {
      attrs.id = contacts.isEmpty() ? 1 : (_.max(contacts.pluck('id')) + 1);
      contacts.add(attrs);
      router.navigate('contacts', true);
    });
    ContactManager.mainRegion.show(newContactForm);
  });

  router.on('route:editContact', function(id) {
    var contact = contact.get(id);
    var editContactForm;

    if (contacts) {
      editContactForm = new ContactManager.Views.ContactForm({
        model: contact
      });

      editContactForm.on('form:submit', function(options) {
        contact.set(attrs)
        router.navigate('contacts', true);
      });

      ContactManager.mainRegion.show(editContactForm);
    } else {
      router.navigate('contacts', true)
    }
  });
});

ContactManager.on('initialize:after', function(options) {
  if (Backbone.history) {
    Backnone.history.start();
  }
});
