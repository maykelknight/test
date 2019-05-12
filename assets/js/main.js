var navLinks = document.querySelectorAll(".nav-btn a");
var sections = document.querySelectorAll("section");
var navWrapper = document.getElementsByClassName("nav-wrapper")[0];

window.onload = function() {
    addClickEventsToNavbarLinks();
    hideNavigationMenuOnLinkClick();
    showNavigationMenuOnHamburgerClicked();
};

window.addEventListener("scroll", throttle(function () {
    setNavbarClass();
    markActiveNavbarLink();
}, 100));

function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

function setNavbarClass () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navWrapper.classList.add('nav-scrolled');
    } else {
        navWrapper.classList.remove('nav-scrolled');
    }
}

function smoothScroll (sectionTarget, duration) {

    var target = document.querySelector(sectionTarget);
    var targetPosition = target.getBoundingClientRect().top + window.scrollY - 40;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation (currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = easeAnimate(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
        markActiveNavbarLink();
    }

    requestAnimationFrame(animation);
}

function easeAnimate (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function markActiveNavbarLink () {
    let fromTop = window.scrollY;
    navLinks.forEach(function (link) {
        let section = document.querySelector(link.hash);
        if ((section.offsetTop - 60 <= fromTop) && (section.offsetTop - 60 + section.offsetHeight > fromTop)) {
            link.classList.add("current");
        } else {
            link.classList.remove("current");
        }
    });
}

function addClickEventsToNavbarLinks () {
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            smoothScroll(link.hash, 200)
        })
    });
}

function hideNavigationMenuOnLinkClick () {
    document.querySelectorAll('.nav-btn > a')
        .forEach(function (item) {
            item.addEventListener('click', function () {
                document.querySelector(".hamburger-checkbox").checked = false;
            })
        });
}

function showNavigationMenuOnHamburgerClicked () {
    document.querySelector('.hamburger-toggle').addEventListener('click', function () {
        var isChecked = document.querySelector(".hamburger-checkbox").checked;
        document.querySelector(".hamburger-checkbox").checked = !!isChecked;
    })
}
