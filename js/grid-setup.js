(function (global) {
    let gridSetupJS = {};
    global.gridSetupJS = gridSetupJS;

    window.addEventListener("DOMContentLoaded", function () {
        let baseSS = document.styleSheets[0];
        let baseSSRules = baseSS.cssRules;
        let gridCSSRule = null;
        let gridDivCSSRule = null;

        let rowDimension = 10;
        let colDimension = 10;
        gridSetupJS.rowDimension = rowDimension;
        gridSetupJS.colDimension = colDimension;

        let gridElem = document.querySelector("#grid");

        gridElem.innerHTML = "";

        for (let row = 0; row < rowDimension; row++) {
            for (let col = 0; col < colDimension; col++) {
                let rowString = "" + row;
                let colString = "" + col;

                if (row < 10) {
                    rowString = "0" + row;
                }

                if (col < 10) {
                    colString = "0" + col;
                }

                gridElem.innerHTML += "<div id='tile" + rowString + colString + "'><div></div></div>";
            }
        }

        function fitWindow() {
            let tileSize = 75 / rowDimension;

            for (let i = 0; i < baseSSRules.length; i++) {
                if (baseSSRules[i].selectorText == "#grid") {
                    gridCSSRule = baseSSRules[i];
                }

                if (baseSSRules[i].selectorText == "#grid > div") {
                    gridDivCSSRule = baseSSRules[i];
                }
            }

            if (window.innerWidth > window.innerHeight) {
                gridCSSRule.style.width = "75vh";
                gridCSSRule.style.gridTemplateColumns = "repeat(" + colDimension + ", " + tileSize + "vh)";
                gridCSSRule.style.gridTemplateRows = "repeat(" + rowDimension + ", " + tileSize + "vh)";
                gridDivCSSRule.style.height = tileSize + "vh";
            } else {
                gridCSSRule.style.width = "75vw";
                gridCSSRule.style.gridTemplateColumns = "repeat(" + colDimension + ", " + tileSize + "vw)";
                gridCSSRule.style.gridTemplateRows = "repeat(" + rowDimension + ", " + tileSize + "vw)";
                gridDivCSSRule.style.height = tileSize + "vw";
            }
        }

        gridSetupJS.fitWindow = function () {
            fitWindow();
        };

        fitWindow();

        window.addEventListener("resize", fitWindow);
    });

})(window);