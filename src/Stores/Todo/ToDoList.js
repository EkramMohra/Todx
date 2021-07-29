import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './ToDoTask'
const moment = require("moment");

// let today = moment().format("YYYY-MM-DD", true)
export class ToDoList {
    constructor() {
        this.list = []
        this.length = 0
        this.index = 0
        this.DateOfTheDay = moment().format("YYYY-MM-DD", true)
        this.userId =JSON.parse(sessionStorage.getItem('user'))[0].id

        makeObservable(this, {
            DateOfTheDay: observable,
            index: observable,
            list: observable,
            length: observable,
            addTask: action,
            updateTask: action,
            emptyTheList: action,
            deleteTask: action,
            getData: action,
            doneTask: action
        })
    }

    getData = (NewDateOfTheDay) => {

        this.DateOfTheDay = NewDateOfTheDay
        this.getList()

    }

    getList = async () => {

        this.emptyTheList()
        let res = await axios.get(`http://localhost:3005/todotasks?today=${this.DateOfTheDay}&userId=${this.userId}`)

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
            priority: data.priority ? 1 : 0,
            status: 'pending',
            userId: this.userId
        }

        let res = await axios.post(`http://localhost:3005/todotasks`, obj)
            .then((response) => {
                console.log(response);
                this.getList()
            }, (error) => {
                console.log(error);
            })

    }



    deleteTask = async (id) => {
        let data = { taskId: id, userId: this.userId }
        let res = await axios.delete(`http://localhost:3005/todotasks`, { data })
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
            userId: this.userId,
            priority: data.priority ? 1 : 0,
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

    doneTask = async (id) => {
        console.log(id);
        await axios.put('http://localhost:3005/donetodotasks', { data: { id } })
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()

    }
}
