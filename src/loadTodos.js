import {addBtnToUi} from "./createTodos.js";
import {todoManager} from "./todo.js";
import renderTodo from "./render.js";

export default function loadTodos() {

    const todo_list_container = document.createElement("div");
    todo_list_container.id = "todo_list_container";
    document.getElementById("main_content_container").append(todo_list_container);

    todoManager.createTodo("Demo Todo", "This is a demo task", new Date().toLocaleDateString());
    const demoTodo = todoManager.todos[0];
    renderTodo(demoTodo);

    addBtnToUi();

}
