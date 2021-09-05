/**
 * @author Enze Zhang
 * sidebar.js--JavaScript used on pages with long articles and a sidebar
 */

new Vue({
    el: '#sidebar',
    data: {
        articles: document.querySelectorAll('article>h1'),
        articleArray: document.getElementsByClassName('article'),
        canvasArray: document.getElementsByClassName('canvas'),
        itemArray: document.getElementsByClassName('side-item')
    },
    methods: {
        //Update the sidebar
        pageView: function (canvas, item, article) {
            let that = this;
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
                ctx.arc(20, 20, 10, that.d2a(-90), that.d2a(scale * 360 - 90), false)
                ctx.strokeStyle = '#397689';
                ctx.stroke();
            }
        },
        //Convert angles to degrees
        d2a: function (n) {
            return n * Math.PI / 180;
        },
    },
    mounted: function () {
        let that = this;
        let articleArray = that.articleArray;
        let itemArray = that.itemArray;
        let canvasArray = that.canvasArray;
        let articles = that.articles;
        window.addEventListener('load', function () {
            //Give an ID for each title of an article
            for (let i = 0; i < articleArray.length; i++) {
                articleArray[i].setAttribute('id', 'article' + (i + 1));
            }
            //Generate the scrolling effect of the sidebar
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
                that.$options.methods.pageView(canvasArray[i], itemArray[i], articleArray[i]);//Update
            }
        })


        window.onresize = window.onscroll = function () {
            //Respond changes when user scrolls or resizes
            for (let i = 0; i < canvasArray.length; i++) {
                that.$options.methods.pageView(canvasArray[i], itemArray[i], articleArray[i]);//Update
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
        };
    }
})
