class Todo {
    constructor(title , description , date) {
        this.title = title || "";
        this.description = description || "";
        this.date = date || "";
        this.isCompleted = false;
    }
}
class TodoManager{

    constructor() {
        this.todos = [];
    }

    createTodo(title , description , date)
    {
        const newTodo = new Todo(title , description , date);
        this.todos.push(newTodo);
    }

    deleteTodo(title)
    {
        this.todos = this.todos.filter(todo => todo.title !== title);
    }
}

export const todoManager = new TodoManager()