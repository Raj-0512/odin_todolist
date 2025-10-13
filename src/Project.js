class Project{
    constructor(name) {
        this.name = name;
    }
}

class projectManager {
    constructor(name) {
        this.projects = [];
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        return newProject;
    }

    deleteProject(name) {
        this.projects = this.projects.filter(project => project.name !== name);
    }
}

export const ProjectManager = new projectManager();


