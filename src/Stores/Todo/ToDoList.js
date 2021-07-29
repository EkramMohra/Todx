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
        let res = await axios.get(`http://localhost:3005/todotasks?today=${this.DateOfTheDay}`)
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
        }

        let res = await axios.post(`http://localhost:3005/todotasks`, obj)
            .then((response) => {
                console.log(response);
                this.getList(this.DateOfTheDay)
            }, (error) => {
                console.log(error);
            })

    }

    deleteTask = async (id) => {

        let res = await axios.delete(`http://localhost:3005/todotasks`, { data: { id } })
            .then((response) => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })
        this.getList(this.DateOfTheDay)
    }

    updateTask = async (data) => {

        let obj = {
            id: data.id,
            title: data.title,
            content: data.content,
            date: data.date,
            priority: data.priority ? 1 : 0,
            status: 'pending'
        }

        await axios.put('http://localhost:3005/todotasks', obj)
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList(this.DateOfTheDay)
    }

    doneTask = async (id) => {
        console.log(id);
        await axios.put('http://localhost:3005/donetodotasks',  { data: { id } })
            .then(response => {
                console.log(response.data);
            }, (error) => {
                console.log(error);
            })

        this.getList()

    }
}

