/**
 * @author Enze Zhang
 * general.js--JavaScript used on all pages
 */

/**
 * Initialise
 */
function init() {
    checkBrowser();
    setTopScroll();
    setNav();
}

/**
 * Give a hint to user who uses IE
 */
function checkBrowser() {
    if (navigator.userAgent.indexOf('Trident') !== -1) {
        let mainText = document.getElementById('main-text');
        let hint = document.createElement('div');
        hint.setAttribute('class', 'alert alert-warning');
        hint.innerHTML = 'For your better experience, please use Chrome or Firefox browser.';
        document.body.insertBefore(hint, mainText);
    }
}

/**
 * Implement the function of top-scroll button
 */
function setTopScroll() {
    let f = function () {
        let textT = document.getElementById("main-text").offsetTop;
        let footerT = document.getElementById("footer").offsetTop;
        let sidebarH = document.getElementById("sidebar").clientHeight;
        let currentH = document.documentElement.scrollTop || document.body.scrollTop;
        let topScroll = document.getElementById("top-scroll");
        if (currentH > textT - 130 && currentH + sidebarH < footerT - 130) {
            topScroll.setAttribute("class", "top-scroll-active");
        } else {
            topScroll.setAttribute("class", "");
        }
    }
    window.addEventListener('resize', f);
    window.addEventListener('scroll', f);
    let ts = document.getElementById('top-scroll').childNodes[1];
    ts.addEventListener('click', function () {
        scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Set the top of the navigation bar
 */
function setNav() {
    let igemNav = document.getElementById('top_menu_14');
    let h = '0';
    if (igemNav)
        h = igemNav.offsetHeight + 'px';
    document.getElementById('nav-bar').style.top = h;
}
