(function (global) {
    let interactionsJS = {};
    global.interactionsJS = interactionsJS;

    let blockPaint = false;
    let tilePaint = false;

    let moveStart = false;
    let currStart = null;

    let moveTarget = false;
    let currTarget = null;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.pathfindingJS.rowDimension;
        let colDimension = global.pathfindingJS.colDimension;

        currStart = gridArray[0][0];
        currTarget = gridArray[rowDimension - 1][colDimension - 1];

        document.querySelector("#clear-paths-btn").addEventListener("click", function () {
            global.updateJS.clearPaths(gridArray, rowDimension, colDimension);
        });

        document.querySelector("#clear-blocks-btn").addEventListener("click", function () {
            global.updateJS.clearBlocks(gridArray, rowDimension, colDimension);
        });

        document.querySelector("#clear-all-btn").addEventListener("click", function () {
            global.updateJS.clearPaths(gridArray, rowDimension, colDimension);
            global.updateJS.clearBlocks(gridArray, rowDimension, colDimension);
        });

        document.querySelector("#general-form").addEventListener("submit", function (e) {
            e.preventDefault();

            let data = new FormData(document.querySelector("#general-form"));

            let userSettings = {
                algorithm: null,
                heuristicFunc: null,
                movementType: null,
                cutCorners: null
            }

            let pfSettings = {
                startNode: null,
                targetNode: null,
                userSettings: userSettings
            };

            let dataArray = new Array();
            let dataArrayIndex = 0;

            for (entry of data) {
                dataArray[dataArrayIndex] = entry[1];
                dataArrayIndex++;
            };

            dataArrayIndex = 0;
            for (property in userSettings) {
                userSettings[property] = dataArray[dataArrayIndex];
                dataArrayIndex++;
            }

            pfSettings.userSettings.cutCorners = (pfSettings.userSettings.cutCorners == "true");

            if (pfSettings.userSettings.heuristicFunc == "manhattan") {
                pfSettings.userSettings.heuristicFunc = global.pathfindingJS.manhattanHFunc;
            }

            else if (pfSettings.userSettings.heuristicFunc == "euclidian") {
                pfSettings.userSettings.heuristicFunc = global.pathfindingJS.euclidianHFunc;
            }

            if (pfSettings.userSettings.algorithm == "aStar") {
                global.updateJS.clearPaths(gridArray, rowDimension, colDimension);

                global.astarAlgorithmJS.aStarPathfinding(currStart,
                    currTarget,
                    pfSettings.userSettings.heuristicFunc,
                    pfSettings.userSettings.movementType,
                    pfSettings.userSettings.cutCorners);
            }
        });

        document.querySelector("html").addEventListener("mouseup", function (e) {
            e.preventDefault();

            if (blockPaint) {
                blockPaint = false;
            }

            else if (tilePaint) {
                tilePaint = false;
            }
        });
    });

    function installEventListeners(gridArrayNode) {
        let gridArrayTile = global.updateJS.nodeToTile(gridArrayNode);
        gridArrayTile.addEventListener("mousedown", function (e) {
            e.preventDefault();

            if ((gridArrayNode.type == "tile") && !moveStart && !moveTarget) {
                blockPaint = true;
                gridArrayNode.setType("block");
            }

            else if ((gridArrayNode.type == "block") && !moveStart && !moveTarget) {
                tilePaint = true;
                gridArrayNode.setType("tile");
            }
        });

        gridArrayTile.addEventListener("mouseover", function (e) {
            e.preventDefault();

            if (blockPaint) {
                if (gridArrayNode.type == "tile") {
                    gridArrayNode.setType("block");
                }
            }

            else if (tilePaint) {
                if (gridArrayNode.type == "block") {
                    gridArrayNode.setType("tile");
                }
            }
        });

        gridArrayTile.addEventListener("click", function () {
            if (moveStart && (gridArrayNode.type != "tile") && (gridArrayNode.type != "start")) {
                moveStart = false;
                global.updateJS.selectedDisabled(currStart);
            }

            if (moveTarget && (gridArrayNode.type != "tile") && (gridArrayNode.type != "target")) {
                moveTarget = false;
                global.updateJS.selectedDisabled(currTarget);
            }

            if (gridArrayNode.type == "start") {
                if (moveStart) {
                    moveStart = false;
                    global.updateJS.selectedDisabled(currStart);
                } else {
                    moveStart = true;
                    global.updateJS.selectedEnabled(currStart);
                }
            }

            else if (gridArrayNode.type == "target") {
                if (moveTarget) {
                    moveTarget = false;
                    global.updateJS.selectedDisabled(currTarget);
                } else {
                    moveTarget = true;
                    global.updateJS.selectedEnabled(currTarget);
                }
            }

            else if (gridArrayNode.type == "tile") {
                if (moveStart) {
                    moveStart = false;
                    global.updateJS.selectedDisabled(currStart);
                    currStart.setType("tile");
                    global.updateJS.removeStart(currStart);
                    gridArrayNode.setType("start");
                    currStart = gridArrayNode;
                }

                if (moveTarget) {
                    moveTarget = false;
                    global.updateJS.selectedDisabled(currTarget);
                    currTarget.setType("tile");
                    global.updateJS.removeTarget(currTarget);
                    gridArrayNode.setType("target");
                    currTarget = gridArrayNode;
                }
            }

            else if (gridArrayNode.type == "block") {

            }

            // else if (gridArrayNode.type == "tile" || gridArrayNode.type == "block") {
            //     if (gridArrayNode.type == "tile") {
            //         gridArrayNode.setType("block");
            //     } else {
            //         gridArrayNode.setType("tile");
            //     }
            // }
        });
    }

    interactionsJS.installEventListeners = function (gridArrayNode) {
        installEventListeners(gridArrayNode);
    };
})(window);