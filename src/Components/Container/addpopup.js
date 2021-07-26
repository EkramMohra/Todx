import React from "react";
import { observer, inject } from "mobx-react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "./popup.css";

const MyModal = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [favourite, setFavourite] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState("");
  const [status, setStatus] = useState("");

  function addTask() {
    props.list.addTask(
      title,
      content,
      favourite,
      time,
      date,
      notification,
      status
    );
    props.onHide();
  }

  function handleChange(e) {
    let name = e.target.name;
    name === "title"
      ? setTitle(e.target.value)
      : name === "content"
      ? setContent(e.target.value)
      : name === "favourite"
      ? setFavourite(e.target.value)
      : name === "time"
      ? setTime(e.target.value)
      : name === "date"
      ? setDate(e.target.value)
      : name === "notification"
      ? setNotification(e.target.value)
      : setStatus(e.target.value);
  }

  return (
    <Modal {...props} centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title>Add client</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          {" "}
          title:
          <input
            className="input-class"
            name="title"
            defaultValue={title}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          content:
          <input
            className="input-class"
            name="content"
            defaultValue={content}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          favourite:
          <input
            className="input-class"
            name="favourite"
            defaultValue={favourite}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          time:
          <input
            className="input-class"
            name="time"
            defaultValue={time}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          date:
          <input
            className="input-class"
            name="date"
            defaultValue={date}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          notification:
          <input
            className="input-class"
            name="notification"
            defaultValue={notification}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          status:
          <input
            className="input-class"
            name="status"
            defaultValue={status}
            onChange={handleChange}
          />
        </div>
        <input type="time" />
        <input type="date" />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="warning" onClick={addTask}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default inject("list")(observer(MyModal));
