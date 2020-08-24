(function (global) {
    let lpaAlgorithmJS = {};
    global.lpaAlgorithmJS = lpaAlgorithmJS;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.gridSetupJS.rowDimension;
        let colDimension = global.gridSetupJS.colDimension;

        let pQ = {
            array =[],
            topKey = function () { },
            pop = function () { },
            insert = function () { },
            remove = function () { }
        };

        function lpaPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout) {
            global.interactionsJS.simulationRunning = true;

            pQ.array = new Array();

            whileLoop();

            function whileLoop() {

            }
        }

        function calculateKey(gridArrayNode) {
            gridArrayNode.key = [,];
        }

        function initialize() {

        }

        function updateVertex() {

        }

        function computeShortestPath() {

        }

        // function lowestfScoreSearch() {
        //     let lowestfScore = Infinity;
        //     let lowestfScoreNode = null;
        //     for (let i = 0; i < openSet.length; i++) {

        //         if (!(openSet[i].fScore == Infinity)) {
        //             if (openSet[i].fScore < lowestfScore) {
        //                 lowestfScore = openSet[i].fScore;
        //                 lowestfScoreNode = openSet[i];
        //                 lowestfScoreNode.indexInOpenSet = i;
        //             }

        //             else if (openSet[i].fScore == lowestfScore) {
        //                 if (openSet[i].gScore < lowestfScoreNode.gScore) {
        //                     lowestfScoreNode = openSet[i];
        //                     lowestfScoreNode.indexInOpenSet = i;
        //                 }
        //             }
        //         } else {
        //             return failure("interrupted");
        //         }
        //     }

        //     return lowestfScoreNode;
        // }

        // function analyzeNeighbors(currentNode, targetNode, heuristicFunc, movementType, cutCorners) {
        //     for (let row = currentNode.row - 1; row <= currentNode.row + 1; row++) {
        //         for (let col = currentNode.col - 1; col <= currentNode.col + 1; col++) {
        //             if ((row >= 0 && row < rowDimension) &&
        //                 (col >= 0 && col < colDimension) &&
        //                 !(row == currentNode.row && col == currentNode.col) &&
        //                 (!gridArray[row][col].inClosedSet) &&
        //                 (gridArray[row][col].type != "block")) {
        //                 if (moveRestrictions(movementType, cutCorners, row, col, currentNode, gridArray)) {
        //                     let neighborNode = gridArray[row][col];
        //                     let potentialgScore = currentNode.gScore + weightFunc(currentNode, neighborNode);

        //                     if (potentialgScore < neighborNode.gScore) {
        //                         neighborNode.cameFrom = currentNode;
        //                         neighborNode.gScore = potentialgScore;
        //                         neighborNode.h = heuristicFunc(neighborNode, targetNode);
        //                         neighborNode.fScore = neighborNode.gScore + neighborNode.h;

        //                         // global.updateJS.fScoreDrawUpdate(neighborNode);
        //                     }

        //                     if (!neighborNode.inOpenSet) {
        //                         openSet.push(neighborNode);
        //                         neighborNode.setInOpenSet(true);
        //                     }

        //                     global.interactionsJS.nodesAnalyzed++;
        //                     global.updateJS.nodesAnalyzedUpdate(global.interactionsJS.nodesAnalyzed);
        //                 }
        //             }
        //         }
        //     }
        // }

        // function weightFunc(currentNode, neighborNode) {
        //     return global.pathfindingJS.euclidianHFunc(currentNode, neighborNode);
        // }

        // function moveRestrictions(movementType, cutCorners, row, col, currentNode, gridArray) {
        //     let mtAllowed = false;
        //     let ccAllowed = false;

        //     if (movementType == "diagonal") {
        //         mtAllowed = true;

        //         if (cutCorners) {
        //             ccAllowed = true;
        //         } else {
        //             let cornerLocation = locatedOnCorner();
        //             let ccAllowedY = false;
        //             let ccAllowedX = false;

        //             if (cornerLocation[2] < 2) {
        //                 ccAllowed = true;
        //             } else {
        //                 if (cornerLocation[0] == "top") {
        //                     if (gridArray[row + 1][col].type != "block") {
        //                         ccAllowedY = true;
        //                     } else {
        //                         ccAllowedY = false;
        //                     }
        //                 }

        //                 else if (cornerLocation[0] == "bottom") {
        //                     if (gridArray[row - 1][col].type != "block") {
        //                         ccAllowedY = true;
        //                     } else {
        //                         ccAllowedY = false;
        //                     }
        //                 }

        //                 if (cornerLocation[1] == "left") {
        //                     if (gridArray[row][col + 1].type != "block") {
        //                         ccAllowedX = true;
        //                     } else {
        //                         ccAllowedX = false;
        //                     }
        //                 }

        //                 else if (cornerLocation[1] == "right") {
        //                     if (gridArray[row][col - 1].type != "block") {
        //                         ccAllowedX = true;
        //                     } else {
        //                         ccAllowedX = false;
        //                     }
        //                 }

        //                 if (ccAllowedX && ccAllowedY) {
        //                     ccAllowed = true;
        //                 } else {
        //                     ccAllowed = false;
        //                 }
        //             }
        //         }
        //     }

        //     else if (movementType == "nondiagonal") {
        //         ccAllowed = true;

        //         if (locatedOnCorner()[2] < 2) {
        //             mtAllowed = true;
        //         } else {
        //             mtAllowed = false;
        //         }
        //     }

        //     if (mtAllowed && ccAllowed) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        //     function locatedOnCorner() {
        //         let locationInfo = new Array();
        //         let numItems = 0;

        //         if (row == currentNode.row - 1) {
        //             locationInfo[0] = "top";
        //             numItems++;
        //         }

        //         else if (row == currentNode.row + 1) {
        //             locationInfo[0] = "bottom";
        //             numItems++;
        //         }

        //         if (col == currentNode.col - 1) {
        //             locationInfo[1] = "left";
        //             numItems++;
        //         }

        //         else if (col == currentNode.col + 1) {
        //             locationInfo[1] = "right";
        //             numItems++;
        //         }

        //         locationInfo[2] = numItems;

        //         return locationInfo;
        //     }
        // }

        // function reconstructPath(startNode, currentNode) {
        //     let totalPath = new Array();
        //     let targetNode = currentNode;

        //     while (currentNode != startNode) {
        //         reconstructUpdate();

        //         currentNode = currentNode.cameFrom;
        //     }

        //     reconstructUpdate();

        //     global.updateJS.pathLengthUpdate(targetNode.gScore);
        //     global.updateJS.pathBlockLengthUpdate(totalPath.length - 1);

        //     global.interactionsJS.totalPath = totalPath;
        //     global.updateJS.toggleTravelerDrawUpdate(totalPath[global.interactionsJS.travelIndex]);

        //     function reconstructUpdate() {
        //         if (currentNode.inClosedSet && !currentNode.inOpenSet) {
        //             totalPath.unshift(currentNode);
        //             global.updateJS.reconstructDrawUpdate(currentNode);
        //         }
        //     }

        //     global.interactionsJS.simulationRunning = false;

        //     return totalPath;
        // }

        // function failure(reason) {
        //     let explanation = "";

        //     if (reason == "no path") {
        //         explanation = "no path found";
        //     } else {
        //         explanation = "simulation interrupted"
        //     }

        //     console.log(explanation);
        //     global.updateJS.pathLengthUpdate(explanation);
        //     global.updateJS.pathBlockLengthUpdate(explanation);
        //     global.updateJS.nodesAnalyzedUpdate(explanation);

        //     global.interactionsJS.simulationRunning = false;
        // }

        astarAlgorithmJS.lpaPathfinding = function (startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout) {
            lpaPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout);
        };
    });
})(window);