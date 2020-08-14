(function (global) {
    let updateJS = {};
    global.updateJS = updateJS;

    function disableAllStates(gridArrayTile) {
        if (gridArrayTile.classList.contains("in-open-set")) {
            gridArrayTile.classList.toggle("in-open-set")
        }

        if (gridArrayTile.classList.contains("in-closed-set")) {
            gridArrayTile.classList.toggle("in-closed-set")
        }

        if (gridArrayTile.classList.contains("reconstruct")) {
            gridArrayTile.classList.toggle("reconstruct");
        }

        // if (gridArrayTile.classList.contains("start")) {
        //     gridArrayTile.classList.toggle("start");
        // }

        // if (gridArrayTile.classList.contains("target")) {
        //     gridArrayTile.classList.toggle("target");
        // }

        if (gridArrayTile.classList.contains("tile")) {
            gridArrayTile.classList.toggle("tile");
        }

        if (gridArrayTile.classList.contains("block")) {
            gridArrayTile.classList.toggle("block");
        }
    }

    function nodeToTile(gridArrayNode) {
        let gridArrayNodeRowString = "" + gridArrayNode.row;
        let gridArrayNodeColString = "" + gridArrayNode.col;

        if (gridArrayNode.row < 10) {
            gridArrayNodeRowString = "0" + gridArrayNode.row;
        }

        if (gridArrayNode.col < 10) {
            gridArrayNodeColString = "0" + gridArrayNode.col;
        }

        return document.querySelector("#tile" + gridArrayNodeRowString + "" + gridArrayNodeColString);
    }

    updateJS.nodeToTile = function (gridArrayNode) {
        return nodeToTile(gridArrayNode);
    }

    function fScoreDrawUpdate(gridArrayNode) {
        let gridArrayNodefScore = Math.trunc(gridArrayNode.fScore);

        let gridArrayTile = nodeToTile(gridArrayNode);

        gridArrayTile.innerHTML = "<div>" + gridArrayNodefScore + "</div>";
    }

    updateJS.fScoreDrawUpdate = function (gridArrayNode) {
        fScoreDrawUpdate(gridArrayNode);
    }

    function openSetDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("in-open-set")) {
            gridArrayTile.classList.toggle("in-open-set");
        }

        fScoreDrawUpdate(gridArrayNode);
    }

    updateJS.openSetDrawUpdate = function (gridArrayNode) {
        openSetDrawUpdate(gridArrayNode);
    }

    function closedSetDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("in-closed-set")) {
            gridArrayTile.classList.toggle("in-closed-set");
        }

        fScoreDrawUpdate(gridArrayNode);
    }

    updateJS.closedSetDrawUpdate = function (gridArrayNode) {
        closedSetDrawUpdate(gridArrayNode);
    }

    function reconstructDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("reconstruct")) {
            gridArrayTile.classList.toggle("reconstruct");
        }
    }

    updateJS.reconstructDrawUpdate = function (gridArrayNode) {
        reconstructDrawUpdate(gridArrayNode);
    }

    function startDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("start")) {
            gridArrayTile.classList.toggle("start");
        }
    }

    updateJS.startDrawUpdate = function (gridArrayNode) {
        startDrawUpdate(gridArrayNode);
    }

    function targetDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("target")) {
            gridArrayTile.classList.toggle("target");
        }
    }

    updateJS.targetDrawUpdate = function (gridArrayNode) {
        targetDrawUpdate(gridArrayNode);
    }

    function blockDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("block")) {
            gridArrayTile.classList.toggle("block");
        }
    }

    updateJS.blockDrawUpdate = function (gridArrayNode) {
        blockDrawUpdate(gridArrayNode);
    }

    function toggleTravelerDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        gridArrayTile.classList.toggle("traveler");

        window.setTimeout(function () {
            gridArrayTile.classList.toggle("traveler");
        }, 150);
    }

    updateJS.toggleTravelerDrawUpdate = function (gridArrayNode) {
        toggleTravelerDrawUpdate(gridArrayNode);
    }

})(window);