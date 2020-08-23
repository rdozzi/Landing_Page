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
const navigationLinks = document.getElementsByClassName('menu__link');

// End Global Variables
// Start Helper Functions

// This function provides the criteria for the active section. The if statements are desitned to accommodate
// different window widths
const getActiveSection = function() {

    for(let section of sections){
        const sectionBounding = section.getBoundingClientRect();
        if(window.innerwidth >= 550){
            if (sectionBounding.top >= -500 &&
                sectionBounding.left >= 0 &&
                sectionBounding.bottom - 50 <= (window.innerHeight || document.documentElement.clientHeight) &&
                sectionBounding.right <= (window.innerWidth || document.documentElement.clientHeight)){
                return section;
            }
        }else if (window.innerWidth >= 400 && window.innerWidth < 550){
            if(sectionBounding.top >= -350 &&
                sectionBounding.left >= 0 &&
                sectionBounding.bottom - 310 <= (window.innerHeight || document.documentElement.clientHeight) &&
                sectionBounding.right <= (window.innerWidth || document.documentElement.clientHeight)){
                return section;
            }
        }else{
            if(sectionBounding.top >= -200 &&
                sectionBounding.left >= 0 &&
                sectionBounding.bottom - 550 <= (window.innerHeight || document.documentElement.clientHeight) &&
                sectionBounding.right <= (window.innerWidth || document.documentElement.clientHeight)){
                return section;
            }
        }
    }
    
}

// Function that executes when the "Return to Top" button is pushed
const goToTop = function (){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
    
}

// Function that controls the button's appearance to appear after a specified number of pixels
const scrollFunction = function() {
    button = document.getElementById('myButton');

    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        button.style.display = 'block';
    }else{
        button.style.display = 'none';
    }
}

// End Helper Functions
// Begin Main Functions

// This function builds the navigator bar based on the sections present
const navBuilder = function() {    
    let navigationMenu = '';

    for(let section of sections){
        const sectionID = section.id;
        const sectionDataNav = section.dataset.nav;

        navigationMenu += `<li><a class = 'menu__link' href='#${sectionID}'>${sectionDataNav}</a></li>`;
    }

    navigationBar.innerHTML = navigationMenu;
}

// This function adds the smooth scroll feature
const scrollHandler = function() {
    for (let navLink of navigationLinks){
        navLink.addEventListener('click', function(event){
            event.preventDefault();
            let sectionID = navLink.getAttribute('href').slice(1);
            document.getElementById(sectionID).scrollIntoView({behavior:'smooth', inline:'center'});
        });
    }
}

// Add class 'active' to section while scrolling
const setSectionAsActive = function() {
    window.addEventListener('scroll', function (event) {
        let section = getActiveSection();
        //Added an empty statement for dead space to remove errors in console
        if(section === undefined){
            ;
        }
        //Sets one section as active and removes active from other sections where applicable
        else{
            section.classList.add('your-active-class');
            for (let item of sections) {
                if (item.id != section.id && item.classList.contains('your-active-class')) {
                    item.classList.remove('your-active-class');
                }

            }

        // Add Active Class to Button with scroll; compare the navLink href to the relevant attributes of the section
            let sectionRef = `${section.baseURI}#${section.id}`;
            for (let navLink of navigationLinks){
                if(navLink.href === sectionRef){
                    navLink.classList.add('active');
                }
                else{
                    navLink.classList.remove('active');
                }
            }
        }
    });
};

// Main function for generating the navigation button in the top right-hand corner
const generateButton = function () {
    let button = document.createElement('Button');
    window.onscroll = function() {scrollFunction()}

    button.innerHTML = 'Return to Top';
    button.setAttribute('id','myButton');
    button.setAttribute('onclick','goToTop()');
    button.style='top:16px;right:1%;position:fixed;z-index:6;border-radius:6px;\
    font-family:Merriweather,serif;font-size:15px;display:none';

    document.body.appendChild(button);
}

// End Main Functions
// Begin Events 

// Build menu 
navBuilder();

// Scroll to section on link click
scrollHandler();

// Set sections as active
setSectionAsActive();

// Generates the "Return to Top" button
generateButton();
