import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './DailyTask'
let currentDate = new Date();
const moment = require("moment");


export class DailyList {
    constructor() {
        this.list = []
        this.length = 0
        this.index = 0
        this.DateOfTheDay = moment().format("YYYY-MM-DD", true)
        this.userId = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user'))[0].id : '-1'
        this.time = currentDate.getHours() + ":" + currentDate.getMinutes()

        makeObservable(this, {
            time: observable,
            userId: observable,
            DateOfTheDay: observable,
            index: observable,
            list: observable,
            length: observable,
            userId: observable,
            addTask: action,
            updateTask: action,
            // resetDone: action,
            emptyTheList: action,
            deleteTask: action,
            getData: action,
            updateId: action,
            doneTask: action
        })
    }

    getList = async () => {
        console.log(this.DateOfTheDay);
        await this.emptyTheList()
        let res = await axios.get(`http://localhost:3005/dailytasks?today=${this.DateOfTheDay}&userId=${this.userId}`)

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
            status: 'pending',
            userId: this.userId,
            date: this.DateOfTheDay
        }
        let res = await axios.post(`http://localhost:3005/dailytasks`, obj)
            .then((response) => {
                console.log(response);
                this.getList()

            }, (error) => {
                console.log(error);
            })
    }

    getData = (NewDateOfTheDay) => {

        this.DateOfTheDay = NewDateOfTheDay
        this.getList()

    }

    deleteTask = async (id) => {

        let data = { taskId: id, userId: this.userId }
        let res = await axios.delete(`http://localhost:3005/dailytasks`, { data })
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
            userId: this.userId,
            status: 'pending',
            date: this.DateOfTheDay
        }
        await axios.put('http://localhost:3005/dailytasks', obj)
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })
        this.getList()
    }

    doneTask = async (id) => {
        let obj = {
            taskId: id,
            DateOfTheDay: this.DateOfTheDay
        }
        await axios.put('http://localhost:3005/donedailytasks', obj)
            .then(response => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })

        this.getList()

    }

    updateId = (id) => {
        this.userId = id
    }
}


