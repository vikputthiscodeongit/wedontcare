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
    function pxStrToNo(string) {
        if (string.indexOf("px") === -1)
            return;

        return Number(string.slice(0, -2));
    }


    //
    const mainEl = document.querySelector("main");


    // Event handlers
    document.addEventListener("DOMContentLoaded", function() {
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

        const mainWidthVal       = cssValue(mainEl, "width"),
              mainPaddingLeftVal = cssValue(mainEl, "padding-left");

        const mainWidth       = pxStrToNo(mainWidthVal),
              mainPaddingLeft = pxStrToNo(mainPaddingLeftVal);
        // console.log(mainWidth);
        // console.log(mainPaddingLeft);

        const mainRowsVal = cssValue(mainEl, "grid-template-rows");
        console.log(mainRowsVal);

        const mainContentRowHeight = pxStrToNo(mainRowsVal.split(" ")[1]);
        // console.log(mainContentRowHeight);

        const contentRowsVal    = cssValue(contentEl, "grid-template-rows"),
              contentRowGapVal  = cssValue(contentEl, "grid-row-gap");

        const contentRowTopHeight = pxStrToNo(contentRowsVal.split(" ")[0]),
              contentRowGapHeight = pxStrToNo(contentRowGapVal);
        // console.log(contentRowTopHeight);
        // console.log(contentRowGapHeight);

        const contentMaxWidth  = mainWidth - (mainPaddingLeft * 2),
              contentMaxHeight = mainContentRowHeight - (contentRowTopHeight * 2) - (contentRowGapHeight * 2);
        // console.log("contentMaxWidth: " + contentMaxWidth);
        // console.log("contentMaxHeight: " + contentMaxHeight);

        const logoTargetWidth = Math.min(contentMaxWidth, contentMaxHeight) > 600
            ? 600
            : Math.min(contentMaxWidth, contentMaxHeight);
        console.log("logoTargetWidth: " + logoTargetWidth);

        logo.el.style.width = logoTargetWidth + "px";
    };
})();
