if (Meteor.isClient) {
  Session.setDefault("A", true);
  Session.setDefault("C", true);
  
  Template.hello.rendered = function() {
    this.$('#hooks').get(0)._uihooks = {
      insertElement: function(node, next, done) {
        if (next.scheduleRemoved)
          console.error("I can't insert a node before something that's being removed...");
      
        next.parentNode.insertBefore(node, next);
      },
      removeElement: function(node, done) {
        // DO NOTHING
        node.scheduleRemoved = true;
        // node.parentNode.removeChild(node);
      }
    }
  }

  Template.hello.helpers({
    A: function() {
      return Session.get('A')
    },
    C: function() {
      return Session.get('C')
    }
  });

  Template.hello.events({
    'click button': function () {
      Session.set('C', false);
      Session.set('A', false);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
