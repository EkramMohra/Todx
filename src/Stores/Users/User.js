import { observable, action, makeObservable } from 'mobx'
import axios from "axios"

export class User {

    constructor(user = {}) {
        this.userId = user.userId 
        this.last = user.last
        this.first = user.first
        this.email = user.email
        this.password = user.password
        this.photo_id = user.photo_id
        this.role_id = user.role_id

        makeObservable(this, {
            userId: observable,
            last: observable,
            first: observable,
            email: observable,
            password: observable,
            photo_id: observable,
            role_id: observable,
            getUserInfo : action,
            updateUserInfo: action,
            getdailyToDoTasks:action,
            getMonthlyTimedTasks: action,
            getDailyTimedTasks: action
        })
    }

    getUserInfo = async(userId) =>{

        let res = await axios.get(`http://localhost:3005/userInfo?userId=${userId}`)
            this.userId = userId
            this.first = (res.data[0].first)
            this.last = (res.data[0].last)
            this.email = (res.data[0].email)
            this.password = (res.data[0].password)
            this.photo_id = (res.data[0].photo_id)
            this.role_id = (res.data[0].role_id)
    }

    getMonthlyToDoTasks = async () =>{

        let date = '07'
        let res = await axios.get(`http://localhost:3005/monthlytodotasks?userId=${this.userId}&date=${date}`)
        return ({all : res.data.alltasks[0][0].res , done : res.data.donetasks[0][0].res})   

    } 

    getdailyToDoTasks = async () => {
        
        let date = '30'
        let res = await axios.get(`http://localhost:3005/dailytodotasks?userId=${this.userId}&date=${date}`)
        console.log(res)
        return ({all : res.data.alltasks[0][0].res, done : res.data.donetasks[0][0].res})
    } 

    getMonthlyTimedTasks = async () => {

        let date = '07'
        let timedres =[['x', 'Tasks']]
        for(let i = 0 ; i <  24;i++){
            let res = await axios.get(`http://localhost:3005/monthlytimedtasks?userId=${this.userId}&date=${date}&time=${i}`)
            console.info(res.data.res)
            timedres.push([i ,res.data.res || 0])
        }
        console.log(timedres)
        return timedres
        
    } 

    getDailyTimedTasks = async () => {

        let date = '30'
        let timedres =[['x', 'Tasks']]
        for(let i = 0 ; i <  24;i++){
            let res = await axios.get(`http://localhost:3005/monthlytimedtasks?userId=${this.userId}&date=${date}&time=${i}`)
            console.info(res.data.res)
            timedres.push([i ,res.data.res || 0])
        }
        console.log(timedres)
        return timedres
    }

    updateUserInfo = async (newInfo) =>{
        console.log(newInfo);
        let res = await axios.put(`http://localhost:3005/updateInfousers`,{newInfo,id:this.userId})
   
    }
    
    updateName = async (FullName) => {

        let res = await axios.put(`http://localhost:3005/updatename`,{FullName , id : this.userId})

    }

    updatePassword = async (newPassword) => {

        let res = await axios.put(`http://localhost:3005/updatepassword`,{newPassword , id : this.userId})

    }

    updatePhotoId = async (photoID) => {

        let res = await axios.put(`http://localhost:3005/updatephoto`,{photoID , id : this.userId})

    }
}