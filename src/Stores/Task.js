import { observable, makeObservable } from 'mobx'

export default class Task {

    constructor(task) {
        this.id = task.id
        this.title = task.title
        this.content = task.content
        this.time = task.time
        this.date = task.date
        this.notification = task.notification
        this.status = task.status
        this.favourite = task.favourite

        makeObservable(this, {
            id: observable,
            title: observable,
            content: observable,
            time: observable,
            date: observable,
            notification: observable,
            status: observable,
            favourite: observable
        })
    }
}

