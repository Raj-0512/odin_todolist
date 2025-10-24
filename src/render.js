import {displayProjectTitle} from "./modalNewProject.js";
import {ProjectManager} from "./Project";
import {displayModalForm} from "./createTodos.js";

export default function renderActiveProject() {
    const todo_list_container = document.getElementById("todo_list_container");

    if (!todo_list_container) {
        console.error("Could not find todo_list_container!");
        return;
    }

    todo_list_container.innerHTML = "";

    const activeProject = ProjectManager.getActiveProject();
    if (!activeProject) {
        console.error("No active project to render");
        return;
    }

    displayProjectTitle(activeProject.name);

    activeProject.todos.forEach(todo => {
        renderTodo(todo);
    });
}

export function renderTodo(todo)
{
    const todo_list_container = document.getElementById("todo_list_container");
    if (!todo_list_container) return;

    const todo_container = document.createElement("div");
    todo_container.className = "todo_container";

    const todo_checkbox_container = document.createElement("div");
    todo_checkbox_container.className = "todo_checkbox_container";

    const todo_checkbox = document.createElement("input");
    todo_checkbox.type = "checkbox";
    todo_checkbox.className = "todo_checkbox";
    todo_checkbox.checked = todo.isCompleted;

    todo_checkbox_container.append(todo_checkbox);

    const todo_main_container = document.createElement("div");
    todo_main_container.className = "todo_main_container";

    const todo_content_container = document.createElement("div");
    todo_content_container.className = "todo_content_container";

    const todo_title = document.createElement("div");
    todo_title.className= "todo_title";
    todo_title.style.fontSize = "17px";
    todo_title.textContent = todo.title;

    const todo_time = document.createElement("div");
    todo_time.className = "todo_time"
    todo_time.textContent = todo.date;

    const todo_description = document.createElement("div");
    todo_description.className = "todo_description";
    todo_description.textContent = todo.description;

    todo_content_container.append(todo_title);
    todo_content_container.append(todo_time);

    const todo_icons_container = document.createElement("div");
    todo_icons_container.className = "todo_icons_container";

    const todo_edit_icon = document.createElement("div");
    todo_edit_icon.className = "todo_edit_icon"
    todo_edit_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>`;

    const todo_delete_icon = document.createElement("div");
    todo_delete_icon.className = "todo_delete_icon";
    todo_delete_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/></svg>`

    const todo_expand_icon = document.createElement("div");
    todo_expand_icon.className = "todo_expand_icon";
    todo_expand_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z" /></svg>`

    todo_icons_container.append(todo_expand_icon);
    todo_icons_container.append(todo_edit_icon);
    todo_icons_container.append(todo_delete_icon);

    todo_main_container.append(todo_content_container);
    todo_main_container.append(todo_icons_container);

    todo_container.append(todo_checkbox_container);
    todo_container.append(todo_main_container);

    let isExpanded = false;
    todo_expand_icon.addEventListener("click", ()=>{
        if(isExpanded)
        {
            todo_container.style.height = "90px";
            todo_description.remove();
            todo_expand_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z" /></svg>`
            isExpanded = false;
        }
        else if(!isExpanded)
        {
            todo_container.style.height = "120px";
            todo_content_container.append(todo_description);
            todo_expand_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path d="M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z" /></svg>`;
            isExpanded = true;
        }

    });

    todo_delete_icon.addEventListener("click" , ()=>{
        ProjectManager.deleteTodo(todo.title);
        todo_container.remove();
    });

    todo_edit_icon.addEventListener("click" , ()=>{
        displayModalForm(todo);
    });

    todo_list_container.append(todo_container);
}