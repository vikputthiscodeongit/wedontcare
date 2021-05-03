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
        rolloutInit();

        logoInit();
    });


    // Rollout
    function rolloutInit() {
        console.log("In rolloutInit");

        const rollouts    = document.querySelectorAll(".rollout"),
              rolloutsArr = Array.from(rollouts);

        if (rolloutsArr.length === 0) {
            return;
        }

        rolloutsArr.forEach(function(rollout) {
            rolloutPosFixer(rollout);
        });

        window.addEventListener("resize", debounce(function() {
            rolloutsArr.forEach(function(rollout) {
                rolloutPosFixer(rollout);
            });
        }, 25));
    }

    function rolloutPosFixer(rollout) {
        console.log("In rolloutPosFixer");

        const anchor = rollout.previousElementSibling;

        if (!anchor) {
            return;
        }

        const anchorLineHeightVal = cssValue(anchor, "line-height");
        console.log("anchorLineHeightVal: " + anchorLineHeightVal);

        rollout.style.top = anchorLineHeightVal;
    }


    // Spinning logo
    function logoInit() {
        console.log("In logoInit");

        const logoEl = document.querySelector(".spinning-logo");

        if (!logoEl)
            return;

        logoSizeFixer(logoEl);

        window.addEventListener("resize", debounce(function() {
            logoSizeFixer(logoEl);
        }, 25));
    }

    function logoSizeFixer(logoEl) {
        console.log("In logoSizeFixer");

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
