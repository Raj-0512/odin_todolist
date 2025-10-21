import {ProjectManager} from "./Project.js";
import addProject from "./projectActions.js";

export default function modalAddNewProject()
{
    const modal_form_overlay = document.createElement("div");
    modal_form_overlay.id = "modal_form_overlay";

    const modal_form = document.createElement("div");
    modal_form.id = "modal_form";

    const modal_form_title = document.createElement("div");
    modal_form_title.id = "modal_form_title";
    modal_form_title.textContent = "Create Project";

    const project_name_input = document.createElement("input");
    project_name_input.id = "project_name_input";
    project_name_input.placeholder = "Project Name";
    project_name_input.required = true;


    const action_btn_container = document.createElement("div");
    action_btn_container.id = "action_btn_container";

    const cancel_btn = document.createElement("div");
    cancel_btn.id = "cancel_btn";
    cancel_btn.textContent = "Cancel";

    const create_btn = document.createElement("div");
    create_btn.id = "create_btn";
    create_btn.textContent = "Create";

    action_btn_container.append(cancel_btn);
    action_btn_container.append(create_btn);
    modal_form.append(modal_form_title);
    modal_form.append(project_name_input);
    modal_form.append(action_btn_container);

    document.body.append(modal_form_overlay);
    document.body.append(modal_form)

    cancel_btn.addEventListener('click' , ()=> {
        modal_form_overlay.remove();
        modal_form.remove();
    });

    create_btn.addEventListener('click',function(event){
        event.preventDefault();
        const title = project_name_input.value.trim();
        const isTitleValid = project_name_input.reportValidity();

        if(!isTitleValid)
        {
            console.log("Project name cannot be empty");
        }
        else
        {
            addProject(title);
            addProjectToUi(title);
            modal_form_overlay.remove();
            modal_form.remove();
        }
    });
}


 export function addProjectToUi(title)
{
    const project_container = document.createElement("div");
    project_container.className = "project_container";
    project_container.innerHTML = `
    <span>${title}</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="delete_icon" viewBox="0 0 24 24" width="20px" height="20px">
        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/>
    </svg>
`;
    const delete_icon = project_container.querySelector('.delete_icon');
    delete_icon.addEventListener("click",()=>{
        ProjectManager.deleteProject(title);
        project_container.remove();
    });

    const project_todo_title = document.createElement("div");
    project_todo_title.id = "project_todo_title";
    project_todo_title.textContent = title;

    document.getElementById("projects_list_container").append(project_container);
}
export function displayProjectTitle(title) {
    const existingTitle = document.getElementById("project_todo_title");
    if (existingTitle) {
        existingTitle.remove();
    }

    const project_todo_title = document.createElement("div");
    project_todo_title.id = "project_todo_title";
    project_todo_title.textContent = title;

    document.getElementById("main_content_container").append(project_todo_title);
}

