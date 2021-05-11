import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";

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

        rollout.init();

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


    // Rollout
    let rollout = {};

    rollout.init = function() {
        const rolloutElsArr = [...rollout.els];

        if (rolloutElsArr.length === 0)
            return;

        rolloutElsArr.forEach((rolloutEl) => {
            rollout.posFixer(rolloutEl);

            rollout.cycleTexts(rolloutEl);

            window.addEventListener("resize", debounce(function() {
                rollout.posFixer(rolloutEl);
            }, 25));
        });
    };

    rollout.els = document.querySelectorAll(".rollout");

    rollout.texts = {};

    rollout.posFixer = function(rolloutEl) {
        console.log("In rolloutPosFixer().");

        const anchor = rolloutEl.previousElementSibling;

        if (!anchor) {
            console.error("This rollout has no sibling to anchor on to. Returning from function.");

            return;
        }

        const anchorLineHeightVal = cssValue(anchor, "line-height");
        console.log(`anchorLineHeightVal: ${anchorLineHeightVal}`);

        rolloutEl.style.top = anchorLineHeightVal;
    };

    rollout.getTexts = function(rolloutEl) {
        console.log("In rollout.getTexts().");

        const rolloutId = rolloutEl.hasAttribute("id")
            ? rolloutEl.getAttribute("id")
            : false;

        if (!rolloutId) {
            console.error("This rollout is missing its id. Returning from function.");

            return;
        }

        const elAttrs    = rolloutEl.attributes,
              elAttrsArr = [...elAttrs];
        // console.log(elAttrsArr);

        const textAttrRegex = /^data-rollout-text-[0-9]+/;

        let texts = [];

        elAttrsArr.forEach(function(elAttr) {
            if (!elAttr.nodeName.match(textAttrRegex))
                return;

            texts.push(elAttr.value);
        });

        console.log(texts);

        texts.sort(() => Math.random() - 0.5);

        rollout.texts[rolloutId] = texts;
    };

    rollout.cycleTexts = function(rolloutEl, textIndex) {
        console.log("In rollout.cycleTexts().");

        console.log(rolloutEl);

        if (typeof textIndex === "undefined")
            textIndex = 0;

        console.log(`textIndex: ${textIndex}`);

        const rolloutId = rolloutEl.hasAttribute("id")
            ? rolloutEl.getAttribute("id")
            : false;

        if (!rolloutId) {
            console.error("This rollout is missing its id. Returning from function.");

            return;
        }

        console.log(`rolloutId: ${rolloutId}`);

        if (isEmpty(rollout.texts[rolloutId]))
            rollout.getTexts(rolloutEl);

        if (rollout.texts[rolloutId].length === 0) {
            console.error("No texts to process, returning from function.");

            return;
        }

        console.log(rollout.texts);

        if (cssValue(rolloutEl, "height") !== "0px") {
            rolloutEl.style.height = "0px";
        }

        rolloutEl.textContent = rollout.texts[rolloutId][textIndex];

        setTimeout(function() {
            rolloutEl.style.height = cssValue(rolloutEl, "line-height");

            textIndex++;

            if (textIndex === rollout.texts[rolloutId].length)
                textIndex = 0;

            setTimeout(function() {
                rollout.cycleTexts(rolloutEl, textIndex);
            }, 5000);
        }, 1000);
    };


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
