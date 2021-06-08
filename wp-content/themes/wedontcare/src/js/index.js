import debounce from "lodash/debounce";

import stylesheet from "../scss/style.scss";

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

    // Check if viewport is above given breakpoint
    function aboveBreakpoint(breakpoint) {
        const bp = `${breakpoint}Breakpoint`;

        if (typeof stylesheet[bp] === "undefined") {
            console.error("The given breakpoint either doesn't exist or hasn't been exported to JavaScript.");
        }

        return window.matchMedia(`(min-width: ${stylesheet[bp]})`).matches;
    }

    // Valide an email address against the RFC 5322 specification. See also https://stackoverflow.com/a/201378/6396604 & https://emailregex.com/.
    function isValidEmail(address) {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return regEx.test(address);
    }


    // Event handlers
    document.addEventListener("DOMContentLoaded", function() {
        document.documentElement.classList.replace("no-js", "js");

        inputDeviceDetector();

        main.init();

        spinningLogo.init();

        video.init();

        wpcf7.init();

        tabindex.init();
    });


    // Input devices
    function inputDeviceDetector() {
        // console.log("In inputDeviceDetector().");

        document.body.addEventListener("mousedown", function() {
            document.body.classList.add("using-mouse");
        });

        document.body.addEventListener("keydown", function() {
            document.body.classList.remove("using-mouse");
        });
    }


    // Main
    let main = {};

    main.init = function() {
        main.sizeFixer();

        window.addEventListener("resize", debounce(function() {
            main.sizeFixer();
        }, 25));
    };

    main.el = document.querySelector("main");

    main.sizeFixer = function() {
        // console.log("In main.sizeFixer().");

        const mainTargetHeight = document.documentElement.clientHeight;
        // console.log(mainTargetHeight);

        main.el.style.minHeight = `${mainTargetHeight}px`;
    };


    // Spinning logo
    let spinningLogo = {};

    spinningLogo.init = function() {
        if (!spinningLogo.el)
            return;

        spinningLogo.sizeFixer();

        window.addEventListener("resize", debounce(function() {
            spinningLogo.sizeFixer();
        }, 25));
    };

    spinningLogo.el = document.querySelector(".spinning-logo");

    spinningLogo.sizeFixer = function() {
        // console.log("In spinningLogo.sizeFixer().");

        const videoEl = spinningLogo.el.querySelector("video");

        if (!videoEl)
            return;

        const parentEl = spinningLogo.el.parentNode;

        if (!parentEl || (cssValue(parentEl, "display") !== "grid"))
            return;

        const containerEl = parentEl.closest(".container");

        if (!containerEl)
            return;

        const mainWidth       = pxToNo(cssValue(main.el, "width")),
              mainPaddingLeft = pxToNo(cssValue(main.el, "padding-left"));
        // console.log(mainWidth);
        // console.log(mainPaddingLeft);

        const contentRowHeight = pxToNo(cssValue(containerEl, "grid-template-rows").split(" ")[1]);
        // console.log(contentRowHeight);

        const contentRowTopHeight = pxToNo(cssValue(parentEl, "grid-template-rows").split(" ")[0]),
              contentRowGap       = pxToNo(cssValue(parentEl, "grid-row-gap"));
        // console.log(contentRowTopHeight);
        // console.log(contentRowGap);

        const contentMaxWidth  = mainWidth - (mainPaddingLeft * 2),
              contentMaxHeight = contentRowHeight - (contentRowTopHeight * 2) - (contentRowGap * 2);
        console.log(`contentMaxWidth: ${contentMaxWidth}`);
        console.log(`contentMaxHeight: ${contentMaxHeight}`);


        // Ugh
        const vhVisibleBars   = document.documentElement.clientHeight,
              vhInvisibleBars = document.body.clientHeight;
        console.log(`Viewport height with visible bars: ${vhVisibleBars}`);
        console.log(`Viewport height without visible bars: ${vhInvisibleBars}`);

        const correctionFactor = vhInvisibleBars - vhVisibleBars;

        if (correctionFactor !== 0) {
            console.log("Correction factor is not zero!");

            const targetContentRowHeight = contentRowHeight - correctionFactor;

            if (targetContentRowHeight <= 320) {
                if (containerEl.style.gridTemplateRows !== "") {
                    containerEl.style.gridTemplateRows = "";
                }
            } else {
                console.log(`.content row height should be corrected by ${correctionFactor} pixels.`);

                const targetContentRowVal = `minmax(20rem, ${targetContentRowHeight}px)`,
                      targetOuterRowsVal  = `${contentRowTopHeight}px`;

                const targetGridTemplateRows = `${targetOuterRowsVal} ${targetContentRowVal} ${targetOuterRowsVal}`;

                containerEl.style.gridTemplateRows = targetGridTemplateRows;
            }
        } else {
            if (containerEl.style.gridTemplateRows !== "") {
                containerEl.style.gridTemplateRows = "";
            }
        }
        //


        const logoTargetWidth = Math.min(contentMaxWidth, contentMaxHeight) > 600
            ? 600
            : Math.min(contentMaxWidth, contentMaxHeight);
        // console.log(`logoTargetWidth: ${logoTargetWidth}`);

        videoEl.style.width = `${logoTargetWidth}px`;
    };


    // Video
    let video = {};

    video.init = function() {
        const videoEls = document.querySelectorAll(".video");

        if (videoEls.length === 0)
            return;

        videoEls.forEach((videoEl) => {
            if (!videoEl.hasAttribute("autoplay")) {
                return;
            }

            video.removeControls(videoEl);
        });
    };

    video.removeControls = function(targetVideo) {
        // console.log("In video.removeControls().");

        targetVideo.removeAttribute("controls");
    };


    // Contact Form 7
    let wpcf7 = {};

    wpcf7.init = function() {
        const wpcf7Els = document.querySelectorAll(".wpcf7");

        if (wpcf7Els.length === 0)
            return;

        wpcf7Els.forEach((wpcf7El) => {
            wpcf7.changeAttributes(wpcf7El);

            wpcf7.statusEl(wpcf7El);

            const inputs = wpcf7El.querySelectorAll(".wpcf7-form .form__input");

            inputs.forEach((input) => {
                if (
                    input.classList.contains("wpcf7-validates-as-required") &&
                    // input.value isn't necessarily always empty on form initialization, Firefox for example retains <input> values when a page is refreshed.
                    input.value === ""
                ) {
                    wpcf7.setInvalidState(input);
                }

                input.addEventListener("input", function() {
                    wpcf7.inputValidator(input);
                });
            });
        });
    };

    wpcf7.changeAttributes = function(wpcf7El) {
        // console.log("In wpcf7.changeAttributes().");

        wpcf7El.classList.add("form");

        if (document.body.classList.contains("page-template-tpl-landing")) {
            if (spinningLogo.el) {
                wpcf7El.classList.add("form--width-small");
                wpcf7El.setAttribute("id", "form-mailing");
            }
        }
    };

    wpcf7.statusEl = function(wpcf7El) {
        // console.log("In wpcf7.statusEl().");

        const wpcf7Form    = wpcf7El.querySelector(".wpcf7-form"),
              submitButton = wpcf7Form.querySelector("[type='submit']"),
              inlineSubmitWrapper = wpcf7Form.querySelector(".form__field--inline-send");

        if (!inlineSubmitWrapper) {
            return;
        }

        const inputWrapper = inlineSubmitWrapper.querySelector(".wpcf7-form-control-wrap"),
              input        = inputWrapper.querySelector("input");

        let submitStatusEl = document.createElement("span");
        submitStatusEl.className = "wpcf7-submit-status";

        input.parentNode.insertBefore(submitStatusEl, input.nextElementSibling);

        submitStatusEl = inputWrapper.querySelector(".wpcf7-submit-status");

        wpcf7El.addEventListener("wpcf7beforesubmit", function() {
            submitStatusEl.textContent = "Submitting...";
        });

        wpcf7El.addEventListener("wpcf7submit", function(e) {
            let timeout = 0;

            if (e.detail.apiResponse.status === "mail_sent") {
                timeout = 2000;

                submitStatusEl.textContent = "Success!";
            }

            setTimeout(function() {
                submitStatusEl.textContent = "";
            }, timeout);
        });

        wpcf7El.addEventListener("wpcf7beforesubmit", function() {
            submitButton.setAttribute("disabled", true);
        });

        wpcf7El.addEventListener("wpcf7submit", function() {
            setTimeout(function() {
                submitButton.removeAttribute("disabled");
            }, 2000);
        });
    };

    wpcf7.inputValidator = function(input) {
        // console.log("In wpcf7.inputValidator().");

        const type = input.getAttribute("type");

        if (
            (type === "email" && isValidEmail(input.value)) ||
            (type !== "email" && input.value !== "")
        ) {
            wpcf7.unsetInvalidState(input);
        } else {
            wpcf7.setInvalidState(input);
        }
    };

    wpcf7.setInvalidState = function(input) {
        // console.log("In wpcf7.setInvalidState().");

        input.parentElement.classList.remove("is-valid");

        input.setAttribute("aria-invalid", true);
        input.parentElement.classList.add("is-invalid");
    };

    wpcf7.unsetInvalidState = function(input) {
        // console.log("In wpcf7.unsetInvalidState().");

        input.setAttribute("aria-invalid", false);
        input.parentElement.classList.remove("is-invalid");

        input.parentElement.classList.add("is-valid");
    };


    // Music overview - .box link tabindex
    let tabindex = {};

    tabindex.init = function() {
        const musicOverview = document.body.classList.contains("page-template-tpl-music-overview");

        if (!musicOverview)
            return;

        tabindex.fixOrder();

        window.addEventListener("resize", debounce(function() {
            tabindex.fixOrder();
        }, 25));
    };

    tabindex.links = document.querySelectorAll(".box .stretched-link");

    tabindex.fixOrder = function() {
        if (aboveBreakpoint("md")) {
            tabindex.links.forEach((link) => {
                if (!link.hasAttribute("tabindex")) {
                    const box      = link.closest(".box");
                    const boxOrder = cssValue(box, "order");

                    const targetTabindex = Number(boxOrder) + 1;

                    link.setAttribute("tabindex", targetTabindex);
                }
            });
        } else {
            tabindex.links.forEach((link) => {
                if (link.hasAttribute("tabindex")) {
                    link.removeAttribute("tabindex");
                }
            });
        }
    };
})();
