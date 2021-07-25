/* eslint-disable */
import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './Task'

export class List {

    constructor() {
        this.list = []
        this.length = 0
        this.index = 0
       
        makeObservable(this, {
            index : observable,
            list: observable,
            length: observable
          })
    }

    updateListOfClients = async () => {
        let res = await axios.get(`http://localhost:3005/tasks`)
        this.emptyTheList()
        res.data.forEach(task => {
            runInAction(()=>{
                this.list.push(new Task(task))
            })
        });
    }
}

