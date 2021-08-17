/**
 * @author Enze Zhang
 * sidebar.js--JavaScript used on pages with long articles and a sidebar
 */

let articleArray = document.getElementsByClassName('article');
let canvasArray = new Array(articleArray.length);
let itemArray = new Array(articleArray.length);

/**
 * Give an ID for each title of an article
 */
function initArticles() {
    for (let i = 0; i < articleArray.length; i++) {
        articleArray[i].setAttribute('id', 'article' + (i + 1));
    }
}

/**
 * Convert angles to degrees
 * @param n An angle in radians
 * @returns {number} An angle in degrees
 */
function d2a(n) {
    return n * Math.PI / 180;
}

/**
 * Generate a sidebar with DOM
 */
function generateSidebar() {
    //Create the element with DOM on the page
    let body = document.getElementsByClassName('igem_column_wrapper')[0] || document.body;
    let mainText = document.getElementById('main-text');
    let div = document.createElement('div');
    div.setAttribute('id', 'sidebar');
    let titles = mainText.getElementsByTagName('h1');
    let table = document.createElement('table');
    let tableRow, tableData, canvas, a;
    for (let i = 0; i < titles.length; i++) {
        tableRow = document.createElement('tr');
        tableData = document.createElement('td');
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', '40');
        canvas.setAttribute('height', '40');
        canvas.setAttribute('class', 'canvas');
        tableData.appendChild(canvas);
        tableRow.appendChild(tableData);
        tableData = document.createElement('td');
        a = document.createElement('a');
        tableData.setAttribute('class', 'side-item');
        a.setAttribute('href', '#article' + (i + 1));
        a.innerHTML = titles[i].innerHTML;
        tableData.appendChild(a);
        tableRow.appendChild(tableData);
        table.appendChild(tableRow);
        canvasArray[i] = canvas;
        itemArray[i] = tableData;
    }
    div.appendChild(table);
    body.insertBefore(div, mainText);

    //Generate scrolling effect
    let navHeight = document.getElementById('nav-bar').offsetHeight;
    for (let i = 0; i < itemArray.length; i++) {
        itemArray[i].onclick = function () {
            scroll({
                top: articleArray[i].offsetTop - navHeight + 5,
                //To prevent the overshadow of the navigation bar
                left: 0,
                behavior: 'smooth'
            });
            return false;
        };
        //Click the items to scroll
        pageView(canvasArray[i], itemArray[i], articleArray[i]);//Update
    }
}

/**
 * Update the sidebar
 * @param canvas The circle in the sidebar
 * @param item The corresponding text
 * @param article The corresponding article
 */
function pageView(canvas, item, article) {
    let navH = document.getElementById('nav-bar').offsetHeight;

    //Something about an article
    let elementH = article.clientHeight;
    let currentH = document.documentElement.scrollTop || document.body.scrollTop;
    let elementT = article.offsetTop;
    let clientH = document.documentElement.clientHeight;

    //Calculate the reading progress
    let scale = (currentH - elementT + navH + 20) / elementH;/*看顶部*/
    // let scale = (currentH + clientH - elementT) / elementH;/*看底部*/

    //Change the styles when you start reading a new article
    if (scale >= 0 && scale <= 1) {
        item.setAttribute('class', 'side-item side-item-active');
    } else {
        item.setAttribute('class', 'side-item');
    }

    //Clear the canvas
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Foreground
    if (scale >= 0) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(20, 20, 10, d2a(-90), d2a(scale * 360 - 90), false)
        ctx.strokeStyle = '#397689';
        ctx.stroke();
    }
}

/**
 * Respond changes when user scrolls or resizes
 */
function respondChange() {
    for (let i = 0; i < canvasArray.length; i++) {
        pageView(canvasArray[i], itemArray[i], articleArray[i]);//Update
    }
    let textT = document.getElementById("main-text").offsetTop;
    let footerT = document.getElementById("footer").offsetTop;
    let sidebarH = document.getElementById("sidebar").clientHeight;
    let currentH = document.documentElement.scrollTop || document.body.scrollTop;
    let sidebar = document.getElementById("sidebar");
    let topScroll = document.getElementById("top-scroll");
    if (currentH > textT - 130 && currentH + sidebarH < footerT - 130) {
        sidebar.setAttribute("class", "sidebar-active");
        topScroll.setAttribute("class", "top-scroll-active");
    } else {
        sidebar.setAttribute("class", "");
        topScroll.setAttribute("class", "");
    }
}