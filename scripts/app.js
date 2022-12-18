/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("gameCanvas");
let generate = document.getElementById("generate");
let reset = document.getElementById("reset")

// config
let config = {
    gridDimention: 57,
    ratio: 0.5,
    liveNeighboursRequired: 4,
    iterations: 1
}

generate.addEventListener('click', () => {
    generateHandler(tileMap, tileAtlas, config);
});


reset.addEventListener('click', () => {
    resetGenerator(tileMap, tileAtlas, config);
});

const tileMap = {
    tsize: 16,
    cols: config.gridDimention,
    rows: config.gridDimention,
    tiles: []
};

canvas.width = tileMap.tsize * tileMap.cols;
canvas.height = tileMap.tsize * tileMap.rows;

const ctx = canvas.getContext("2d");

const tileAtlas = new Image();
tileAtlas.src = "assets/Tiles16x16.png";

tileAtlas.addEventListener('load', () => {
    setDefaultInputValues();
    ProcedurallyGenerateMap(tileMap, tileAtlas, config)
});