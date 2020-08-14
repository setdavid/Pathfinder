(function (global) {
    let interactionsJS = {};
    global.interactionsJS = interactionsJS;

    window.addEventListener("DOMContentLoaded", function () {
        document.querySelector(".navslider-toggler").addEventListener("click", function () {
            document.querySelector(".navslider").classList.toggle("navslider-closed");

            if (!document.querySelector(".navslider").classList.contains("navslider-closed")) {
                if (!document.querySelector("body").classList.toggle("body-no-scroll")) {
                    document.querySelector("body").classList.toggle("body-no-scroll");
                }
            } else {
                if (document.querySelector("body").classList.toggle("body-no-scroll")) {
                    document.querySelector("body").classList.toggle("body-no-scroll");
                }
            }
        });

        document.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault();

            let data = new FormData(document.querySelector("#algorithm-form"));

            for (const entry of data) {
                console.log(entry);
            };
        });
    });

    function installEventListeners(gridArrayNode) {
        if (!(gridArrayNode.type == "start" || gridArrayNode.type == "target")) {
            let gridArrayTile = global.updateJS.nodeToTile(gridArrayNode);

            gridArrayTile.addEventListener("click", function () {
                if (gridArrayNode.type == "tile") {
                    gridArrayNode.type = "block";
                } else {
                    gridArrayNode.type = "tile"
                }

                gridArrayTile.classList.toggle("block");
            });
        }
    }

    interactionsJS.installEventListeners = function (gridArrayNode) {
        installEventListeners(gridArrayNode);
    };
})(window);