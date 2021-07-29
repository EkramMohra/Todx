import { observable, makeObservable } from 'mobx'

export default class User {

    constructor(user) {
        this.id = user.id
        this.last = user.last
        this.first = user.first
        this.email = user.email
        this.password = user.password
        this.image_id = user.image_id
        this.role_id = user.role_id


        makeObservable(this, {
            id: observable,
            last: observable,
            first: observable,
            email: observable,
            password: observable,
            image_id: observable,
            role_id: observable
        })
    }
}

