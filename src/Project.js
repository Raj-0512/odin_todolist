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

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
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
    }
}

export const ProjectManager = new projectManager();


