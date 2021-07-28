import { observable, makeObservable } from 'mobx'

export default class TimedTask {

    constructor(task) {
        this.id = task.id
        this.title = task.title
        this.content = task.content
        this.date = task.date
        this.time = task.time
        this.notification = task.notification
        this.status = task.status

        makeObservable(this, {
            id: observable,
            title: observable,
            content: observable,
            date : observable, 
            time : observable, 
            notification : observable, 
            status: observable
        })
    }
}

