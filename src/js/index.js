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
    window.addEventListener("resize", debounce(function() {
        logoSizeFixer();
    }, 25));

    document.addEventListener("DOMContentLoaded", function() {
        // rollout.init();

        logoSizeFixer();
    });


    // Rollout
    // let rollout = {};

    // rollout.init = function() {
    //     const rollouts = document.querySelectorAll("rollout");
    //     const rolloutsArr = Array.from(rollouts);

    //     rolloutsArr.forEach(function(rollout) {
    //         // Code
    //     });
    // }


    // Spinning logo
    function logoSizeFixer() {
        const logoEl = document.querySelector(".spinning-logo");

        if (!logoEl)
            return;

        const contentEl = logoEl.parentElement;

        if (!contentEl)
            return;

        const mainWidthVal   = cssValue(mainEl, "width"),
              mainPaddingVal = cssValue(mainEl, "padding");

        const mainWidth       = pxStrToNo(mainWidthVal),
              mainPaddingLeft = pxStrToNo(mainPaddingVal);

        const mainRowsVal    = cssValue(mainEl, "grid-template-rows"),
              mainRowsValArr = mainRowsVal.split(" ");

        const mainContentRowHeight = pxStrToNo(mainRowsValArr[1]);
        // console.log(mainContentRowHeight);

        const contentRowsVal    = cssValue(contentEl, "grid-template-rows"),
              contentRowsValArr = contentRowsVal.split(" "),
              contentRowGapVal  = cssValue(contentEl, "grid-row-gap");

        const contentRowTopHeight = pxStrToNo(contentRowsValArr[0]),
              contentRowGapHeight = pxStrToNo(contentRowGapVal);
        // console.log(contentRowTopHeight);
        // console.log(contentRowGapHeight);

        const contentMaxWidth  = mainWidth - (mainPaddingLeft * 2),
              contentMaxHeight = mainContentRowHeight - (contentRowTopHeight * 2) - (contentRowGapHeight * 2);
        console.log(contentMaxWidth);
        console.log(contentMaxHeight);

        const logoTargetWidth = Math.min(contentMaxWidth, contentMaxHeight);
        console.log(logoTargetWidth);

        logoEl.style.width = logoTargetWidth + "px";
    }
})();
