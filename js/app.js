// Manipulating the DOM exercise.
// Exercise programmatically builds navigation,
// scrolls to anchors from navigation,
// and highlights section in viewport upon scrolling.
// Dependencies: None
// JS Version: ES2015/ES6
// JS Standard: ESlint

// Define Global Variables

const navigationBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// End Global Variables
// Start Helper Functions

// This function provides the criteria for the active section
const getActiveSection = function() {

    for(let section of sections){
        const sectionBounding = section.getBoundingClientRect();
        if (sectionBounding.top >= -500 && sectionBounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)){
            return section;
        }
    }
}

// End Helper Functions
// Begin Main Functions

// This function builds the navigator bar based on the sections present
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

// This function scrollIntoView event

// This function adds the smooth scroll feature
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

// Add class 'active' to button when pressed

// Add class 'active' to section while scrolling
const setSectionAsActive = function() {
    window.addEventListener('scroll', function (event) {
        let section = getActiveSection();
        //Added an empty statement for dead space that won't be highlihgted by the JS
        if(section === undefined){
            ;
        }
        else{//sets one section as active and removes active from other sections where applicable
            section.classList.add('your-active-class');
            for (let item of sections) {
                if (item.id != section.id && item.classList.contains('your-active-class')) {
                    item.classList.remove('your-active-class');
                }

            }
        }
    });
};



        // // set corresponding header style
        // const active = document.querySelector('li[data-nav="' + section.id + '"]');
        // active.classList.add('active__link');
        // // remove from other headers
        // const headers = document.querySelectorAll('.menu__link');
        // for (let item of headers) {
        //     console.log(item);
        //     if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
        //         item.classList.remove('active__link');
        //     }
        // };

// End Main Functions
// Begin Events 

// Build menu 
navBuilder();

// Scroll to section on link click
scrollHandler();

// Set sections as active
setSectionAsActive();


