
import { useNavigate } from 'react-router-dom';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [bool, setBoll] = useState(true)
  const [bool1, setBoll1] = useState(true)
  const [bool2, setBoll2] = useState(true)
  const [bool3, setBoll3] = useState(true)
  const [task, setTask] = useState([]);
  const [searchtask, setSearchtask] = useState({});
  const navigate = useNavigate()

  
  const handleShow = () => {
    setBoll(!bool)
  }
  const handleShow1 = () => {
    setBoll1(!bool1)
  }
  const handleShow2 = () => {
    setBoll2(!bool2)
  }
  const handleShowById = () => {
    setBoll3(!bool3)
  }
  const name = useRef()
  const desc = useRef()
  const status = useRef()
  const searchTaskId = useRef()

  const submitHandle = (e) => {
    e.preventDefault()
    const taskData = {
      "descripction": desc.current.value,
      "name": name.current.value,
      "status": status.current.value
    }
    fetch("http://localhost:8080/insert"
      , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
    alert(`${taskData.name} added`)
    console.log(`${taskData.name} added`)
    setBoll(!bool)
  }

  useEffect(() => {
    fetch("http://localhost:8080/view")
      .then(res => res.json()
        .then(x => { setTask(x) }))
  }, [task])

  const handleFinish = (id, name) => {
    fetch(`http://localhost:8080/remove?id=${id}`, {
      method: 'DELETE'
    })
    alert(`Confirm To Delete ${name}`)
    fetch("http://localhost:8080/view")
      .then(res => res.json()
        .then(x => { setTask(x) }))
  }


  const submitHandleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    const id = searchTaskId.current.value;
    fetch(`http://localhost:8080/search?id=${id}`)
      .then(res => res.json())
      .then(x => {
        console.log('Search Result:', x);
        setSearchtask(x);
      })
      .catch(error => {
        console.error('Error searching task:', error);
        setSearchtask([]); // Reset search result if an error occurs
        alert("Enter a valid Id")
      });
  }
   

  const handleEdit = (id) =>{
    navigate(`/edit/${id}`)
  }


  return (
    <div className="App">
      <div className='bt'>
        <button onClick={handleShow} className="button bt1">{bool ? "Add Task" : "Close"}</button>
        <button onClick={handleShow1} className="button bt2">{bool1 ? "View" : "Close"}</button>
        <button onClick={handleShow2} className="button bt3">{bool2 ? "Search" : "Close"}</button>
      </div>
      {
        bool ? "" :
          <div className="subscribe">
            <p>ADD TASK</p>
            <form onSubmit={submitHandle}>
              <input type='text' placeholder='Enter Task Name' ref={name} className="subscribe-input1" /> <br />
              <input type='text' placeholder='Enter Descripstion' ref={desc} className="subscribe-input2" /> <br />
              <input type='text' placeholder='Enter Status' ref={status} className="subscribe-input3" /> <br />
              <button className="submit-btn">Submit</button>
            </form>
          </div>
      }
      <div>
        {
          bool1 ? "" :
            <div className='viewCard'>{
              task.map((data) => (
                <>
                  <div className="card">
                    <p className="cookieHeading">{data.name}</p>
                    <p className="cookieDescription">{data.descripction}.</p>
                    <p>{data.status}</p>
                    <div className="buttonContainer">
                      <button onClick={() =>{handleEdit(data.id, data.name)}} className="acceptButton">Edit</button>
                      <button onClick={() => { handleFinish(data.id, data.name) }} className="declineButton">Delete</button>
                    </div>
                  </div>
                </>
              ))
            }</div>
        }
      </div>
      <div>
        {
          bool2 ? "" : <>  
            <div className="subscribe" style={{ height: "25vh", width: "30%" }}>
              <p>Search By Id</p>
              <form onSubmit={submitHandleSearch}>
                <input type='text' placeholder='Enter Task Id' ref={searchTaskId} className="subscribe-input1" />
                <button className="submit-btn" onClick={handleShowById} >Submit</button>
              </form>
            </div>

            <div className='viewCard'>
              {
                bool3 ? ""
                  :
                  <div className="card" style={{marginLeft:"90%"}}>
                    <p className="cookieHeading">{searchtask.name}</p>
                    <p className="cookieDescription">{searchtask.descripction}.</p>
                    <p>{searchtask.status}</p>
                    <div className="buttonContainer">
                      <button className="acceptButton">Edit</button>
                      <button onClick={() => { handleFinish(searchtask.id) }} className="declineButton">Delete</button>
                    </div>
                  </div>
              }
            </div>
          </>
        }
      </div>


    </div>
  );
}

export default App;


