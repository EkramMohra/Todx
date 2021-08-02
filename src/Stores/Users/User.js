import { observable, action, makeObservable, computed } from 'mobx'
import axios from "axios"
import imageProfile from '../../Components/NavBar/Profile/images/avatar.png'

export class User {

    constructor(user = {}) {
        this.userId = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user'))[0].id : '-1'
        this.last = user.last
        this.first = user.first
        this.email = user.email
        this.password = user.password
        this.photo_id = user.photo_id
        this.role_id = user.role_id
        this.image = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user'))[0].photo : imageProfile
        console.log(this.image)

        makeObservable(this, {
            userId: observable,
            image: observable,
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
            getDailyTimedTasks: action,
            userData: computed
            // getImage: action
        })
    }

    getUserInfo = async(userId) =>{

        let res = await axios.get(`http://localhost:3005/userInfo?userId=${userId}`)
        console.log(res.data[0])
        this.userId = userId
        this.first = (res.data[0].first || "")
        this.last = (res.data[0].last)
        this.email = (res.data[0].email)
        this.password = (res.data[0].password)
        this.photo_id = (res.data[0].photo_id)
        this.role_id = (res.data[0].role_id)
    }

    get userData(){
        this.getUserInfo()
        let user ={
            id:  this.userId,
            first: this.first,
            last: this.last,
            email: this.email,
            password: this.password,
            photo_id:  this.photo_id,
            role_id: this.role_id
        }

        return user
    }

    getMonthlyToDoTasks = async () =>{

        let date = '07'
        let res = await axios.get(`http://localhost:3005/monthlytodotasks?userId=${this.userId}&date=${date}`)
        return ({all : res.data.alltasks[0][0].res || 0 , done : res.data.donetasks[0][0].res || 0})   

    } 

    getdailyToDoTasks = async () => {
        
        let date = '30'
        let res = await axios.get(`http://localhost:3005/dailytodotasks?userId=${this.userId}&date=${date}`)

        let done = res.data.donetasks[0].length === 0 ? 0 : res.data.donetasks[0][0].res
        let all = res.data.alltasks[0].length === 0 ? 0 : res.data.alltasks[0][0].res
        return ({all  : all , done : done})
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
            // console.log(res.data.res)
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

    uploadImage = async (image) => {
        console.log("formData  ", image )

        let body = {
            image: image.preview,
            photoId: this.photo_id,
            userId: this.userId
        }

        let res = await axios.post(`http://localhost:3005/updatephoto`, {
            body: body,
            headers: {'Content-Type': 'multipart/form-data' }
        })

        let getImage = await axios.get(`http://localhost:3005/photo?id=${this.userId}`)
        this.image = getImage.data
        console.log( this.image)
    } 

    getAllTitles = async () => {
        
        let res = await axios.get(`http://localhost:3005/allTitles?userId=${this.userId}`)
        console.log(res.data)
        return (res.data)
    }
}