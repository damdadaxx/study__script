const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// 이 'filter'는 마치 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행이 된다.
// 'filter'은 'array'를 생성한다. 함수가 true를 return하는 아이템들이 있는 
// function filterFn(toDo) {
//     return toDo.id === 1
// }

// toDos array는 object가 있고, 그 object는 숫자로 된 id가 있다.
// const toDos = [];
let toDos = [];

function deleteToDo(event) {
    // console.log(event.target);
    // console.dir(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // 여기서 'filter'는 함수 하나를 실행 시킨다.
    // const cleanToDos = toDos.filter(filterFn)
    const cleanToDos = toDos.filter(function (toDo) {
        // 모든 toDos가 <li>의 id와 같지 않을 때
        // console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    })
    // console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos(); // toDos를 저장
}

function saveToDos() {
    // localStorage.setItem(TODOS_LS, toDos);
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    // console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "✖";
    delBtn.style.color = "#273f40";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // if-else 문을 사용하지 않는 이유 : if(toDos === null) {} else {} -> 만약 toDos가 null이랑 같으면(값이 없으면), 아무것도 하지 않을 거야. 왜냐하면 <form>은 항상 showing이기 때문이다. else문이 필요 없다.
        // 만약 toDos가 null이 아니라면,
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);

        parsedToDos.forEach(function (toDo) {
            // console.log(toDo.text);
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();