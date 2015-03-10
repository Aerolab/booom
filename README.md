Booom - Dribbble Enhancement Suite
==================================


![Booom Screenshot](https://raw.githubusercontent.com/Aerolab/booom/master/screenshots/hero.png)


Booom is a Chrome Extension for Dribbble.com we developed at [Aerolab](https://aerolab.co), which adds multiple features that make life easier for designers. Features include:

* Bigger, High Resolution Shots in lists
* Like and Add to Bucket buttons in lists
* Infinite Scrolling
* GIFs autoplay in lists
* Shots always open in @2x
* Better support for bigger screens
* Better Add to Bucket UI


# Developing for the Extension

## Setting up the Environment

First of all, you need [Node.js](https://nodejs.org/) and [Sass](http://sass-lang.com/) installed on your system.
After that, go to the folder where you cloned this repo and run:

```npm install```

After you're done installing all the dependencies, go ahead and run:

```grunt build```

```grunt watch```

Now, every time you make a change on any file (js, css or manifest), you'll get a brand new distribution for both Chrome and Safari under the ./dist folder.


## Installing the extension

Assuming you set up your environment correctly, now it's time to install the extension so you can develop on it.

Go to [chrome://extensions/](chrome://extensions/), enable Developer Mode and click on Load Unpacked Extension. *Pick the dist/booom_chrome folder* and that's about it. The same process goes for Safari, but you'll need to sign up for an Apple Developer Key. 

You need to reload the extension after each change, or you can install any extension that reloads everything automatically.

The extension is standard HTML, JS and SASS built on top of [Dribbble](https://dribbble.com).
