/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navigationBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBuilder = function() {

    let navigationMenu = '';
    let count = 1;

    for(let item of sections){
        const sectionID = item.id;
        const sectionDataNav = item.dataset.nav;

        navigationMenu += `<li><a class = 'menu__link' id = 'link${count}' href='#${sectionID}'>${sectionDataNav}</a></li>`;
        count += 1;
    }

    navigationBar.innerHTML = navigationMenu;
}

// Scroll to anchor ID using scrollTO event

const navigationLinks = document.getElementsByClassName('menu__link');

const scrollHandler = function() {
    for (let navLink of navigationLinks){
        navLink.addEventListener('click', function(event){
            event.preventDefault();
            let sectionID = navLink.getAttribute('href').slice(1);
            document.getElementById(sectionID).scrollIntoView({behavior:'smooth', inline:'center'});
        });
    }
}




/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBuilder();

// Scroll to section on link click
scrollHandler();

// Set sections as active



