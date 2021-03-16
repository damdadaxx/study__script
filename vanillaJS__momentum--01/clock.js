const clickContainer = document.querySelector(".js-clock"),
    // querySelector는 element의 자식을 탐색한다.
    // clock class의 자식을 탐색한다.
    clockTitle = clickContainer.querySelector("h1");

// 얻은 시간을 가지고 시계 부분 HTML을 매 초마다 변경시키는 부분
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// 시간을 얻는 부분
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();