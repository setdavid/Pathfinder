(function (global) {
    let interactionsJS = {};
    global.interactionsJS = interactionsJS;

    interactionsJS.simulationRunning = false;
    interactionsJS.setSRunning = function (newValue) {
        interactionsJS.simulationRunning = newValue;

        if (newValue) {
            global.updateJS.pathLengthUpdate("simulation in progress");
            global.updateJS.pathBlockLengthUpdate("simulation in progress");
        }
    };
    interactionsJS.setSRunning(false);

    interactionsJS.pathfinderRunning = false;
    interactionsJS.setPFRunning = function (newValue) {
        interactionsJS.pathfinderRunning = newValue;
        global.updateJS.pfRunningUpdate(newValue);
    };
    interactionsJS.setPFRunning(false);

    let blockPaint = false;
    let tilePaint = false;

    let moveStart = false;
    let currStart = null;

    let moveTarget = false;
    let currTarget = null;

    interactionsJS.totalPath = null;
    interactionsJS.travelIndex = 0;

    interactionsJS.nodesAnalyzed = 0;
    interactionsJS.setNodesAnalyzed = function (newValue) {
        interactionsJS.nodesAnalyzed = newValue;
        global.updateJS.nodesAnalyzedUpdate(newValue);
    };

    interactionsJS.pfType = "";

    let changesArr = [];

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.gridSetupJS.rowDimension;
        let colDimension = global.gridSetupJS.colDimension;

        currStart = gridArray[0][0];
        currTarget = gridArray[rowDimension - 1][colDimension - 1];

        function preSimGARead() {
            changesArr = [];

            for (let row = 0; row < rowDimension; row++) {
                for (let col = 0; col < colDimension; col++) {
                    if (gridArray[row][col].recordedType != gridArray[row][col].type) {
                        changesArr.push(gridArray[row][col]);
                    }

                    gridArray[row][col].recordedType = gridArray[row][col].type;
                }
            }

            console.log(changesArr);
        }

        document.querySelector("#clear-paths-btn").addEventListener("click", function () {
            global.updateJS.clear(gridArray, rowDimension, colDimension, true, false);
            interactionsJS.setSRunning(false);
            interactionsJS.setPFRunning(false);
        });

        document.querySelector("#clear-blocks-btn").addEventListener("click", function () {
            if (!interactionsJS.simulationRunning) {
                global.updateJS.clear(gridArray, rowDimension, colDimension, false, true);
            }
        });

        document.querySelector("#clear-all-btn").addEventListener("click", function () {
            if (!interactionsJS.simulationRunning) {
                global.updateJS.clear(gridArray, rowDimension, colDimension, true, true);
                interactionsJS.setPFRunning(false);
            }
        });

        document.querySelector("#update-path-btn").addEventListener("click", function () {
            //update path btn not working...still under development
            if (!interactionsJS.simulationRunning && interactionsJS.pathfinderRunning) {

                preSimGARead();

                if (changesArr.length != 0) {
                    if (interactionsJS.totalPath) {
                        global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
                    }

                    for (let i = 0; interactionsJS.totalPath && (i < interactionsJS.totalPath.length); i++) {
                        global.updateJS.reconstructDrawUpdate(interactionsJS.totalPath[i], false);
                    }

                    interactionsJS.totalPath = null;
                    interactionsJS.travelIndex = 0;

                    if (interactionsJS.pfType == "aStar") {
                        global.updateJS.clear(gridArray, rowDimension, colDimension, true, false);

                        global.astarAlgorithmJS.aStarPathfinding(currStart,
                            currTarget,
                            interactionsJS.pfSettings.userSettings.heuristicFunc,
                            interactionsJS.pfSettings.userSettings.movementType,
                            interactionsJS.pfSettings.userSettings.cutCorners,
                            interactionsJS.pfSettings.userSettings.speed);
                    }

                    // else if (interactionsJS.pfType == "lpa") {
                    //     global.lpaAlgorithmJS.updateChanges(changesArr);
                    // }
                }
            }
        });

        document.querySelector("#travel-forward-btn").addEventListener("click", function () {
            if (interactionsJS.totalPath && (interactionsJS.totalPath[interactionsJS.travelIndex] != currTarget)) {
                global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
                interactionsJS.travelIndex++;
                global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
            }
        });

        document.querySelector("#travel-backward-btn").addEventListener("click", function () {
            if (interactionsJS.totalPath && (interactionsJS.totalPath[interactionsJS.travelIndex] != currStart)) {
                global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
                interactionsJS.travelIndex--;
                global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
            }
        });

        document.querySelector("#general-form").addEventListener("submit", function (e) {
            e.preventDefault();

            if (!interactionsJS.simulationRunning) {

                let data = new FormData(document.querySelector("#general-form"));

                let userSettings = {
                    algorithm: null,
                    heuristicFunc: null,
                    movementType: null,
                    cutCorners: null,
                    speed: null
                }

                let pfSettings = {
                    startNode: null,
                    targetNode: null,
                    userSettings: userSettings
                };
                interactionsJS.pfSettings = pfSettings;

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
                pfSettings.userSettings.speed = parseInt(pfSettings.userSettings.speed);

                if (pfSettings.userSettings.heuristicFunc == "manhattan") {
                    pfSettings.userSettings.heuristicFunc = global.pathfindingJS.manhattanHFunc;
                }

                else if (pfSettings.userSettings.heuristicFunc == "euclidian") {
                    pfSettings.userSettings.heuristicFunc = global.pathfindingJS.euclidianHFunc;
                }

                global.updateJS.clear(gridArray, rowDimension, colDimension, true, false);

                if (interactionsJS.totalPath) {
                    global.updateJS.toggleTravelerDrawUpdate(interactionsJS.totalPath[interactionsJS.travelIndex]);
                }

                interactionsJS.totalPath = null;
                interactionsJS.travelIndex = 0;

                interactionsJS.setNodesAnalyzed(0);

                if (moveStart) {
                    moveStart = false;
                    global.updateJS.selectedDisabled(currStart);
                }

                if (moveTarget) {
                    moveTarget = false;
                    global.updateJS.selectedDisabled(currTarget);
                }

                interactionsJS.pfType = pfSettings.userSettings.algorithm;

                interactionsJS.setPFRunning(true);

                preSimGARead();

                if (pfSettings.userSettings.algorithm == "aStar") {
                    global.astarAlgorithmJS.aStarPathfinding(currStart,
                        currTarget,
                        pfSettings.userSettings.heuristicFunc,
                        pfSettings.userSettings.movementType,
                        pfSettings.userSettings.cutCorners,
                        pfSettings.userSettings.speed);
                }

                else if (pfSettings.userSettings.algorithm == "lpa") {
                    global.lpaAlgorithmJS.lpaPathfinding(currStart,
                        currTarget,
                        pfSettings.userSettings.heuristicFunc,
                        pfSettings.userSettings.movementType,
                        pfSettings.userSettings.cutCorners,
                        pfSettings.userSettings.speed);
                }
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

            if (!interactionsJS.simulationRunning) {
                if ((gridArrayNode.type == "tile") && !moveStart && !moveTarget) {
                    blockPaint = true;
                    gridArrayNode.setType("block");
                }

                else if ((gridArrayNode.type == "block") && !moveStart && !moveTarget) {
                    tilePaint = true;
                    gridArrayNode.setType("tile");
                }
            }
        });

        gridArrayTile.addEventListener("mouseover", function (e) {
            e.preventDefault();

            if (!interactionsJS.simulationRunning) {
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
                if (!interactionsJS.pathfinderRunning && !interactionsJS.simulationRunning) {
                    if (moveStart) {
                        moveStart = false;
                        global.updateJS.selectedDisabled(currStart);
                    } else {
                        moveStart = true;
                        global.updateJS.selectedEnabled(currStart);
                    }
                }
            }

            else if (gridArrayNode.type == "target") {
                if (!interactionsJS.pathfinderRunning && !interactionsJS.simulationRunning) {
                    if (moveTarget) {
                        moveTarget = false;
                        global.updateJS.selectedDisabled(currTarget);
                    } else {
                        moveTarget = true;
                        global.updateJS.selectedEnabled(currTarget);
                    }
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

            // else if (gridArrayNode.type == "block") {

            // }

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