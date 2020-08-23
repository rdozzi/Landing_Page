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

const goToTop = function (){
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
}

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

    for(let item of sections){
        const sectionID = item.id;
        const sectionDataNav = item.dataset.nav;

        navigationMenu += `<li><a class = 'menu__link' href='#${sectionID}'>${sectionDataNav}</a></li>`;
    }

    navigationBar.innerHTML = navigationMenu;
}

// This function adds the smooth scroll feature
const scrollHandler = function() {
    const navigationLinks = document.getElementsByClassName('menu__link');
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
        //sets one section as active and removes active from other sections where applicable
        else{
            section.classList.add('your-active-class');
            for (let item of sections) {
                if (item.id != section.id && item.classList.contains('your-active-class')) {
                    item.classList.remove('your-active-class');
                }

            }

            // Add Active Class to Button with scroll; compare the navLink href to the relevant attributes of the section
            const navigationLinks = document.getElementsByClassName('menu__link');
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

const generateButton = function () {
    let button = document.createElement('Button');
    button.innerHTML = 'Return to Top';
    button.setAttribute('id','myButton');
    button.setAttribute('onclick','goToTop()');
    button.style ='top:21px;right:1%;position:fixed;z-index:6;border-radius:6px;\
    font-family:Merriweather,serif;font-size:15px;'
    window.onscroll = function() {scrollFunction()}
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
