import { observable, makeObservable } from 'mobx'

export default class ToDoTask {

    constructor(task) {
        this.id = task.id
        this.title = task.title
        this.content = task.content
        this.date = task.date
        this.priority = task.priority
        this.status = task.status


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

