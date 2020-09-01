(function (global) {
    let updateJS = {};
    global.updateJS = updateJS;

    //UPDATES FOR ALL ALGORITHMS -----------------------------------------------------
    function clear(gridArray, rowDimension, colDimension, clearPaths, clearBlocks) {
        if (clearPaths && global.interactionsJS.totalPath) {
            toggleTravelerDrawUpdate(global.interactionsJS.totalPath[interactionsJS.travelIndex]);
            global.interactionsJS.totalPath = null;
            global.interactionsJS.travelIndex = 0;
        }

        for (let row = 0; row < rowDimension; row++) {
            for (let col = 0; col < colDimension; col++) {
                if (clearPaths) {
                    gridArray[row][col].clearPaths();
                }

                if (clearBlocks) {
                    if (gridArray[row][col].type == "block") {
                        gridArray[row][col].setType("tile");
                    }
                }
            }
        }
    }

    updateJS.clear = function (gridArray, rowDimension, colDimension, clearPaths, clearBlocks) {
        clear(gridArray, rowDimension, colDimension, clearPaths, clearBlocks);
    }

    function disableAllStates(gridArrayTile) {
        if (gridArrayTile.classList.contains("in-open-set")) {
            gridArrayTile.classList.toggle("in-open-set")
        }

        if (gridArrayTile.classList.contains("in-closed-set")) {
            gridArrayTile.classList.toggle("in-closed-set")
        }

        if (gridArrayTile.classList.contains("in-pQ")) {
            gridArrayTile.classList.toggle("in-pQ");
        }

        if (gridArrayTile.classList.contains("local-con")) {
            gridArrayTile.classList.toggle("local-con");
        }

        if (gridArrayTile.classList.contains("reconstruct")) {
            gridArrayTile.classList.toggle("reconstruct");
        }

        //for future use
        // if (gridArrayTile.classList.contains("start")) {
        //     gridArrayTile.classList.toggle("start");
        // }

        // if (gridArrayTile.classList.contains("target")) {
        //     gridArrayTile.classList.toggle("target");
        // }
    }

    updateJS.disableAllStates = function (gridArrayTile) {
        disableAllStates(gridArrayTile);
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

    function reconstructDrawUpdate(gridArrayNode, insert) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (insert) {
            if (!gridArrayTile.classList.contains("reconstruct")) {
                gridArrayTile.classList.toggle("reconstruct");
            }
        } else {
            if (gridArrayTile.classList.contains("reconstruct")) {
                gridArrayTile.classList.toggle("reconstruct");
            }
        }
    }

    updateJS.reconstructDrawUpdate = function (gridArrayNode, insert) {
        reconstructDrawUpdate(gridArrayNode, insert);
    }

    function pathLengthUpdate(length) {
        document.querySelector("#path-length").innerHTML = length;
    }

    updateJS.pathLengthUpdate = function (length) {
        pathLengthUpdate(length);
    }

    function pathBlockLengthUpdate(length) {
        document.querySelector("#path-block-length").innerHTML = length;
    }

    updateJS.pathBlockLengthUpdate = function (length) {
        pathBlockLengthUpdate(length);
    }

    function nodesAnalyzedUpdate(length) {
        document.querySelector("#nodes-analyzed").innerHTML = length;
    }

    updateJS.nodesAnalyzedUpdate = function (length) {
        nodesAnalyzedUpdate(length);
    }

    function pfRunningUpdate(newValue) {
        let message = "";

        if (newValue) {
            message = "RUNNING";
        } else {
            message = "NOT RUNNING";
        }

        document.querySelector("#pathfinder-running").innerHTML = message;
    }

    updateJS.pfRunningUpdate = function (newValue) {
        pfRunningUpdate(newValue);
    }

    function startDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("tile")) {
            gridArrayTile.classList.toggle("tile");
        }

        if (!gridArrayTile.classList.contains("start")) {
            gridArrayTile.classList.toggle("start");
        }
    }

    updateJS.startDrawUpdate = function (gridArrayNode) {
        startDrawUpdate(gridArrayNode);
    }

    function selectedEnabled(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (!gridArrayTile.classList.contains("selected")) {
            gridArrayTile.classList.toggle("selected");
        }
    }

    updateJS.selectedEnabled = function (gridArrayNode) {
        selectedEnabled(gridArrayNode);
    }

    function selectedDisabled(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("selected")) {
            gridArrayTile.classList.toggle("selected");
        }
    }

    updateJS.selectedDisabled = function (gridArrayNode) {
        selectedDisabled(gridArrayNode);
    }

    function removeStart(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("start")) {
            gridArrayTile.classList.toggle("start");
        }
    }

    updateJS.removeStart = function (gridArrayNode) {
        removeStart(gridArrayNode);
    }

    function targetDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("tile")) {
            gridArrayTile.classList.toggle("tile");
        }

        if (!gridArrayTile.classList.contains("target")) {
            gridArrayTile.classList.toggle("target");
        }
    }

    updateJS.targetDrawUpdate = function (gridArrayNode) {
        targetDrawUpdate(gridArrayNode);
    }

    function removeTarget(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("target")) {
            gridArrayTile.classList.toggle("target");
        }
    }

    updateJS.removeTarget = function (gridArrayNode) {
        removeTarget(gridArrayNode);
    }

    function tileDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("block")) {
            gridArrayTile.classList.toggle("block");
        }

        if (!gridArrayTile.classList.contains("tile")) {
            gridArrayTile.classList.toggle("tile");
        }
    }

    updateJS.tileDrawUpdate = function (gridArrayNode) {
        tileDrawUpdate(gridArrayNode);
    }

    function blockDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        if (gridArrayTile.classList.contains("tile")) {
            gridArrayTile.classList.toggle("tile");
        }

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

        // window.setTimeout(function () {
        //     gridArrayTile.classList.toggle("traveler");
        // }, 150);
    }

    updateJS.toggleTravelerDrawUpdate = function (gridArrayNode) {
        toggleTravelerDrawUpdate(gridArrayNode);
    }

    //UPDATES FOR A* ALGORITHM -----------------------------------------------------
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

        // fScoreDrawUpdate(gridArrayNode);
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

        // fScoreDrawUpdate(gridArrayNode);
    }

    updateJS.closedSetDrawUpdate = function (gridArrayNode) {
        closedSetDrawUpdate(gridArrayNode);
    }

    //UPDATES FOR LPA* ALGORITHM -----------------------------------------------------
    function inPQDrawUpdate(gridArrayNode, setting) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (setting && !gridArrayTile.classList.contains("in-pQ")) {
            gridArrayTile.classList.toggle("in-pQ");
        }

        else if (!setting && gridArrayTile.classList.contains("in-pQ")) {
            gridArrayTile.classList.toggle("in-pQ");
        }

        // fScoreDrawUpdate(gridArrayNode);
    }

    updateJS.inPQDrawUpdate = function (gridArrayNode, setting) {
        inPQDrawUpdate(gridArrayNode, setting);
    }

    function localConDrawUpdate(gridArrayNode) {
        let gridArrayTile = nodeToTile(gridArrayNode);

        disableAllStates(gridArrayTile);

        if (!gridArrayTile.classList.contains("local-con")) {
            gridArrayTile.classList.toggle("local-con");
        }
    }

    updateJS.localConDrawUpdate = function (gridArrayNode) {
        localConDrawUpdate(gridArrayNode);
    }

    function keyDrawUpdate(gridArrayNode) {
        let gridArrayNodeKey0 = Math.trunc(gridArrayNode.rhsValue);
        let gridArrayNodeKey1 = Math.trunc(gridArrayNode.gValue);

        let gridArrayTile = nodeToTile(gridArrayNode);

        // console.log(gridArrayNode.key);
        gridArrayTile.innerHTML = "<div>[" + gridArrayNodeKey0 + ", " + gridArrayNodeKey1 + "]</div>";
    }

    updateJS.keyDrawUpdate = function (gridArrayNode) {
        keyDrawUpdate(gridArrayNode);
    }

})(window);