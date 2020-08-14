(function (global) {
    let interactionsJS = {};
    global.interactionsJS = interactionsJS;

    window.addEventListener("DOMContentLoaded", function () {

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