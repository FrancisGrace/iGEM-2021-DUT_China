/**
 * @author Enze Zhang
 * sidebar.js--JavaScript used on pages with long articles and a sidebar
 */

new Vue({
    el: '#sidebar',
    data: {
        isActive: false,
        articles: document.querySelectorAll('article>h1,article>h2.marked'),
        articleArray: document.getElementsByClassName('article'),
        canvasArray: document.getElementsByClassName('canvas'),
        itemArray: document.getElementsByClassName('side-item'),
        itemActive: []
    },
    methods: {
        //Update the sidebar
        pageView: function (canvas, index, article) {
            let navH = document.getElementById('nav-bar').offsetHeight;
            // console.log(this.itemActive);
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
                this.$set(this.itemActive, index, true);
            } else {
                this.$set(this.itemActive, index, false);
            }

            //Clear the canvas
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //Foreground
            if (scale >= 0) {
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(20, 20, 10, this.d2a(-90), this.d2a(scale * 360 - 90), false)
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
        //Initialise itemActive
        for (let i = 0; i < that.itemArray.length; i++)
            that.itemActive.push(false);
        window.addEventListener('load', function () {
            //Give an ID for each title of an article
            for (let i = 0; i < that.articleArray.length; i++) {
                that.articleArray[i].setAttribute('id', 'article' + (i + 1));
            }
            //Generate the scrolling effect of the sidebar
            let navHeight = document.getElementById('nav-bar').offsetHeight;
            for (let i = 0; i < that.itemArray.length; i++) {
                that.itemArray[i].onclick = function () {
                    scroll({
                        top: that.articleArray[i].offsetTop - navHeight + 5,
                        //To prevent the overshadow of the navigation bar
                        left: 0,
                        behavior: 'smooth'
                    });
                    return false;
                };
                //Click the items to scroll
                that.pageView(that.canvasArray[i], i, that.articleArray[i]);//Update
            }
        })

        let f = function () {
            //Respond changes when user scrolls or resizes
            for (let i = 0; i < that.canvasArray.length; i++) {
                that.pageView(that.canvasArray[i], i, that.articleArray[i]);//Update
            }
            let textT = document.getElementById("main-text").offsetTop;
            let footerT = document.getElementById("footer-point").offsetTop;
            let sidebarH = document.getElementById("sidebar").clientHeight;
            let currentH = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentH > textT - 130 && currentH + sidebarH < footerT - 130)
                that.isActive = true;
            else
                that.isActive = false;
        };

        window.addEventListener('resize', f);
        window.addEventListener('scroll', f);
    }
})
