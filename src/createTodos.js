import { ProjectManager } from "./Project.js";
import renderActiveProject, {renderTodo} from "./render.js"

export function addBtnToUi()
{
    const add_todo_container = document.createElement("div");
    add_todo_container.id = "add_todo_container";

    const add_todo_icon = document.createElement("div");
    add_todo_icon.id = "add_todo_icon";
    add_todo_icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" stroke="white" stroke-width="2" width="17px" height="17px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>`

    const add_todo_text = document.createElement("div");
    add_todo_text.id = "add_todo_text";
    add_todo_text.textContent = "Add new task";

    add_todo_container.append(add_todo_icon);
    add_todo_container.append(add_todo_text);
    document.getElementById("main_content_container").append(add_todo_container);

    add_todo_icon.addEventListener("click" , ()=> {
        displayModalForm();
    });

}

export function displayModalForm(existingTodo = null)
{
        const modal_todo_form_overlay = document.createElement("div");
        modal_todo_form_overlay.id = "modal_todo_form_overlay";

        const modal_todo_form = document.createElement("div");
        modal_todo_form.id = "modal_todo_form";

        const modal_form_title = document.createElement("input");
        modal_form_title.id = "modal_form_title";
        modal_form_title.type = "text";
        modal_form_title.placeholder = "Title";

        const modal_form_description = document.createElement("input");
        modal_form_description.id = "modal_form_description";
        modal_form_description.type = "text";
        modal_form_description.placeholder = "Description";

        const modal_form_date = document.createElement("input");
        modal_form_date.id = "modal_form_date";
        modal_form_date.type = "date";

        const modal_form_action_btn_container = document.createElement("div");
        modal_form_action_btn_container.id = "modal_form_action_btn_container";

        const modal_form_cancel_btn = document.createElement("div");
        modal_form_cancel_btn.id = "modal_form_cancel_btn";
        modal_form_cancel_btn.textContent = "Cancel";

        const modal_form_create_btn = document.createElement("div");
        modal_form_create_btn.id = "modal_form_create_btn";
        modal_form_create_btn.textContent = "Create";

    if (existingTodo) {
        modal_form_title.value = existingTodo.title;
        modal_form_description.value = existingTodo.description;
        modal_form_date.value = existingTodo.date;
        modal_form_create_btn.textContent = "Update";
    }
    else
    {
        modal_form_create_btn.textContent = "Create";
    }

        modal_form_action_btn_container.append(modal_form_cancel_btn);
        modal_form_action_btn_container.append(modal_form_create_btn);

        modal_todo_form.append(modal_form_title);
        modal_todo_form.append(modal_form_description);
        modal_todo_form.append(modal_form_date);
        modal_todo_form.append(modal_form_action_btn_container);
        document.body.append(modal_todo_form_overlay);
        modal_todo_form_overlay.append(modal_todo_form);

        modal_form_cancel_btn.addEventListener("click" , ()=>{
            modal_todo_form_overlay.remove();
            modal_todo_form.remove();
        });

        document.getElementById("modal_form_create_btn").addEventListener("click" , ()=>{
            let title = modal_form_title.value;
            let description = modal_form_description.value;
            let date = modal_form_date.value;

            if (existingTodo)
            {
                existingTodo.title = title;
                existingTodo.description = description;
                existingTodo.date = date;

                ProjectManager.save();

                renderActiveProject();
            }
            else
            {
                ProjectManager.createTodo(title, description, date);

                const activeProject = ProjectManager.getActiveProject();
                const newTodo = activeProject.todos[activeProject.todos.length - 1];

                renderTodo(newTodo);
            }

            modal_todo_form_overlay.remove();

        });

}
