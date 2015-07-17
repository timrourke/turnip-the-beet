# Turnip the Beet 

**General Assembly Web Development Immersive - Project 1**

*Turnip the Beet* is an organic farm located outside of Eugene, Oregon. They focus on growing heirloom and specialty vegetables and fruits, and operate a local CSA, providing excellent produce to customers in the Eugene metropolitan area.

## The site

As a new enterprise, Turnip the Beet lacks a branded, modern web presence. This project is an attempt to address this need with a responsive marketing site aimed at local consumers of high quality produce.

The client is familiar with WordPress as a platform, so this site has been built with PHP and a template structure that will easily migrate to a fully custom WordPress theme once design and development are complete.

## Key features

- Clean, modern responsive design with pleasing microinteractions
- AJAX contact form over SMTP transport
- Authored in Sass, PHP, and jQuery

## The details

To fulfill the requirements of our project, I have built this site to utilize the following development techniques:

- Markup written for maximum clarity and semantic value
- Styles authored in Sass, and organized into partials representing the component or element scope of each important aspect of the site
- JavaScript features include:
	- jQuery DOM manipulation for the navigation menu
	-	an API call to a weather service for up to date weather on the farm
	- an entirely original photo lightbox component
	- an entirely original implementation of scroll detection for animated scene wipes on the front page
- PHP features include:
	- markup partials separated into semantic chunks for developer convenience
	- Content-specific templates and functionality
	- a simple AJAX controller of [James Traver's](https://github.com/code-for-coffee/php_ajax_controller) design
	- an implementation of an email service over SMTP - [SwiftMailer](https://github.com/swiftmailer/swiftmailer)
	- a simple nonce-generating utility to prevent undesired email abuse - [Nonce Util](https://github.com/timostamm/NonceUtil-PHP)
	- encoding and manipulation of JSON data for iteration in templates
-Build tools include the use of Gulp for the following:
	- Automated responsive image generation for use with srcset
	- SVG icon generation

## Post mortem

While this project has acheived the baseline goals assigned to the class, there are several aspects of the site that present themselves as low-hanging fruit for improvement:

- Convert this project into a WordPress theme for easy integration into the client's current workflow
- Improve clarity of Sass partials for future proofing
- Build out expected functionality for enrollment in the CSA program, including e-commerce features
- Find an alternative weather API that will operate inexpensively over HTTPS/SSL
- Improve images lightbox functionality to allow swipe gestures on mobile and better performance overall

# Thanks!