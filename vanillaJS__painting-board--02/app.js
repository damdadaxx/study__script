
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_SIZE_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = CANVAS_SIZE_WIDTH;
canvas.height = CANVAS_SIZE_HEIGHT;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {

    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[💜]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))


if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}


// 클릭하지 않고 마우스를 움직였을 때에는 path를 시작한다. 
// path를 만들면 마우스의 x,y 좌표로 path를 옮긴다.
// 마우스를 움직이는 모든 순간에 path를 만든다.
// path의 시작점은 내 마우스가 있는 곳이다.
// 내가 클릭하면 (mousedown) startPainting 된다. 즉, painting = true;
// 여전히 마우스를 움직이고 있다면 onMouseMove 실행되고 있고, painting중이니까 if문은 실행되지 않고, else문이 실행된다. ctx.lineTo(x, y); & ctx.stroke(); -> 마우스를 움직이는 내내 발생
// 이 예제에서 가장 중요하게 기억해야할 것은 마우스가 움직이면 항상 path가 그려진다. 다만 클릭하지 않았으므로 눈에 보이는 path이 그려지지 않는 것이다. 마우스를 클릭하게 된다면 path를 우리 눈에 보이도록 그려준다.
