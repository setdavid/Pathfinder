(function (global) {
    let lpaAlgorithmJS = {};
    global.lpaAlgorithmJS = lpaAlgorithmJS;

    window.addEventListener("DOMContentLoaded", function () {
        let gridArray = global.pathfindingJS.gridArray;
        let rowDimension = global.gridSetupJS.rowDimension;
        let colDimension = global.gridSetupJS.colDimension;

        let pQ = {
            array: [],
            topKey: function () {
                let lowestKey = [Infinity, Infinity];

                for (let i = 0; i < pQ.array.length; i++) {

                    // if (!(pQ.array[i].key[0] == Infinity)) {

                    if (compareKeys(pQ.array[i].key, lowestKey)) {
                        lowestKey[0] = pQ.array[i].key[0];
                        lowestKey[1] = pQ.array[i].key[1];
                        pQ.lowestKeyIndex = i;
                    }

                    // if (pQ.array[i].key[0] < lowestKey[0]) {
                    //     lowestKey[0] = pQ.array[i].key[0];
                    //     lowestKey[1] = pQ.array[i].key[1];
                    //     lowestKeyIndex = i;
                    // }

                    // else if (pQ.array[i].key[0] == lowestKey[0]) {
                    //     if (pQ.array[i].key[1] < lowestKey[1]) {
                    //         lowestKey[1] = pQ.array[i].key[1];
                    //         lowestKeyIndex = i;
                    //     }
                    // }

                    // } 
                    // else {
                    //     return failure("interrupted");
                    // }
                }

                return lowestKey;
            },
            pop: function () {
                let currentNode = pQ.array[pQ.lowestKeyIndex];
                pQ.array.splice(pQ.lowestKeyIndex, 1);
                currentNode.setInPQ(false);
                return currentNode;
            },
            insert: function (insertNode, key) {
                if (!insertNode.inPQ) {
                    insertNode.key = key;
                    pQ.array.push(insertNode);
                    insertNode.setInPQ(true);

                    // global.updateJS.keyDrawUpdate(insertNode);
                }
            },
            remove: function (removeNode) {
                if (removeNode.inPQ) {
                    let index = nodeInArray(removeNode, pQ.array);
                    pQ.array.splice(index, 1);
                    removeNode.setInPQ(false);
                }
            },
            lowestKeyIndex: 0
        };

        function lpaPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout) {
            global.interactionsJS.simulationRunning = true;

            pQ.array = new Array();
            pQ.lowestKeyIndex = 0;

            initialize();

            computeShortestPath();

            // whileLoop();
            // function whileLoop() { }

            function calculateKey(node) {
                return [Math.min(node.gValue, node.rhsValue) + heuristicFunc(node, targetNode),
                Math.min(node.gValue, node.rhsValue)];
            }

            function initialize() {
                startNode.rhsValue = 0;
                pQ.insert(startNode, [heuristicFunc(startNode, targetNode), 0]);
            }

            function updateVertex(node) {
                if (node != startNode) {

                    let predRhsArray = [];
                    for (let i = 0; i < node.pred.length; i++) {
                        predRhsArray.push(node.pred[i].gValue + weightFunc(node, node.pred[i]));
                    }

                    node.rhsValue = Math.min.apply(null, predRhsArray);
                }

                if (node.inPQ) {
                    pQ.remove(node);
                }

                if (node.gValue != node.rhsValue) {
                    pQ.insert(node, calculateKey(node));
                } else {
                    node.setLocalCon();
                }

                global.interactionsJS.setNodesAnalyzed(global.interactionsJS.nodesAnalyzed + 1);
            }

            function computeShortestPath() {
                let currentNode = pQ.pop();
                updateSuccessors(currentNode);

                if (currentNode.gValue > currentNode.rhsValue) {
                    currentNode.gValue = currentNode.rhsValue;

                    currentNode.setLocalCon();

                    for (let i = 0; i < currentNode.succ.length; i++) {
                        updateVertex(currentNode.succ[i]);
                    }
                } else {
                    currentNode.gValue = Infinity;

                    for (let i = 0; i < currentNode.succ.length; i++) {
                        updateVertex(currentNode.succ[i]);
                    }

                    updateVertex(currentNode);
                }

                if ((compareKeys(pQ.topKey(), calculateKey(targetNode))) || (targetNode.rhsValue != targetNode.gValue)) {
                    return window.setTimeout(function () {
                        computeShortestPath();
                    }, timeout);
                } else {
                    if (currentNode == targetNode) {
                        reconstructPath(currentNode);
                    } else {
                        if (global.interactionsJS.simulationRunning) {
                            return failure("no path");
                        } else {
                            return failure("interrupted");
                        }
                    }
                }
            }

            function updateSuccessors(currentNode) {
                let succ = [];

                for (let row = currentNode.row - 1; row <= currentNode.row + 1; row++) {
                    for (let col = currentNode.col - 1; col <= currentNode.col + 1; col++) {
                        if ((row >= 0 && row < rowDimension) &&
                            (col >= 0 && col < colDimension) &&
                            !(row == currentNode.row && col == currentNode.col) &&
                            (gridArray[row][col].type != "block") &&
                            (nodeInArray(gridArray[row][col], currentNode.pred) === null) &&
                            (moveRestrictions(row, col, currentNode))) {
                            let neighborNode = gridArray[row][col];
                            succ.push(neighborNode);

                            if (nodeInArray(currentNode, neighborNode.pred) === null) {
                                neighborNode.pred.push(currentNode);
                            }
                        }
                    }
                }

                currentNode.succ = succ;
            }

            function moveRestrictions(row, col, currentNode) {
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

                    return locationInfo;
                }
            }

            function reconstructPath(currentNode) {
                let totalPath = new Array();

                while ((currentNode != startNode) && global.interactionsJS.simulationRunning) {
                    reconstructUpdate();

                    let nextNode = currentNode.pred[0];

                    for (let i = 0; i < currentNode.pred.length; i++) {
                        if ((currentNode.pred[i].gValue < nextNode.gValue) ||
                            ((currentNode.pred[i].gValue == nextNode.gValue) &&
                                (currentNode.pred[i].key[0] < nextNode.key[0]))) {
                            nextNode = currentNode.pred[i];
                        }
                    }

                    currentNode = nextNode;
                }

                if (global.interactionsJS.simulationRunning) {
                    reconstructUpdate();

                    global.updateJS.pathLengthUpdate(targetNode.gValue);
                    global.updateJS.pathBlockLengthUpdate(totalPath.length - 1);

                    global.interactionsJS.totalPath = totalPath;
                    global.updateJS.toggleTravelerDrawUpdate(totalPath[global.interactionsJS.travelIndex]);
                } else {
                    return failure("interrupted");
                }

                function reconstructUpdate() {
                    if (!global.interactionsJS.simulationRunning) {
                        return failure("interrupted");
                    } else {
                        if (!currentNode.inPQ) {
                            totalPath.unshift(currentNode);
                            global.updateJS.reconstructDrawUpdate(currentNode);
                        }
                    }
                }

                global.interactionsJS.simulationRunning = false;

                return totalPath;
            }
        }

        //return true if key1 < key2
        //return false if key2 < key1
        function compareKeys(key1, key2) {
            if (key1[0] < key2[0]) {
                return true;
            }

            else if (key1[0] == key2[0]) {
                if (key1[1] < key2[1]) {
                    return true;
                } else {
                    return false;
                }
            }

            else {
                return false;
            }
        }

        function weightFunc(currentNode, neighborNode) {
            return global.pathfindingJS.euclidianHFunc(currentNode, neighborNode);
        }

        function nodeInArray(node, array) {
            let nodeIndex = null;
            let nodeFound = false;

            for (let i = 0; (i < array.length) && (!nodeFound); i++) {
                if (node == array[i]) {
                    nodeIndex = i;
                    nodeFound = true;
                }
            }

            return nodeIndex;
        }

        function failure(reason) {
            let explanation = "";

            if (reason == "no path") {
                explanation = "no path found";
            } else {
                explanation = "simulation interrupted";
            }

            console.log(explanation);
            global.updateJS.pathLengthUpdate(explanation);
            global.updateJS.pathBlockLengthUpdate(explanation);
            global.interactionsJS.setNodesAnalyzed(explanation);

            global.interactionsJS.simulationRunning = false;
        }

        lpaAlgorithmJS.lpaPathfinding = function (startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout) {
            lpaPathfinding(startNode, targetNode, heuristicFunc, movementType, cutCorners, timeout);
        };
    });
})(window);