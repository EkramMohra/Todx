import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './Task'

export class List {

    constructor() {
        this.list = []
        this.length = 0
        this.index = 0

        makeObservable(this, {
            index: observable,
            list: observable,
            length: observable,
            addTask: action,
            updateTask: action,
            emptyTheList: action,
            deleteTask: action
        })
    }

    getList = async () => {
        let res = await axios.get(`http://localhost:3005/tasks`)
        this.emptyTheList()
        res.data.forEach(task => {
            runInAction(() => {
                this.list.push(new Task(task))

            })
        })
    }

    emptyTheList = () => {
        this.list = []
    }


    addTask = async (title, content, favourite, time, date, notification) => {

        console.log(time) 
        
        let obj = {
            title: title,
            content: content,
            favourite: favourite,
            time: time,
            date: date,
            notification: notification,
            status: 'pending'
        }

        let res = await axios.post(`http://localhost:3005/tasks`, obj)
            .then((response) => {
                console.log(response.data.message);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }


    deleteTask = async (id) => {
        console.log(id)
        let res = await axios.delete(`http://localhost:3005/tasks`,{ data: { id } })
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }

    updateTask = async (id,title, content, favourite, time, date, notification) => {

        let obj = {
            id:id,
            title: title,
            content: content,
            favourite: favourite,
            time: time,
            date: date,
            notification: notification,
            status: 'pending'
        }
        
        await axios.put('http://localhost:3005/tasks', obj)
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()
    }
}

