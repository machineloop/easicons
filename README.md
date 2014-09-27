Easicon
=======
A 100% theme-able, 100% animate-able SVG vector icon library.
Please star me!

<a href="http://en.bloggif.com/" title="Photo Editing"><img src="http://data.bloggif.com/distant/user/store/0/2/f/e/320b60d923e921cf52d0ef98a921ef20.gif" alt="Mounting created Bloggif" width="400" height="411" /></a>


All the files referenced below must be located in the project root.

Run these three commands in the project root to initialize all the necessary dependencies:

```bash
npm install
gulp svgMin
gulp svg2png
```


Add these CSS references at the top of your index file or take a look at the example index.html in the repo:
```html
<link rel="stylesheet" href="magic.min.css">
<link rel="stylesheet" type="text/css" href="animate.css">
<link rel="stylesheet" type="text/css" href="styles.css">
```

Add an image tag as follows. Make sure to include 'inject-me' as a class on the image. This exact snippet should load the JS icon out of the correct directory.
```html
<img class="inject-me" facon-box="animated flipInX" facon-S:mouseover="animated bounceOutLeft" facon-j:mouseover="animated fadeInLeftBig" src="./dist/facons/svgs/js3.svg">
```

Add the following script references at the bottom of your index page to bootstrap the svg files and add the animation event listeners.
```javascript
<script src="svg-injector.js"></script>
<script src="classifySVGs.js"></script>
<!-- <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> -->
<script>
  // Elements to inject
  var mySVGsToInject = document.querySelectorAll('img.inject-me');
  // Do the injection
  SVGInjector(mySVGsToInject);
</script>
```

Enjoy! Let me know if you have any questions / comments! [andrew@brassington.io](mailto:andrew@brassington.io)

