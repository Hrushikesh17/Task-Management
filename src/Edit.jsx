import React, { useState, useEffect,useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './App.css';

const Edit = () => {
    const [task, setTask] = useState(null); // Initialize task state to null
    let params = useParams();
    let taskid = params.id;

    useEffect(() => {
      const fetchData = async () => {
        try {
          let response = await fetch(`http://localhost:8080/search?id=${taskid}`);
          let data = await response.json();
          setTask(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [taskid]); // Add taskid as a dependency to useEffect

    const name = useRef()
    const desc = useRef()
    const status = useRef()
   
    const actualpage = useNavigate()

    const submitUpdateHandle = async (e) => {
        e.preventDefault();
        const taskData = {
          "desc": desc.current.value,
          "name": name.current.value,
          "status": status.current.value
        };
      
        try {
          await fetch(`http://localhost:8080/update?id=${taskid}&status=${status.current.value}&desc=${desc.current.value}&name=${ name.current.value}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
          });
          alert(`${name.current.value} updated`);
          actualpage("/");
        } catch (error) {
          console.error('Error updating task:', error);
          // Handle error appropriately, e.g., show error message to user
        }
      };
      

    return (
      <div>
        {task && ( // Render viewCard only if task is not null
          <div className='viewCard'>
            <h1>This Your Old Task</h1>
            <div class="card">
              <p class="cookieHeading">{task.name}</p>
              <p class="cookieDescription">{task.descripction}.</p>
              <p>{task.status}</p>
            </div>             
          </div>
        )}
         <div className="subscribe">
            <p>ENTER YOUR TASK DETAILS TO UPDATE</p>
            <form onSubmit={submitUpdateHandle}>
              <input type='text' placeholder='Enter Task Name' ref={name} className="subscribe-input1" /> <br />
              <input type='text' placeholder='Enter Descripstion' ref={desc} className="subscribe-input2" /> <br />
              <input type='text' placeholder='Enter Status' ref={status} className="subscribe-input3" /> <br />
              <button className="submit-btn">Submit</button>
            </form>
          </div>
      </div>
    );
};

export default Edit;
