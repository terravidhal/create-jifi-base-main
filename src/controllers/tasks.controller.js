const Controller = require('./controller');
  
class TasksController extends Controller {

    static instance;
    constructor() {
        if (TasksController.instance) return TasksController.instance;
        super();
        TasksController.instance = this;
    }

    /**
     * @returns { TasksController }
     */
    static getInstance() {
        if (!TasksController.instance) TasksController.instance = new TasksController();
        return TasksController.instance;
    }

    index(req, res, next) {
        return super.success(res, 'Welcome', {});
    }
}

module.exports = TasksController.getInstance();
