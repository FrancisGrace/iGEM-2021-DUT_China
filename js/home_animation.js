new Vue({
    el: '#try',

    data() {
        return {
            styleObject:
                {
                    width: '100px',
                    display: 'block',
                    transform: ' matrix(0.01, 0, 0, 0.01, 300, 200)',
                    position: 'absolute',
                    zindex: 2,
                    float: 'right',
                    top: 0
                }

        }
    },
    mounted: function () {
        let that = this;
        let f = function () {
            let x_curr = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(x_curr);
            let y_curr = document.documentElement.scrollWidth || document.body.scrollWidth;
            let x_tot = document.documentElement.scrollHeight || document.body.scrollHeight;
            let x_scr = document.documentElement.clientHeight || document.body.clientHeight;
            let x_bg = document.getElementById("wall").scrollHeight
            let x_footer = document.getElementById("footer").scrollHeight
            let x_det = (x_tot / (x_tot - x_scr) * x_curr)
            let y_det = 0.4 * y_curr + (0.25 * y_curr * Math.sin(3.7 * (x_det / y_curr) + 0.5 * Math.PI))
            let theta = Math.PI - Math.atan(0.25 * 3.7 * Math.cos(3.7 * (x_det / y_curr) + 0.5 * Math.PI))
            if ((x_curr + x_bg > x_tot) && (x_curr / (x_bg - 100)) < 0.95) {
                that.styleObject.transform = ' matrix('
                    + (2 * (Math.cos(theta))).toString() + ','
                    + (2 * Math.sin(theta)).toString() + ','
                    + (-2 * Math.sin(theta)).toString() + ','
                    + (2 * (Math.cos(theta))).toString() + ','
                    + y_det.toString() + ','
                    + x_det.toString()
                    + ')'
            }


            // //Respond changes when user scrolls or resizes
            // let textT = document.getElementById("main-text").offsetTop;
            // let footerT = document.getElementById("footer").offsetTop;
            // let sidebarH = document.getElementById("sidebar").clientHeight;
            // let currentH = document.documentElement.scrollTop || document.body.scrollTop;
            // if (currentH > textT - 130 && currentH + sidebarH < footerT - 130)
            //     that.isActive = true;
            // else
            //     that.isActive = false;
        };

        window.addEventListener('resize', f);
        window.addEventListener('scroll', f);
    }
})
