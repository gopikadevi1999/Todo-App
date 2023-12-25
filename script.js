const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const msg = document.getElementById("msg");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//! submit logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  

});

//!form-validation function
const formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Input field is required";
    //console.log("data not found")
  } else {
    msg.innerHTML = "";
    //console.log("data found")
    getData();

    //ONE TIME CLICK USE THIS CODE
    add.setAttribute("data-bs-dismiss","modal")
    add.click();

    (() => {
        add.setAttribute("data-bs-dismiss","");
    })();
    
  }
};
//!get details from form input and store it in data

let data = [{}];

const getData = () => {
    data.push({
    text : textInput.value,
    date : dateInput.value,
    task : textarea.value,
});
  //console.log(data)

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data)
  createTodo();
};

//!create todo function

const createTodo = () => {
  tasks.innerHTML = "";
  data.map((ele,y) => {
    return ((tasks.innerHTML += `<div id=${y}>
    <span class="fw-bolder">${ele.text}</span>
    <span class="small text-secondary">${ele.date}</span>
    <p>${ele.task}</p>
    <span class="options">
      <i onclick="editData(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-regular fa-pen-to-square"></i>
      <i onclick="deleteData(this); createTodo()"class="fa-regular fa-trash-can"></i>
    </span>
  </div>`))
  })
resetForm();
};

// reset form to clear the data
const resetForm = () =>{
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTodo();
})();

//DELETE THE DETAILS FROM DATA

const deleteData = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

//EDIT THE DETAILS FROM DATA

const editData = (e) => {
    let task = e.parentElement.parentElement;
    textInput.value = task.children[0].innerHTML;
    dateInput.value = task.children[1].innerHTML;
    textarea.value = task.children[2].innerHTML;
    //task.remove();
    deleteData(e);
}