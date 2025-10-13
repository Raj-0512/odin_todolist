import modalAddNewProject from './modalNewProject.js';

export default function loadContent()
{
    const sidebar_container = document.createElement("div");
    sidebar_container.id = "sidebar_container";

    const main_content_container = document.createElement("div");
    main_content_container.id = "main_content_container";

    document.body.append(sidebar_container);
    document.body.append(main_content_container);

    let myProjectTitle = document.createElement("h1");
    myProjectTitle.textContent = "My Projects";
    myProjectTitle.style.marginLeft = "20px";

    let projects_list_container = document.createElement("div");
    projects_list_container.id = "projects_list_container";

    let add_new_project_button = document.createElement("div");
    add_new_project_button.id = "add_new_project_container";
    add_new_project_button.append("Add new project");


    add_new_project_button.addEventListener('click' , ()=>{
        modalAddNewProject();
    })
    sidebar_container.append(myProjectTitle);
    sidebar_container.append(projects_list_container);
    sidebar_container.append(add_new_project_button);


}