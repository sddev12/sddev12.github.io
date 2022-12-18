// Initialises the tilemap setting all tiles to 0 or 1 randomly
function initRandomTileMap(width, height, ratio) {
    let initArray = []

    for (let i = 0; i < width; i++) {
        initArray[i] = []
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const tile = Math.random() > ratio ? 0 : 1;
            initArray[x][y] = tile
        }
    }

    return initArray
}


// initialse a 2d array with the dimentions needed. Values all defaulted to 0
function initZeroMap(width, height) {
    let tempBuffer = []
    for (let i = 0; i < width; i++) {
        tempBuffer[i] = []
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            tempBuffer[x][y] = 0
        }
    }

    return tempBuffer
}


// Analyse neighboring tiles and return number of tiles set to 1
function getNeighbourCells(x, y, tileMap) {
    let cellCount = 0

    if (x > 0) {
        cellCount += tileMap.tiles[x - 1][y]

        if (y > 0) {
            cellCount += tileMap.tiles[x - 1][y - 1]
        }
    }


    if (y > 0) {
        cellCount += tileMap.tiles[x][y - 1]

        if (x < tileMap.cols - 1) {
            cellCount += tileMap.tiles[x + 1][y - 1]
        }
    }


    if (x < tileMap.cols - 1) {
        cellCount += tileMap.tiles[x + 1][y]

        if (y < tileMap.rows - 1) {
            cellCount += tileMap.tiles[x + 1][y + 1]
        }
    }


    if (y < tileMap.rows - 1) {
        cellCount += tileMap.tiles[x][y + 1]

        if (x > 0) {
            cellCount += tileMap.tiles[x - 1][y + 1]
        }
    }

    return cellCount
}


// Generate the map using cellular automaton
function generateBaseMap(tileMap, liveNeighboursRequired) {
    let tempBuffer = initZeroMap(tileMap.cols, tileMap.rows)

    for (let x = 0; x < tileMap.cols; x++) {
        for (let y = 0; y < tileMap.rows; y++) {
            let liveCellCount = tileMap.tiles[x][y] + getNeighbourCells(x, y, tileMap)
            tempBuffer[x][y] = liveCellCount > liveNeighboursRequired ? 1 : 0
        }
    }

    return tempBuffer
}

// Generate button onClick
function generateHandler(tileMap, tileAtlas, config) {
    config.ratio = document.getElementById("initialRatio").value
    config.liveNeighboursRequired = document.getElementById("neighbourThreshold").value
    config.iterations = document.getElementById("caPasses").value
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ProcedurallyGenerateMap(tileMap, tileAtlas, config)
}


// Sets the default values of input fields on page load and refresh
function setDefaultInputValues() {
    document.getElementById("initialRatio").value = 0.5;
    document.getElementById("neighbourThreshold").value = 4;
    document.getElementById("caPasses").value = 1;
}


// Reset generator to default values
function resetGenerator(tileMap, tileAtlas, config) {
    config.ratio = 0.5;
    config.liveNeighboursRequired = 4;
    config.iterations = 1;
    setDefaultInputValues();
    ProcedurallyGenerateMap(tileMap, tileAtlas, config);
}


// Generate the final tilemap based on provided config values 
function ProcedurallyGenerateMap(tileMap, tileAtlas, config) {
    tileMap.tiles = initRandomTileMap(config.gridDimention, config.gridDimention, config.ratio)

    for (let i = 0; i < config.iterations; i++) {
        tileMap.tiles = generateBaseMap(tileMap, config.liveNeighboursRequired)
    }

    for (let x = 0; x < tileMap.cols; x++) {
        for (let y = 0; y < tileMap.rows; y++) {
            let tile = tileMap.tiles[x][y]

            ctx.drawImage(
                tileAtlas,
                (tile) * tileMap.tsize,
                0,
                tileMap.tsize,
                tileMap.tsize,
                x * tileMap.tsize,
                y * tileMap.tsize,
                tileMap.tsize,
                tileMap.tsize
            );
        }
    }
}