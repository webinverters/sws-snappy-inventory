## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)

## Purpose

- Update product prices


- Set products on sale
- Organize products into different categories
- Move products into different stores.

- Mark products as "sold out"
- Mark products as "discontinued"
- Mark products as "online only"
- Mark products as "wait list"


## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

1. Clone the repository.
2. Install the NodeJS dependencies: `sudo npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.  -- you will probably have to copy rdash-ui repo from github since bower installs it incorrectly and you get errors on this step.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on [http://localhost:8888](http://localhost:8888).

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)