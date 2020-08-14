(function (global) {
    let astarAlgorithmJS = {};
    global.astarAlgorithmJS = astarAlgorithmJS;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.pathfindingJS.rowDimension;
        let colDimension = global.pathfindingJS.colDimension;
        let timeout = 10;
        let openSet;
        let closedSet;

        function aStarPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners) {
            openSet = new Array();
            closedSet = new Array();

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

                analyzeNeighbors(currentNode, targetNode, heuristicFunc, movementType, cutCorners);

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

        function analyzeNeighbors(currentNode, targetNode, heuristicFunc, movementType, cutCorners) {
            for (let row = currentNode.row - 1; row <= currentNode.row + 1; row++) {
                for (let col = currentNode.col - 1; col <= currentNode.col + 1; col++) {
                    if ((row >= 0 && row < rowDimension) &&
                        (col >= 0 && col < colDimension) &&
                        !(row == currentNode.row && col == currentNode.col) &&
                        (!gridArray[row][col].inClosedSet) &&
                        (gridArray[row][col].type != "block")) {
                        if (moveRestrictions(movementType, cutCorners, row, col, currentNode, gridArray)) {
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

        function moveRestrictions(movementType, cutCorners, row, col, currentNode, gridArray) {
            let mtAllowed = false;
            let ccAllowed = false;

            if (movementType == "diagonal") {
                mtAllowed = true;

                if (cutCorners) {
                    ccAllowed = true;
                } else {
                    let cornerLocation = locatedOnCorner();
                    let ccAllowedY = false;
                    let ccAllowedX = false;

                    if (cornerLocation[2] < 2) {
                        ccAllowed = true;
                    } else {
                        if (cornerLocation[0] == "top") {
                            if (gridArray[row + 1][col].type != "block") {
                                ccAllowedY = true;
                            } else {
                                ccAllowedY = false;
                            }
                        }

                        else if (cornerLocation[0] == "bottom") {
                            if (gridArray[row - 1][col].type != "block") {
                                ccAllowedY = true;
                            } else {
                                ccAllowedY = false;
                            }
                        }

                        if (cornerLocation[1] == "left") {
                            if (gridArray[row][col + 1].type != "block") {
                                ccAllowedX = true;
                            } else {
                                ccAllowedX = false;
                            }
                        }

                        else if (cornerLocation[1] == "right") {
                            if (gridArray[row][col - 1].type != "block") {
                                ccAllowedX = true;
                            } else {
                                ccAllowedX = false;
                            }
                        }

                        if (ccAllowedX && ccAllowedY) {
                            ccAllowed = true;
                        } else {
                            ccAllowed = false;
                        }
                    }
                }
            }

            else if (movementType == "nondiagonal") {
                ccAllowed = true;

                if (locatedOnCorner()[2] < 2) {
                    mtAllowed = true;
                } else {
                    mtAllowed = false;
                }
            }

            if (mtAllowed && ccAllowed) {
                return true;
            } else {
                return false;
            }

            function locatedOnCorner() {
                let locationInfo = new Array();
                let numItems = 0;

                if (row == currentNode.row - 1) {
                    locationInfo[0] = "top";
                    numItems++;
                }

                else if (row == currentNode.row + 1) {
                    locationInfo[0] = "bottom";
                    numItems++;
                }

                if (col == currentNode.col - 1) {
                    locationInfo[1] = "left";
                    numItems++;
                }

                else if (col == currentNode.col + 1) {
                    locationInfo[1] = "right";
                    numItems++;
                }

                locationInfo[2] = numItems;

                console.log(locationInfo);
                return locationInfo;
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

        astarAlgorithmJS.aStarPathfinding = function (startNode, targetNode, heuristicFunc, movementType, cutCorners) {
            aStarPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners);
        };
    });
})(window);