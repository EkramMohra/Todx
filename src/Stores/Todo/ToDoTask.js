import { observable, makeObservable } from 'mobx'

export default class ToDoTask {

    constructor(task,task_type,sender_name) {
        this.id = task.id
        this.title = task.title
        this.content = task.content
        this.date = task.date
        this.priority = task.priority
        this.status = task.status
        this.type=task_type
        this.sender=sender_name


        makeObservable(this, {
            id: observable,
            title: observable,
            content: observable,
            date: observable,
            priority: observable,
            status: observable
        })
    }
}

