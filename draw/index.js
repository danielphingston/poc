const red = document.getElementById("red");
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//get hieght and width from the video element
//and set it to the canvas height and width
const { offsetWidth: width, offsetHeight: height } =
    document.getElementById("video");

ctx.canvas.width = width;
ctx.canvas.height = height;

const coordinates = new Map();

const TYPES = {
    line: "line",
    rect: "rect",
};

function addButtons() {
    const buttons = [
        {
            name: "blue1",
            color: "blue",
            type: "rect",
        },
        {
            name: "red1",
            color: "red",
            type: "rect",
        },
        {
            name: "green1",
            color: "green",
            type: "line",
        },
        {
            name: "yellow1",
            color: "yellow",
            type: "line",
        },
    ];

    const buttonsDiv = document.getElementById("buttons");

    buttons.forEach((button) => {
        const btn = document.createElement("button");
        btn.innerHTML = button.name;
        btn.onclick = () => {
            if (button.type === TYPES.rect) {
                drawRect(button.name, button.color);
            } else {
                drawLine(button.name, button.color);
            }
        };
        buttonsDiv.appendChild(btn);
    });

    const scale = document.createElement("button");
    scale.innerHTML = "scale";
    scale.onclick = () =>
        coordinates.forEach((element) => {
            console.log("coordinates: ", element);
            console.log("scaled: ", scaleCoordinatesToVideo(element));
        });
    buttonsDiv.append(scale);
}

addButtons();

function getInitialPoint(event, canvas) {
    const boundingRect = canvas.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;
    return { boundingRect, x, y };
}

function getRectCoordinates(x, y, event, rect) {
    return {
        x1: x,
        y1: y,
        x2: event.clientX - rect.left - x,
        y2: event.clientY - rect.top - y,
    };
}

function getLineCoordinates(x, y, event) {
    return { x1: x, y1: y, x2: event.offsetX, y2: event.offsetY };
}

function _drawRect(coordinates, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.rect(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2);
    ctx.stroke();
}

function _drawLine(coordinates, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(coordinates.x1, coordinates.y1);
    ctx.lineTo(coordinates.x2, coordinates.y2);
    ctx.stroke();
}

function rePaint() {
    ctx.clearRect(0, 0, width, height);
    coordinates.forEach((element) => {
        if (element.type == TYPES.rect) {
            _drawRect(element.coordinates, element.color);
        } else {
            _drawLine(element.coordinates, element.color);
        }
    });
}

function drawRect(name, color) {
    coordinates.delete(name);
    let coordinate;
    canvas.onclick = (event) => {
        const { boundingRect, x, y } = getInitialPoint(event, canvas);
        if (!canvas.onmousemove) {
            canvas.onmousemove = function (event) {
                rePaint();
                coordinate = getRectCoordinates(x, y, event, boundingRect);
                _drawRect(coordinate, color);
            };
        } else {
            canvas.onmousemove = null;
            canvas.onclick = null;
            coordinates.set(name, {
                color,
                coordinates: coordinate,
                type: TYPES.rect,
            });
        }
    };
}

function drawLine(name, color) {
    coordinates.delete(name);

    let coordinate;
    canvas.onclick = (event) => {
        const { x, y } = getInitialPoint(event, canvas);
        if (!canvas.onmousemove) {
            canvas.onmousemove = function (event) {
                rePaint();
                coordinate = getLineCoordinates(x, y, event);
                _drawLine(coordinate, color);
            };
        } else {
            canvas.onmousemove = null;
            canvas.onclick = null;
            coordinates.set(name, {
                coordinates: coordinate,
                color,
                type: TYPES.line,
            });
        }
    };
}

function scaleCoordinatesToVideo(coordinate) {
    const video = document.getElementById("video");
    const { videoWidth, videoHeight, clientHeight, clientWidth } = video;
    const height = videoHeight / clientHeight;
    const width = videoWidth / clientWidth;
    let x1, x2, y1, y2;
    if (coordinate.type == TYPES.rect) {
        x1 = coordinate.coordinates.x1 * width;
        y1 = coordinate.coordinates.y1 * height;
        x2 = (coordinate.coordinates.x2 + coordinate.coordinates.x1) * width;
        y2 = (coordinate.coordinates.y2 + coordinate.coordinates.y1) * height;
    } else {
        x1 = coordinate.coordinates.x1 * width;
        y1 = coordinate.coordinates.y1 * height;
        x2 = coordinate.coordinates.x2 * width;
        y2 = coordinate.coordinates.y2 * height;
    }

    x1 = Math.max(0, Math.round(x1));
    x2 = Math.min(videoWidth, Math.round(x2));
    y1 = Math.max(0, Math.round(y1));
    y2 = Math.min(videoHeight, Math.round(y2));

    return {
        x1,
        y1,
        x2,
        y2,
    };
}
