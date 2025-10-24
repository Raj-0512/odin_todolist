class Project{
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(title, description, date) {
        const newTodo = new Todo(title, description, date);
        this.todos.push(newTodo);
    }
}

class Todo {
    constructor(title, description, date) {
        this.title = title || "";
        this.description = description || "";
        this.date = date || "";
        this.isCompleted = false;
    }
}



class projectManager {
    constructor() {
        this.projects = [];
        this.activeProjectName = null;
    }

    save()
    {
        localStorage.setItem('Projects' , JSON.stringify(this.projects));
    }

    load()
    {
        const json_projects = localStorage.getItem("Projects");

        if(json_projects)
        {
            const plain_projects = JSON.parse(json_projects);

            this.projects = plain_projects.map(plain_project => {
            const project = new Project(plain_project.name);
            project.todos = plain_project.todos.map(plainTodo => {
                const todo = new Todo(plainTodo.title , plainTodo.description , plainTodo.date);
                todo.isCompleted = plainTodo.isCompleted;
                return todo;
            });
            return project;
            });
        }
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.save();
        return newProject;
    }

    getProject(name) {
        return this.projects.find(project => project.name === name);
    }

    setActiveProject(name) {
        this.activeProjectName = name;
    }

    getActiveProject() {
        return this.getProject(this.activeProjectName);
    }

    createTodo(title, description, date) {
        const activeProject = this.getActiveProject();
        if (activeProject) {
            activeProject.addTodo(title, description, date);
            this.save();
        } else {
            console.error("No active project!");
        }
    }

    initializeDemo() {
        if (this.projects.length === 0) {
            this.addProject("Demo");
            this.setActiveProject("Demo");
            this.createTodo("Demo Todo", "This is a demo task", new Date().toLocaleDateString());
        } else {
            this.setActiveProject(this.projects[0].name);
        }
    }

    deleteProject(name) {
        this.projects = this.projects.filter(project => project.name !== name);
        this.save();
    }

    deleteTodo(title)
    {
        const activeProject = this.getActiveProject();

        if (activeProject)
        {
            activeProject.todos = activeProject.todos.filter(todo => todo.title !== title);
            this.save();
        }
        else
        {
            console.error("No active project to delete from!");
        }
    }
}

export const ProjectManager = new projectManager();


