
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// context의 default를 설정한다. 예를들어 context는 fillColor를 가지고 있다.
// 처음 사용할 때에는 첫 번째 색(검정색)으로 시작하도록 설정한다.
ctx.strokeStyle = "#2c2c2c";
// lineWidth 는 <input>의 range의 기능과 같다. 이것으로 작게 혹은 크게 만들 수 있다.
ctx.lineWidth = 2.5;

// painting은 기본적으로 false 하지만 마우스를 클릭했을 때에는 true
let painting = false;

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
        ctx.strokeStyle();
    } else {
        // path의 마지막 점에 연결하는 건, 먼저 path를 만들어야 한다. 그리고 나서 lineTo()를 호출하면 이 점에서 여기로 연결된다.
        ctx.lineTo(x, y);
    }


}

// 지금은 스크린에서 어떤 색상도 볼 수가 없다.

function onMouseDown(event) {
    // console.log(event);
    painting = true;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    // 마우스가 캔버스에 들어갔을 때, 캔버스를 클릭하는 순간을 인지하게 하고, 캔버스를 클릭했을 때 painitng을 시작해야 한다. 
    // mousedown은 클릭했을 때 발생하는 evnet이다.
    canvas.addEventListener("mousedown", startPainting);
    // 마우스를 움직이면 X와 Y를 얻게되고 캔버스를 클릭하면 painting이 된 다음에 painting을 시작한다. 그리고 마우스를 놓으면 painting은 false로 다시 설정된다.
    canvas.addEventListener("mouseup", stopPainting);
    // painting을 하다가 캔버스를 벗어나면 painting은 다시 false로 설정되어야 한다. 
    canvas.addEventListener("mouseleave", startPainting);
}

