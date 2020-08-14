(function (global) {
    let pathfindingJS = {};
    global.pathfindingJS = pathfindingJS;

    window.addEventListener("DOMContentLoaded", function () {
        let rowDimension = global.gridSetupJS.rowDimension;
        let colDimension = global.gridSetupJS.colDimension;
        let scale = 10;

        let gridArray = new Array();

        let startNode = null;
        let targetNode = null;

        for (let row = 0; row < rowDimension; row++) {
            gridArray[row] = new Array();

            for (let col = 0; col < colDimension; col++) {
                let selectedType = null;
                let randomNum = Math.random();
                if (randomNum < 0.3) {
                    selectedType = "block";
                } else {
                    selectedType = "tile";
                }

                gridArray[row][col] = {
                    type: selectedType,
                    row: row,
                    col: col,
                    posX: col,
                    posY: row,
                    indexInOpenSet: 0,
                    inOpenSet: false,
                    setInOpenSet: function (newValue) {
                        gridArray[row][col].inOpenSet = newValue;
                        if (newValue) {
                            global.updateJS.openSetDrawUpdate(gridArray[row][col]);
                        }
                    },
                    inClosedSet: false,
                    setInClosedSet: function (newValue) {
                        gridArray[row][col].inClosedSet = newValue;
                        if (newValue) {
                            global.updateJS.closedSetDrawUpdate(gridArray[row][col]);
                        }
                    },
                    gScore: Infinity,
                    h: Infinity,
                    fScore: Infinity,
                    cameFrom: null
                };

                if (selectedType == "block") {
                    global.updateJS.blockDrawUpdate(gridArray[row][col]);
                }

                if (row == 0 && col == 0) {
                    startNode = gridArray[0][0];
                    gridArray[0][0].type = "start"
                    global.updateJS.startDrawUpdate(gridArray[0][0]);
                }

                else if (row == (rowDimension - 1) && col == (colDimension - 1)) {
                    targetNode = gridArray[rowDimension - 1][colDimension - 1];
                    gridArray[rowDimension - 1][colDimension - 1].type = "target"
                    global.updateJS.targetDrawUpdate(gridArray[rowDimension - 1][colDimension - 1]);
                }

                global.interactionsJS.installEventListeners(gridArray[row][col]);
            }
        }

        function euclidianHFunc(node, targetNode) {
            return scale * Math.sqrt(
                Math.pow(Math.abs(node.posX - targetNode.posX), 2) +
                Math.pow(Math.abs(node.posY - targetNode.posY), 2))
        }

        pathfindingJS.euclidianHFunc = function (node, targetNode) {
            return euclidianHFunc(node, targetNode);
        };


        function manhattanHFunc(node, targetNode) {
            return scale * (Math.abs(node.posX - targetNode.posX) + Math.abs(node.posY - targetNode.posY));
        }

        pathfindingJS.manhattanHFunc = function (node, targetNode) {
            return manhattanHFunc(node, targetNode);
        };

        //testing purposes
        // document.querySelector("#tile0404").addEventListener("click", function () {
        //     gridArray[0][0].fScore += 1;
        //     updateJS.fScoreDrawUpdate(gridArray[0][0]);
        //     updateJS.openSetDrawUpdate(gridArray[0][0]);
        // });

        document.querySelector("#tile0000").addEventListener("click", function () {
            // gridArray[0][1].fScore += 1;
            // updateJS.fScoreDrawUpdate(gridArray[0][1]);
            // updateJS.closedSetDrawUpdate(gridArray[0][0]);

            global.astarAlgorithmJS.aStarPathfinding(gridArray[0][0], gridArray[rowDimension - 1][colDimension - 1], euclidianHFunc, "nondiagonal");
        });

        pathfindingJS.gridArray = gridArray;
        pathfindingJS.rowDimension = rowDimension;
        pathfindingJS.colDimension = colDimension;
    });

})(window);