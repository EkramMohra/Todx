import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './TimedTask'
const moment = require("moment");


export class TimedList {
    constructor() {
        this.list = []
        this.length = 0
        this.index = 0
        this.DateOfTheDay = moment().format("YYYY-MM-DD", true)
        this.userId = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user'))[0].id : '-1'

        makeObservable(this, {
            userId:observable,
            DateOfTheDay: observable,
            index: observable,
            list: observable,
            length: observable,
            addTask: action,
            updateTask: action,
            emptyTheList: action,
            deleteTask: action,
            getData: action,
            doneTask: action,
            updateId: action
        })
    }
    getList = async () => {
        this.emptyTheList()
        let res = await axios.get(`http://localhost:3005/timedtasks?today=${this.DateOfTheDay}&userId=${this.userId}`)
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
            time: data.time,
            notification: data.notification,
            status: 'pending',
            userId: this.userId
        }
        await axios.post(`http://localhost:3005/timedtasks`, obj)
            .then((response) => {
                console.log(response);
                this.getList()
            }, (error) => {
                console.log(error);
            })
    }

    getData = (NewDateOfTheDay) => {
        console.log("befor");
        this.DateOfTheDay = NewDateOfTheDay
        this.getList()
        console.log("after");
    }

    deleteTask = async (id) => {
        let data = { taskId: id, userId: this.userId }

        await axios.delete(`http://localhost:3005/timedtasks`, { data })
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
            time: data.time,
            notification: data.notification,
            status: 'pending'
        }
        await axios.put('http://localhost:3005/timedtasks', obj)
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }

    doneTask = async (id) => {

        await axios.put('http://localhost:3005/donetimedtasks', { data: { id } })
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()
    }
    updateId(id){
        this.userId = id
    }

}