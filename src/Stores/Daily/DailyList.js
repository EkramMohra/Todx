import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from "axios"
import Task from './DailyTask'
const moment = require("moment");


export class DailyList {

    constructor() {
        this.list = []
        this.length = 0
        this.index = 0
        this.DateOfTheDay = moment().format("YYYY-MM-DD", true)

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

    getList = async () => {
        this.emptyTheList()
        let res = await axios.get(`http://localhost:3005/dailytasks?today=${this.DateOfTheDay}`)
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
            status: 'pending'
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

        let res = await axios.delete(`http://localhost:3005/dailytasks`, { data: { id } })
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
            status: 'pending'
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

        await axios.put('http://localhost:3005/donedailytasks', { data: { id } })
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()

    }
}

