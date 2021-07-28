import { observable, makeObservable } from 'mobx'

export default class DailyTask {

    constructor(task) {
        this.id = task.id
        this.title = task.title
        this.content = task.content
        this.status = task.status

        makeObservable(this, {
            id: observable,
            title: observable,
            content: observable,
            status: observable
        })
    }
}

