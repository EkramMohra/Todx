import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './ToDoTask'

export class ToDoList {

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
        let res = await axios.get(`http://localhost:3005/todotasks`)
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

    addTask = async (data) => {
        let obj = {
            title: data.title,
            content: data.content,
            date: data.date,
            priority: data.priority?1:0,
            status: 'pending'
        }
        
        console.log(obj)
        let res = await axios.post(`http://localhost:3005/todotasks`, obj)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }

    deleteTask = async (id) => {

        let res = await axios.delete(`http://localhost:3005/todotasks`,{ data: { id } })
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }

    updateTask = async (data) => {

        let obj = {
            id: data.id,
            title: data.title,
            content: data.content,
            date: data.date,
            priority: data.priority?1:0,
            status: 'pending'
        }
        
        await axios.put('http://localhost:3005/todotasks', obj)
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()
    }
}

