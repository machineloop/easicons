(function() {
  window._classifySVGs = function() {
    var svgClassMap = {};
    // Select all previously injected svg tags
    var svgs = document.querySelectorAll('svg');
    // Loop through all svg tags on page
    for (var j = 0; j < svgs.length; j++) {
      var attrs = svgs[j].attributes;
      svgClassMap = {};
      // Find attributes on each svg to parse custom attribute values
      for (var i = 0; i < attrs.length; i++) {
        // Look for attributes that match 'data-easi-'
        if (attrs[i].nodeName.length > 5) {
          if (attrs[i].nodeName.substr(0,11) === 'data-easi-') {
            // Parse out classes and events contained in the SVG data attributes
            var eventsAndClass = attrs[i].nodeName.substr(11).split(':');
            if (eventsAndClass.length > 2) { console.log("You added too many dashes between the events and svg class you want to apply them to.") };
            var svgClass = eventsAndClass[0]; 
            var svgEvents = eventsAndClass[1];
            // Add array of [attribute values, events, and a reference to the node]
            svgClassMap[svgClass] = [attrs[i].value, svgEvents, attrs[i]];
          }
          if (attrs[i].nodeName.substr(0,6) === 'easi-') {
            var eventsAndClass = attrs[i].nodeName.substr(6).split(':');
            if (eventsAndClass.length > 2) { console.log("You added too many dashes between the events and svg class you want to apply them to.") };
            var svgClass = eventsAndClass[0]; 
            var svgEvents = eventsAndClass[1];
            console.log(svgEvents)
            if (svgEvents === undefined) { svgEvents = 'click.touch'; }
            svgClassMap[svgClass] = [attrs[i].value, svgEvents, attrs[i]];
          }
        }
      }

      // Add classes inside svg

      // Iterate through all the keys in the object
      for (var k = 0; k < Object.keys(svgClassMap).length; k++) {
        var currentKey = Object.keys(svgClassMap)[k]; // Select one key
        var svgMapValue = svgClassMap[currentKey]     // Select the value out for that key
        if (Array.isArray(svgMapValue)) {             // Make sure value is array
          var classes = svgMapValue[0].split(' ');    // Create array of classes
          var events = svgMapValue[1].split('.');     // Parse array of events
          var node = svgMapValue[2];                  // Grab the node reference
          // Select children of svg containing classes matching current key
          var g = svgs[j].querySelector('.'+currentKey);
          if (!g) { console.log('The' + currentKey + 'class not found within the SVG, use valid class!')}
          
          // TODO: Optimize to detect and customize for each browser
          // Add correct browser prefixes and event casing to each vendor
          var pfx = ["webkit", "moz", "MS", "o", ""];
          function PrefixedEvent(element, type, callback) {
            for (var p = 0; p < pfx.length; p++) {
              if (!pfx[p]) type = type;
              element.addEventListener(pfx[p]+type, callback);
              if (!pfx[p]) type = type.toLowerCase();
              element.addEventListener(pfx[p]+type, callback);
            }
          }

          // Add classes to the svg element's classList
          var applyClasses = function(classes, svgGroup) {
            var g = svgGroup;
            classes.forEach(function(value) {
              g.classList.add(value);
            });
          }

          // Remove classes to the svg element's classList
          var removeClasses = function(classes, svgGroup) {
            var g = svgGroup;
            classes.forEach(function(value) {
              g.classList.remove(value);
            });
          }

          // Bind arguments to functions to enable eventlister invokation
          boundApplyClasses = applyClasses.bind(this, classes, g);
          boundRemoveClasses = removeClasses.bind(this, classes, g);

          // Register 3 EventListeners for each event on each svg element
          events.forEach(function(jsEvent) {
            PrefixedEvent(svgs[j], jsEvent, boundApplyClasses);
            PrefixedEvent(svgs[j],'AnimationEnd', boundRemoveClasses);
            PrefixedEvent(svgs[j],'TransitionEnd', boundRemoveClasses);
          })
        }
      };

    } // End loop through SVGs
  }
 }())