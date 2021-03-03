const body = document.querySelector("body");

const IMG_NUMBER = 6;

// 이미지를 부른다.
// 숫자 가져오기
function paintImage(imgNumber) {
    // paintImage 함수 안에 새로운 object 생성
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    // 숫자 생성
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();