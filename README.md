Explore Uttarakhand

Final Web Development Project

Explore Uttarakhand is a responsive tourism website created as my final project for the 6-week web development internship. The project was developed to apply the concepts I learned in HTML, CSS, JavaScript, Git, and GitHub while creating a simple and interactive tourism website.

Project Objective

The main objective of this project is to provide users with a simple way to explore Uttarakhand and discover popular tourist destinations. The website focuses on responsive design, easy navigation, useful destination information, and meaningful JavaScript interactivity.

Project Overview

The website contains five main pages:

Home provides an introduction to Uttarakhand and the website.
About provides information about Uttarakhand.
Places contains tourist destinations and interactive features.
Gallery displays images from different locations.
Contact contains a contact form with validation.

The Places page is the main interactive section of the website. Destination information is stored in JavaScript using an array of objects and is displayed dynamically on the page.

Users can search for destinations using the search bar. The search can match the destination name, location, or activity. A location filter is also available to narrow down the results.

The website includes a location-based recommendation feature. Recommendations are connected to their selected location so that users receive relevant tourist places instead of unrelated destinations. For example, selecting Dehradun can recommend local attractions such as Tapkeshwar Mahadev Temple, Robber's Cave (Gucchupani), Maldevta, and Sahastradhara.

Users can save and remove destinations from their favourites. Favourite places are stored using browser localStorage, so the saved information remains after refreshing the page.

The Gallery page includes an interactive lightbox for viewing images. The Contact page includes JavaScript form validation, including email validation, error messages, and a success message after valid submission. A back-to-top button and smooth scrolling are also included to improve navigation.

Technologies Used

HTML5
Semantic HTML
CSS3
Box Model
Flexbox
CSS Grid
Media Queries
JavaScript
Functions
Arrays
Objects
DOM Manipulation
Event Handling
Form Validation
localStorage
Git
GitHub
GitHub Pages
Main Features

The main features of the website include responsive design for desktop, tablet, and mobile devices, multi-page navigation, tourist destination information, search and filtering, city-specific tourist recommendations, dynamic destination content, favourite destinations, localStorage support, an interactive gallery lightbox, contact form validation, a success message, a back-to-top button, smooth scrolling, and a mobile-friendly layout.

JavaScript Functionality

JavaScript is used throughout the website to make the project interactive.

The Places page uses an array of destination objects to store information about tourist places. JavaScript functions are used to search and filter destinations, generate content dynamically, update result counts, and recommend places based on the selected location.

Event listeners are used for search input, location filtering, buttons, favourite actions, gallery interaction, form submission, keyboard actions, and scrolling.

The project also uses localStorage to save favourite destinations in the user's browser.

This demonstrates the use of:

Functions, Arrays, Objects, DOM Manipulation, Dynamic Content, Events, Search, Filtering, Form Validation, Browser Storage, and Interactive Buttons.

Project Structure

The project is organised into separate HTML, CSS, JavaScript, image, and screenshot folders. The main files are the five HTML pages, style.css, script.js, the image assets, screenshots, .gitignore, and README.md.

Git & Version Control

Git was used throughout the development of the project to track changes and maintain the project history.

Some of the Git commands used include:

git init
git status
git add .
git commit
git log
git push origin main

Meaningful commit messages were used while developing and improving the website.

GitHub Repository

https://github.com/aadi-devlog/explore-uttarakhand

Live Website

https://aadi-devlog.github.io/explore-uttarakhand/

Website Screenshots

Screenshots of the completed project are included in the screenshots folder of the repository. They show the main pages and important features of the website.

Challenges Faced

One of the main challenges was making the website responsive while keeping the layout consistent on desktop, tablet, and mobile devices.

Another challenge was implementing JavaScript functionality without affecting the other pages. Since the same JavaScript file is used across different pages, the code had to be written carefully so that page-specific features only run when the required elements are available.

Handling the destination data was another challenge. The search and recommendation features needed accurate location information so that a destination from one city was not incorrectly shown as belonging to another city.

Using Git and GitHub during development was also a learning experience, especially when managing commits, checking the project status, and pushing changes to the repository.

Solutions Implemented

CSS Grid and Flexbox were used to create flexible layouts, while media queries were added to adjust the design for different screen sizes.

For JavaScript, the destination information was organised using arrays and objects. Functions, event listeners, and DOM manipulation were used to create the search, filter, recommendation, favourite, gallery, and form-validation features.

The recommendation system was organised according to location so that tourist places are suggested from the correct city.

The website was tested after making changes to identify errors and make sure the pages and interactive features continued to work correctly.

Key Learnings

This project helped me understand how HTML, CSS, and JavaScript work together to create a complete website.

I improved my practical knowledge of semantic HTML, CSS styling, Box Model, Flexbox, Grid, media queries, JavaScript functions, arrays, objects, DOM manipulation, event handling, form validation, localStorage, and responsive design.

I also learned how to use Git and GitHub for version control, maintain a proper project structure, debug problems, test a website, and deploy a project using GitHub Pages.

Future Improvements

In the future, I would like to add interactive maps, weather information, more detailed destination pages, tourist reviews, travel itinerary planning, and backend/database support for saving complete travel plans.

Additional features such as user accounts, trip planning, and more destination information could also make the website more useful.

Author

Aadi Devlog

Project: Explore Uttarakhand

GitHub Repository:
https://github.com/aadi-devlog/explore-uttarakhand

Live Website:
https://aadi-devlog.github.io/explore-uttarakhand/
