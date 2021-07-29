import { observable, action, makeObservable, runInAction } from "mobx";
import axios from "axios";
import Task from "./TimedTask";
export class TimedList {
  constructor() {
    this.list = [];
    this.length = 0;
    this.index = 0;
    makeObservable(this, {
      index: observable,
      list: observable,
      length: observable,
      addTask: action,
      updateTask: action,
      emptyTheList: action,
      deleteTask: action,
    });
  }
  getList = async () => {
    this.emptyTheList();
    let res = await axios.get(`http://localhost:3005/timedtasks`);
    res.data.forEach((task) => {
      runInAction(() => {
        this.list.push(new Task(task));
      });
    });
  };
  emptyTheList = () => {
    this.list = [];
  };
  addTask = async (data) => {
    let obj = {
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      notification: data.notification,
      status: "pending",
    };
    await axios.post(`http://localhost:3005/timedtasks`, obj).then(
      (response) => {
        console.log(response);
        this.getList();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  deleteTask = async (id) => {
    await axios
      .delete(`http://localhost:3005/timedtasks`, { data: { id } })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    this.getList();
  };
  updateTask = async (data) => {
    let obj = {
      id: data.id,
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      notification: data.notification,
      status: "pending",
    };
    await axios.put("http://localhost:3005/timedtasks", obj).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.getList();
  };
}
