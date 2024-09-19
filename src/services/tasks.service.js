const BaseService = require("./base.service");
const Tasks = require("../models/tasks.model");

class TasksService extends BaseService {

    static instance;
    constructor() {
        if (TasksService.instance) return TasksService.instance;
        super(Tasks);
        TasksService.instance = this;
    }

    /**
     * @returns { TasksService }
     */
    static getInstance() {
        if (!TasksService.instance) TasksService.instance = new TasksService();
        return TasksService.instance;
    }

    async createTask(data) {
        const task = await this.create(data);
        if (task.error) return task;

        return {
            error: task.error,
            data: { task: task.data }
        };
    }
}

module.exports = TasksService.getInstance();
