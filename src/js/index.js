import "../scss/style.scss";

(function() {
    document.addEventListener("DOMContentLoaded", function() {
        rollout.init();
    });

    let rollout = {};

    rollout.init = function() {
        const rollouts = document.querySelectorAll("rollout");
        const rolloutsArr = Array.from(rollouts);

        rolloutsArr.forEach(function(rollout) {
            // Code
        });
    }
})();
