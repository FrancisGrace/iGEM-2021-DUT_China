/**
 * @author Enze Zhang
 * general.js--JavaScript used on all pages
 */

/**
 * Give a hint to user who uses IE
 */
function checkBrowser() {
    if (navigator.userAgent.indexOf('Trident') !== -1) {
        let mainText = document.getElementById('main-text');
        let hint = document.createElement('div');
        hint.setAttribute('class','alert alert-warning');
        hint.innerHTML = 'For your better experience, please use Chrome or Firefox browser.';
        document.body.insertBefore(hint, mainText);
    }
}

/**
 * Implement the function of top-scroll button
 */
function setTopScroll() {
    var ts = document.getElementById('top-scroll').childNodes[1];
    ts.addEventListener('click', function () {
        scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}