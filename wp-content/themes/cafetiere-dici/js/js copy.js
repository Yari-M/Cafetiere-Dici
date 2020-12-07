document.onreadystatechange = function () {

    if (document.readyState === 'complete') {

        // Set up the media queries to test on
        var mediaQueryDesktop = window.matchMedia('(min-width: 768px)');
        var mediaQueryMobile = window.matchMedia('(max-width: 767px)');
        var headerMediaQuery = window.matchMedia('(max-width: 501px)');
        var maxWidth400px = window.matchMedia('(max-width: 400px)');

        // Select the primary menu
        var menu = document.getElementById('menu-hoofdmenu');

        /**
         * Make the CSS counter appear on top of the title
         * Screen width: 400px and smaller
        */
        if (maxWidth400px.matches) {
            var h3 = document.querySelectorAll("div.proces-uitleg>h3");

            if (h3.length) {
                for (var i = 0; i < h3.length; i++) {
                    var pseudoHeight = parseInt(getComputedStyle(h3[i], '::before').height, 10);
                    var h3Height = parseInt(getComputedStyle(h3[i]).getPropertyValue('margin-top'), 10);

                    // Count both heights together, and add them to the margin-top of the title
                    var pseudoFinalHeight = pseudoHeight + h3Height;
                    h3[i].style.marginTop = pseudoFinalHeight + "px";
                }
            }
        }

        if (mediaQueryDesktop.matches) {

            var koffieContent = document.querySelectorAll('.koffieproducerende-landen .pure-u-md-11-24');
            var koffieRow = document.querySelectorAll('.koffieproducerende-landen');

            if (koffieRow.length) {
                var i, x, result, difference, margin, marginHalf;
                var rowHeight = [];
                var contentHeight = [];
                var margins = [];
                var marginPairs = [];
                var count = [];
                var marginBottom = [];

                koffieRow.forEach(function (currentValue, currentIndex) {
                    rowHeight.push(koffieRow[currentIndex].clientHeight);
                });

                koffieContent.forEach(function (currentValue, currentIndex) {
                    contentHeight.push(koffieContent[currentIndex].clientHeight);
                });

                for (i = 0; i < koffieRow.length; i++) {
                    difference = ([rowHeight[i]] - contentHeight[i]) / 2;
                    difference = Math.abs(difference);
                    margins.push(difference + 20);

                    marginPairs = margins.reduce(function (acc, value, index, array) {
                        if (index % 1 === 0) {
                            acc.push(array.slice(index, index + 2));
                        }
                        return acc;
                    }, []);
                }

                for (i = 0; i < marginPairs.length; i++) {
                    marginBottom.push(marginPairs[i][0] + marginPairs[i][1]);
                }


                for (i = 0; i < koffieRow.length; i++) {

                    if (isNaN(marginBottom[i])) {
                        marginBottom.splice(marginBottom.indexOf(marginBottom[i]), 0, marginBottom[i - 1]);
                        marginBottom.splice(-1, 1);
                    }
                    if (koffieRow[i] === koffieRow[0]) {
                        // First row only
                        koffieRow[i].style.marginTop = margins[i] + "px";
                        koffieRow[i].style.marginBottom = marginBottom[i] + "px";

                    } else if (koffieRow[i] == koffieRow[koffieRow.length - 1]) {

                        // Last row only
                        console.log(koffieRow[i])
                        koffieRow[i].style.marginBottom = marginBottom[i] / 2 + "px";

                    } else {
                        koffieRow[i].style.marginBottom = marginBottom[i] + "px";
                    }
                }
            }

            /**
             * Set height of header according to height of menu
             */

            // Retrieve necessary information
            var headerImageDOM = document.querySelector('#header-image');
            var headerVideoDOM = document.querySelector('.video-home');
            var videoElementDOM = document.querySelector('video#header');

            var navDOM = document.querySelector('nav.pure-u-1.pure-u-md-6-24');
            var navDOMHeight = navDOM.offsetHeight + 'px';


            // Set the height on the element
            if (headerVideoDOM) {
                headerVideoDOM.setAttribute('style', 'height: " ' + navDOMHeight.trim() + '"');
                headerVideoDOM.style.height = navDOMHeight;

                // Only apply height on video element if browser is NOT ie.
                // Reason: breaks polyfill
                !if_ie() ? videoElementDOM.style.height = navDOMHeight : '';
            } else {
                headerImageDOM.setAttribute('style', 'height: " ' + navDOMHeight + '"');
                headerImageDOM.style.height = navDOMHeight;
            }

        }

        if (headerMediaQuery.matches) {

            var element = document.querySelector('.follow-us');
            element.remove();

            var colCaffeLate = document.querySelector('.caffe-latte-c');
            var colFollowUs = document.querySelector('.social-media');
            var topBar = document.querySelector('header > .top-bar');

            colCaffeLate.setAttribute('class', 'pure-u-1 pure-u-md-12-24 caffe-latte-c');
            colFollowUs.setAttribute('class', 'pure-u-1 pure-u-md-12-24 social-media');
            topBar.style.display = "flex";
            topBar.style.justifyContent = "space-between";
        }

        if (mediaQueryMobile.matches) {

           


            var menuBtn = document.getElementById('menu-btn');

            menu.classList.add('hidden');
            menu.classList.add('visually_hidden');

            menuBtn.addEventListener('click', function (e) {
                e.preventDefault();

                if (menu.classList.contains('hidden')) {
                    menu.classList.remove('hidden');
                    setTimeout(function () {
                        menu.classList.remove('visually_hidden');
                    }, 20);
                } else {
                    menu.classList.add('visually_hidden');
                    menu.addEventListener('transitionend', function (e) {
                        menu.classList.add('hidden');
                    }, {
                        capture: false,
                        once: true,
                        passive: false
                    });
                }
            }, false);

            // Remove polyfill if screen is smaller than 767px
            // Reason: video collapses into menu
            // if (if_ie()) {
            //     document.querySelector('video#header').removeAttribute('style');
            // }

        /**
         * Mobile menu section
         */


        var menuOpen = false;
        var lastSubmenu;
        var children
        var lastCurrent;

        menu.addEventListener('click', function (e) {
            // e.preventDefault();

            var current = e.target;
            var ul = current.nextElementSibling;

            if (ul && current.tagName === "A") {

                /**
                 * var: children
                 * 
                 * If the variable has a value, it means that a menu has been opened before.
                 * Therefore, run the if statement, and place the children back for future usage.
                 */
                if (children) {

                    placeItemsBack();
                }

                children = ul.children;

                // Convert to array
                // Used as a for in loop for compatiblity in older browsers
                children = toArray(children);
                
                // Set a class on all items
                children.map(function (item) {
                    item.classList.add('dropdown_bg');
                });

                // Get parent <ul> element of children
                var parent = e.target.closest('.pure-menu-has-children');

                // Insert the items at the specified place
                openSubMenu();

                // Give signal that menu is open
                menuOpen = true;
                lastSubmenu = current.nextElementSibling;
                lastCurrent = current;
                console.warn("Menu open");

            } else {

                menuOpen = false;

                closeSubMenu();

                console.warn("Menu closed");

                return;
            }

            function toArray(nodeList) {
                var arr = [];
                for (let i = 0; i < nodeList.length; i ++) {
                    arr.push(nodeList[i]);
                }

                return arr;
            }

            function placeItemsBack() {

                for (let i = 0; i < children.length; i++) {
                    lastSubmenu.appendChild(children[i]);
                }
            }

            function openSubMenu() {

                for (let i = children.length - 1; i >= 0; i--) {
                    current.parentNode.parentNode.insertBefore(children[i], parent.nextSibling);
                }
                // for (let item of children) {
                //     current.parentNode.parentNode.insertBefore(item, parent.nextSibling);
                // }
            }

            function closeSubMenu() {
                // console.log(children)
                var primaryMenu = document.getElementById('menu-hoofdmenu');
                // var primaryMenuChildren = primaryMenu.children;

                if (typeof children != 'undefined') {

                    if (primaryMenu.hasChildNodes) {

                        for (let i = 0; i < children.length; i++) {
                            let item = children[i];
                            if (primaryMenu.contains(item)) {
                                primaryMenu.removeChild(item);
                            }
                        }
                        // for (let child_item of children) {

                        //     if (primaryMenu.contains(child_item)) {
                        //         primaryMenu.removeChild(child_item);
                        //     }

                        // }
                    }
                }
            }

        }, true);
        };

    }

    /**
     * Update copyright year automatically
     * Location: footer
     */
    var d = new Date();
    var currentYear = d.getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
}

