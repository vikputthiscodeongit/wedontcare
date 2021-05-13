import isEmpty from "lodash/isEmpty";

(function() {
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
})();
