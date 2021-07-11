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

    // Convert CSS unit to a number
    function cssUnitToNo(unit) {
        let sliceEnd = -2;

        if (unit.indexOf("rem") > -1) {
            sliceEnd = -3;
        }

        return Number(unit.slice(0, sliceEnd));
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

        video.init();

        wpcf7.init();

        fpContent.init();

        reversedRow.init();
    });


    // Input devices
    function inputDeviceDetector() {
        console.log("In inputDeviceDetector().");

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
        if (!document.body.classList.contains("cover-fullvh"))
            return;

        main.heightFixer();

        window.addEventListener("resize", debounce(function() {
            main.heightFixer();
        }, 25));
    };

    main.el = document.querySelector("main");

    main.heightFixer = function() {
        console.log("In main.heightFixer().");

        let vh = document.documentElement.clientHeight;

        if (document.body.classList.contains("cover-fullvh--fixed-min") && vh < 720) {
            if (!aboveBreakpoint("md") && vh < 568) {
                vh = 568;
            } else if (aboveBreakpoint("md") && vh < 720) {
                vh = 720;
            }
        } else if (document.body.classList.contains("cover-fullvh--dynamic")) {
            document.body.classList.remove("covers-fullvh");

            const bh = document.body.clientHeight;

            if (vh > bh) {
                document.body.classList.add("covers-fullvh");
            }
        }

        if (vh > 1080) {
            vh = 1080;
        }

        main.el.style.setProperty("--vh", `${vh}px`);
    };


    // Video
    let video = {};

    video.init = function() {
        if (video.els.length === 0)
            return;

        video.els.forEach((videoEl) => {
            if (!videoEl.hasAttribute("autoplay")) {
                return;
            }

            video.removeControls(videoEl);
        });
    };

    video.els = document.querySelectorAll("video");

    video.removeControls = function(targetVideo) {
        console.log("In video.removeControls().");

        targetVideo.removeAttribute("controls");
    };


    // Contact Form 7
    let wpcf7 = {};

    wpcf7.init = function() {
        if (wpcf7.els.length === 0)
            return;

        wpcf7.els.forEach((wpcf7El) => {
            wpcf7.changeAttributes(wpcf7El);

            wpcf7.createSubmitStatusEl(wpcf7El);

            const inputs = wpcf7El.querySelectorAll(".wpcf7-form .form__input");

            inputs.forEach((input) => {
                if (
                    input.classList.contains("wpcf7-validates-as-required") &&
                    // input.value isn't necessarily always empty on form initialization,
                    // Firefox for example retains <input> values when a page is refreshed.
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

    wpcf7.els = document.querySelectorAll(".wpcf7");

    wpcf7.changeAttributes = function(wpcf7El) {
        console.log("In wpcf7.changeAttributes().");

        wpcf7El.classList.add("form");

        if (document.body.classList.contains("page-template-front-page")) {
            if (wpcf7El.closest(".fp-content")) {
                wpcf7El.classList.add("form--width-small");
                wpcf7El.setAttribute("id", "form-mailing");
            }
        }
    };

    wpcf7.createSubmitStatusEl = function(wpcf7El) {
        console.log("In wpcf7.createSubmitStatusEl().");

        const wpcf7Form           = wpcf7El.querySelector(".wpcf7-form"),
              inlineSubmitWrapper = wpcf7Form.querySelector(".form__field--inline-send");

        if (!inlineSubmitWrapper)
            return;

        const inputWrapper = inlineSubmitWrapper.querySelector(".wpcf7-form-control-wrap"),
              input        = inputWrapper.querySelector("input");

        const submitStatusEl = document.createElement("span");
        submitStatusEl.className = "wpcf7-submit-status";

        input.parentNode.insertBefore(submitStatusEl, input.nextElementSibling);

        wpcf7.setSubmitStatusEl(wpcf7El);
    };

    wpcf7.setSubmitStatusEl = function(wpcf7El) {
        console.log("In wpcf7.setSubmitStatusEl().");

        const wpcf7Form      = wpcf7El.querySelector(".wpcf7-form"),
              submitButton   = wpcf7Form.querySelector("[type='submit']"),
              submitStatusEl = wpcf7Form.querySelector(".wpcf7-submit-status");

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
        console.log("In wpcf7.inputValidator().");

        const type = input.getAttribute("type");

        if (
            (type === "email" && isValidEmail(input.value)) ||
            (type !== "email" && input.value !== "")
        ) {
            wpcf7.setValidState(input);
        } else {
            wpcf7.setInvalidState(input);
        }
    };

    wpcf7.setValidState = function(input) {
        console.log("In wpcf7.setValidState().");

        input.setAttribute("aria-invalid", false);
        input.parentElement.classList.remove("is-invalid");

        input.parentElement.classList.add("is-valid");
    };

    wpcf7.setInvalidState = function(input) {
        console.log("In wpcf7.setInvalidState().");

        input.parentElement.classList.remove("is-valid");

        input.setAttribute("aria-invalid", true);
        input.parentElement.classList.add("is-invalid");
    };


    // Front page - <video>
    let fpContent = {};

    fpContent.init = function() {
        if (!fpContent.mediaEl)
            return;

        fpContent.sizeFixer();

        window.addEventListener("resize", debounce(function() {
            fpContent.sizeFixer();
        }, 25));
    };

    fpContent.el = document.querySelector(".fp-content");

    fpContent.mediaEl = document.querySelector(".fp-content > .media");

    fpContent.sizeFixer = function() {
        console.log("In fpContent.sizeFixer().");

        const bodyFontSizeUl = cssUnitToNo(cssValue(document.body, "font-size"));
        const fpCRowOuterHeightMp = cssUnitToNo(stylesheet.fpCRowOuterHeight);

        const fpCRowOuterHeight = bodyFontSizeUl * fpCRowOuterHeightMp;
        const fpContentElHeight = fpContent.el.getBoundingClientRect().height;

        const mediaWidth = fpContent.mediaEl.getBoundingClientRect().width;
        const mediaTargetHeight = fpContentElHeight - (fpCRowOuterHeight * 2);

        if (mediaWidth > mediaTargetHeight) {
            fpContent.el.style.gridTemplateRows = `${fpCRowOuterHeight}px ${mediaTargetHeight}px ${fpCRowOuterHeight}px`;
        } else if (fpContent.el.style.gridTemplateRows !== "") {
            fpContent.el.style.gridTemplateRows = "";
        }
    };


    // .row--lg-direction-reverse
    let reversedRow = {};

    reversedRow.init = function() {
        if (reversedRow.els.length === 0)
            return;

        reversedRow.els.forEach((rowEl) => {
            const boxElsWithLinks = rowEl.querySelectorAll(".box a");

            if (boxElsWithLinks.length === 0)
                return;

            const rowChildElArr = [...rowEl.children];

            boxElsWithLinks.forEach((link) => {
                reversedRow.fixBoxOrder(rowChildElArr, link);

                window.addEventListener("resize", debounce(function() {
                    reversedRow.fixBoxOrder(rowChildElArr, link);
                }, 25));
            });
        });
    };

    reversedRow.els = document.querySelectorAll(".row--lg-direction-reverse");

    reversedRow.fixBoxOrder = function(rowChildElArr, link) {
        console.log("In reversedRow.fixBoxOrder().");

        if (aboveBreakpoint("lg")) {
            if (!link.hasAttribute("tabindex")) {
                const box = link.closest(".box");

                const targetTabindex = rowChildElArr.length - rowChildElArr.indexOf(box);

                link.setAttribute("tabindex", targetTabindex);
            }
        } else {
            if (link.hasAttribute("tabindex")) {
                link.removeAttribute("tabindex");
            }
        }
    };
})();
