(function (global) {
    let astarAlgorithmJS = {};
    global.astarAlgorithmJS = astarAlgorithmJS;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.pathfindingJS.rowDimension;
        let colDimension = global.pathfindingJS.colDimension;
        let timeout = 10;
        let openSet = new Array();
        let closedSet = new Array();

        function aStarPathfinding(startNode, targetNode, heuristicFunc, movementType) {
            openSet.push(startNode);
            startNode.h = heuristicFunc(startNode, targetNode);
            startNode.fScore = startNode.h;

            startNode.setInOpenSet(true);
            startNode.gScore = 0;
            startNode.fScore = heuristicFunc(startNode, targetNode);

            whileLoop();

            function whileLoop() {
                let currentNode = lowestfScoreSearch();

                if (!currentNode) {
                    return failure();
                }

                openSet.splice(currentNode.indexInOpenSet, 1);
                currentNode.setInOpenSet(false);
                closedSet.push(currentNode);
                currentNode.setInClosedSet(true);

                if (currentNode === targetNode) {
                    return reconstructPath(startNode, currentNode);
                }

                analyzeNeighbors(currentNode, targetNode, heuristicFunc, movementType);

                if (openSet.length != 0) {
                    window.setTimeout(function () {
                        whileLoop();
                    }, timeout);
                } else {
                    return failure();
                }
            }

            // while (openSet.length != 0) {
            //     let currentNode = lowestfScoreSearch();
            //     console.log(currentNode);

            //     if (currentNode === targetNode) {
            //         return reconstructPath(closedSet, currentNode);
            //     }

            //     openSet.splice(currentNode.indexInOpenSet, 1);
            //     currentNode.inOpenSet = false;
            //     closedSet.push(currentNode);
            //     currentNode.inClosedSet = true;
            //     global.updateJS.closedSetDrawUpdate(currentNode);

            //     analyzeNeighbors(currentNode, targetNode);
            // }
        }

        function lowestfScoreSearch() {
            let lowestfScore = Infinity;
            let lowestfScoreNode = null;
            for (let i = 0; i < openSet.length; i++) {
                if (!openSet[i].inClosedSet) {
                    if (openSet[i].fScore < lowestfScore) {
                        lowestfScore = openSet[i].fScore;
                        lowestfScoreNode = openSet[i];
                        lowestfScoreNode.indexInOpenSet = i;
                    }

                    else if (openSet[i].fScore == lowestfScore) {
                        if (openSet[i].h < lowestfScoreNode.h) {
                            lowestfScoreNode = openSet[i];
                            lowestfScoreNode.indexInOpenSet = i;
                        }
                    }
                }
            }

            return lowestfScoreNode;
        }

        function analyzeNeighbors(currentNode, targetNode, heuristicFunc, movementType) {
            for (let row = currentNode.row - 1; row <= currentNode.row + 1; row++) {
                for (let col = currentNode.col - 1; col <= currentNode.col + 1; col++) {
                    if (!(row == currentNode.row && col == currentNode.col) && moveRestrictions(movementType, row, col, currentNode)) {
                        if ((row >= 0 && row < rowDimension) &&
                            (col >= 0 && col < colDimension) &&
                            (!gridArray[row][col].inClosedSet) &&
                            (gridArray[row][col].type != "block")) {
                            let neighborNode = gridArray[row][col];
                            let potentialgScore = currentNode.gScore + weightFunc(currentNode, neighborNode);

                            if (potentialgScore < neighborNode.gScore) {
                                neighborNode.cameFrom = currentNode;
                                neighborNode.gScore = potentialgScore;
                                neighborNode.h = heuristicFunc(neighborNode, targetNode);
                                neighborNode.fScore = neighborNode.gScore + neighborNode.h;
                                // global.updateJS.fScoreDrawUpdate(neighborNode);
                            }

                            if (!neighborNode.inOpenSet) {
                                openSet.push(neighborNode);
                                neighborNode.setInOpenSet(true);
                            }
                        }
                    }
                }
            }
        }

        function weightFunc(currentNode, neighborNode) {
            return global.pathfindingJS.euclidianHFunc(currentNode, neighborNode);
        }

        function moveRestrictions(movementType, row, col, currentNode) {
            if (movementType == "diagonal") {
                return true;
            }

            else if (movementType == "nondiagonal") {
                if (!((row == currentNode.row - 1) && (col == currentNode.col - 1)) &&
                    !((row == currentNode.row - 1) && (col == currentNode.col + 1)) &&
                    !((row == currentNode.row + 1) && (col == currentNode.col - 1)) &&
                    !((row == currentNode.row + 1) && (col == currentNode.col + 1))) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function reconstructPath(startNode, currentNode) {
            let totalPath = new Array(currentNode);
            let targetNode = currentNode;

            while (currentNode != startNode) {
                reconstructUpdate();

                currentNode = currentNode.cameFrom;
            }

            reconstructUpdate();

            function reconstructUpdate() {
                if (currentNode.inClosedSet && !currentNode.inOpenSet) {
                    totalPath.unshift(currentNode);
                    global.updateJS.reconstructDrawUpdate(currentNode);
                }
            }

            travelPath(0);

            function travelPath(travelIndex) {
                if (totalPath[travelIndex] == targetNode) {
                    return;
                } else {
                    global.updateJS.toggleTravelerDrawUpdate(totalPath[travelIndex]);
                    window.setTimeout(function () {
                        global.updateJS.toggleTravelerDrawUpdate(totalPath[travelIndex]);

                        travelPath(travelIndex + 1);
                    }, 150);

                }
            }

            return totalPath;
        }

        function failure() {
            console.log("failed");
        }

        astarAlgorithmJS.aStarPathfinding = function (startNode, targetNode, heuristicFunc, movementType) {
            aStarPathfinding(startNode, targetNode, heuristicFunc, movementType);
        };
    });
})(window);