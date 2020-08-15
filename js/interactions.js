(function (global) {
    let interactionsJS = {};
    global.interactionsJS = interactionsJS;

    let blockPaint = false;
    let tilePaint = false;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.pathfindingJS.rowDimension;
        let colDimension = global.pathfindingJS.colDimension;

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

                global.astarAlgorithmJS.aStarPathfinding(gridArray[0][0],
                    gridArray[rowDimension - 1][colDimension - 1],
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

            if (gridArrayNode.type == "tile") {
                blockPaint = true;

                if (gridArrayNode.type == "tile") {
                    gridArrayNode.setType("block");
                }
            }

            else if (gridArrayNode.type == "block") {
                tilePaint = true;

                if (gridArrayNode.type == "block") {
                    gridArrayNode.setType("tile");
                }
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
            if (gridArrayNode.type == "start") {

            }

            else if (gridArrayNode.type == "target") {

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