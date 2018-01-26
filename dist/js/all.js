
// CodeMirror
var codeMirror = function(elem){
  // codemirror config settings
  var config, editor;
  var textareas = document.querySelectorAll(elem);
  var editor = [];
  config = {
  mode: "text/html",
  theme: "monokai",
  indentWithTabs: true,
  lineNumbers: true
  };

  // Loop over elements and apply
  for (var i=0; i<textareas.length; i++){
    // apply codemirror to textareas
    editor[i] = CodeMirror.fromTextArea(textareas[i], config);
    // Save the value of every codemirror to the textarea
    editor[i].on("change", function(codeMirror) {codeMirror.save()});
    // Trigger dispatch event on change - NOT WORKING
    // editor[i].on('change', tabs);
  }
};

// Dispatch event on textarea to trigger change - NEEDS WORK
function tabs(){
  var textareas = document.getElementsByTagName('textarea');
  var count = textareas.length;
  for(var i=0;i<count;i++){
      textareas[i].dispatchEvent(new Event('change'));
  }
}

// Firebase config - Use your firebase details
var config = {
  apiKey: "XXXXXX",
  authDomain: "xxxxxxxxx-c68cb.firebaseapp.com",
  databaseURL: "https://xxxxxxxxx-c68cb.firebaseio.com",
  projectId: "xxxxxxxxx-c68cb",
  storageBucket: "xxxxxxxxx-c68cb.appspot.com",
  messagingSenderId: "850923374759"
};

// Firebase intialise
firebase.initializeApp(config);

// Set compsFirebase firebase object
var compsFirebase = firebase.database().ref('/comps'); //.orderByChild('text');

// Watch for value changes on compsFirebase, set compList.comps property as the value
compsFirebase.on('value', function(snapshot) {
  compList.comps = snapshot.val();
  //console.log(snapshot.val());
});

// Create Vue component
var compList = new Vue({
  el: '#comp',
  data: {
    text: '',
    html: '',
    newComp:'',
    comps: []
  },
  // computed: {
  // },
  methods: {
    filterItems: function(comps) {
      console.log(comps.typeof);
      // return comps.filter(function(comp) {
      //   return comp;
      // })
    },
    // Push new post in to compsFirebase
    addComp: function() {
      compsFirebase.push({
        text: this.text
      })
      // clear field on submit
      this.text = '';
      // Apply codeMirror on new component
      setTimeout(function(){
        codeMirror("textarea:last-of-type");
      }, 500);
      tabs();
    },
    // Modal open and close 
    modalPop: function(key) {
      var modal = document.querySelector('#'+key+' .modal');
      modal.classList.add("show");
    },
    modalRemove: function(key) {
      var modal = document.querySelector('#'+key+' .modal');
      modal.classList.remove("show");
    },
    // Remove child based on key - firebase function
    removeComp: function(key) {
      compsFirebase.child(key).remove();
    },
    // Save code and title
    save: function(key) {
      console.log(key.text);
      var title = document.querySelector('#'+key+' .title').value;
      var val = document.querySelector('#'+key+' .editor').value;
      compsFirebase.child(key).update({
        text: title,
        html: val
      })
    }
  },
  mounted: function(){
    //console.log(this.comps);
  }
});

setTimeout(function(){
  codeMirror("textarea");
  tabs();
}, 500);

