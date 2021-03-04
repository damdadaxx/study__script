
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

// default에 의해서 하얀 배경이 된다.
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT);

// context의 default를 설정한다. 예를들어 context는 fillColor를 가지고 있다.
// 처음 사용할 때에는 첫 번째 색(검정색)으로 시작하도록 설정한다.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// lineWidth 는 <input>의 range의 기능과 같다. 이것으로 작게 혹은 크게 만들 수 있다.
ctx.lineWidth = 2.5;

// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 40);


// painting은 기본적으로 false 하지만 마우스를 클릭했을 때에는 true
let painting = false;
let filling = false;

// painting을 하다가 캔버스를 벗어나면 painting은 다시 false로 설정되어야 한다.
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // console.log(event);
    // clientX,Y는 이 윈도우 전체 범위 내에서 마우스 위치값을 나타내는 것이다. 
    // 우리는 캔버스 내에서의 좌표만 필요하다. 
    // 만약에 윈도우 전체가 캔버스라면 offsetX,Y와 clientX,Y는 차이가 없을 것이다.
    // 우리의 경우에는 캔버스가 다른 X&Y를 가질 것이고, 스크린도 다른 X&Y를 가질 것이다.
    // 우리는 이벤트 안에서 offsetX와 offsetY를 이용해보자.
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log("x: " + x + "y: " + y);
    // 모든 움직임을 감지하고 라인들을 만들어야 한다.
    // 시작점에서 부터 끝낼 때까지 라인을 만들기 위해 클릭하기를 기다린다.
    // path를 만드는 건 기본적으로 선(line), 선의 시작점을 만드는 것이다.
    // 시작점은 마우스가 움직이는 곳이라면 어디든지 가능하다.
    // 하지만 클릭하고 나면 시작점부터 클릭한 곳까지 선을 만든다.

    // 만약 painting이 아니라면
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // path의 마지막 점에 연결하는 건, 먼저 path를 만들어야 한다. 그리고 나서 lineTo()를 호출하면 이 점에서 여기로 연결된다.
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

// 지금은 스크린에서 어떤 색상도 볼 수가 없다.

// function onMouseDown(event) {
//     // console.log(event);
//     painting = true;
// }

function handleColorClick(event) {
    // console.log(event.target.style)
    const color = event.target.style.backgroundColor;
    // console.log(color);
    // style을 override하고, 여기서부터는 strokeStyle이 target에 있는 색상이 된다.
    ctx.strokeStyle = color;
    // color를 클릭하면, strokeStyle과 fillStyle을 color 값으로 설정해준다.
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event.target.value);
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
    // console.log(event);
    // 우클릭 방지 이벤트
    event.preventDefault();
}

function handleSaveClick() {
    // canvas의 데이터를 image처럼 얻는다
    // const image = canvas.toDataURL("image/jpeg");
    const image = canvas.toDataURL();
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[💜]";
    // console.log(link)
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스가 캔버스에 들어갔을 때, 캔버스를 클릭하는 순간을 인지하게 하고, 캔버스를 클릭했을 때 painitng을 시작해야 한다. 
    // mousedown은 클릭했을 때 발생하는 evnet이다.
    canvas.addEventListener("mousedown", startPainting);
    // 마우스를 움직이면 X와 Y를 얻게되고 캔버스를 클릭하면 painting이 된 다음에 painting을 시작한다. 그리고 마우스를 놓으면 painting은 false로 다시 설정된다.
    canvas.addEventListener("mouseup", stopPainting);
    // painting을 하다가 캔버스를 벗어나면 painting은 다시 false로 설정되어야 한다. 
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));
// array안에서 forEach로 color가져오기
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
