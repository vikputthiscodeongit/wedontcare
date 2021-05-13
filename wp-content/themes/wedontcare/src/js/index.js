import debounce from "lodash/debounce";

import "../scss/style.scss";

(function() {
    // Helpers
    // Get a CSS property value
    function cssValue(el, prop) {
        const styles = window.getComputedStyle(el),
              value  = styles.getPropertyValue(prop);

        return value;
    }

    // Convert CSS pixels to a number
    function pxToNo(string) {
        if (string.indexOf("px") === -1)
            return;

        return Number(string.slice(0, -2));
    }


    //
    const htmlEl = document.querySelector("html"),
          mainEl = document.querySelector("main");


    // Event handlers
    document.addEventListener("DOMContentLoaded", function() {
        htmlEl.className = htmlEl.className.replace("no-js", "js");

        inputDeviceDetector();

        logo.init();
    });


    // Input devices
    function inputDeviceDetector() {
        document.body.addEventListener("mousedown", function() {
            document.body.classList.add("using-mouse");
        });

        document.body.addEventListener("keydown", function() {
            document.body.classList.remove("using-mouse");
        });
    }


    // Spinning logo
    let logo = {};

    logo.init = function() {
        if (!logo.el)
            return;

        logo.sizeFixer();

        window.addEventListener("resize", debounce(function() {
            logo.sizeFixer();
        }, 25));
    };

    logo.el = document.querySelector(".spinning-logo");

    logo.sizeFixer = function() {
        console.log("In logo.sizeFixer().");

        const contentEl = logo.el.parentElement;

        if (!contentEl)
            return;

        const mainWidth       = pxToNo(cssValue(mainEl, "width")),
              mainPaddingLeft = pxToNo(cssValue(mainEl, "padding-left"));
        // console.log(mainWidth);
        // console.log(mainPaddingLeft);

        const mainContentRowHeight = pxToNo(cssValue(mainEl, "grid-template-rows").split(" ")[1]);
        // console.log(mainContentRowHeight);

        const contentRowTopHeight = pxToNo(cssValue(contentEl, "grid-template-rows").split(" ")[0]),
              contentRowGap       = pxToNo(cssValue(contentEl, "grid-row-gap"));
        // console.log(contentRowTopHeight);
        // console.log(contentRowGap);

        const contentMaxWidth  = mainWidth - (mainPaddingLeft * 2),
              contentMaxHeight = mainContentRowHeight - (contentRowTopHeight * 2) - (contentRowGap * 2);
        // console.log("contentMaxWidth: " + contentMaxWidth);
        // console.log("contentMaxHeight: " + contentMaxHeight);

        const logoTargetWidth = Math.min(contentMaxWidth, contentMaxHeight) > 600
            ? 600
            : Math.min(contentMaxWidth, contentMaxHeight);
        console.log("logoTargetWidth: " + logoTargetWidth);

        logo.el.style.width = logoTargetWidth + "px";
    };
})();