/**
 * jQuery Colorbox plugin for images
 */
jQuery(document).ready(function () {

    (function ($) {

        $('a.img-anchor').colorbox();

        var cbSettings = {
            width: '95%',
            height: 'auto',
            maxWidth: '660',
            maxHeight: 'auto',
            xhrError: 'Oeps, het lijkt erop dat deze content niet geladen kan worden. Probeer het later opnieuw.',
            imgError: 'Oeps, het lijkt erop dat de afbeelding niet geladen kan worden. Probeer het later opnieuw.',
            onOpen: function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                window.onscroll = function () {
                    window.scrollTo(scrollLeft, scrollTop);
                }
            },
            onClosed: function () {
                window.onscroll = function () {};
            },
            title: function () {
                return $(this).find('img').attr('alt');
            }
        };

        $('.img-anchor[href$=".jpg"],' +
            '.img-anchor[href$=".jpeg"],' +
            '.img-anchor[href$=".png"],' +
            '.img-anchor[href$=".gif"]').colorbox(cbSettings);

        //Keep lightbox responsive on screen resize
        $(window).on('resize', function () {
            $.colorbox.resize({
                width: window.innerWidth > parseInt(cbSettings.maxWidth) ? cbSettings.maxWidth : cbSettings.width
            })
        });

    })(jQuery);

    // jQuery(document).on('cbox_open', function() {
    //     jQuery('html').css({ overflow: 'hidden' });
    // }).bind('cbox_closed', function() {
    //     jQuery('html').css({ overflow: 'auto' });
    // });
});

function if_ie() {
    let result;
    /rv:11.0/i.test(navigator.userAgent) ? result = true : result = false;
    return result;
}


/**
 * Polyfill for the closest function
 * Browser: IE
 **/

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}

/**
 * Polyfill for the childNode.remove function
 * Browser: IE
 */

(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode === null) {
                    return;
                }
                this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

/***
 * Polyfill for NodeList.prototype.forEach
 * Browser: IE
 */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
