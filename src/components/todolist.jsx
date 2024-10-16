import { useEffect, useState } from "react";
import '../css/todolist.css'
import axios from "axios"

const InitialData = {
  task: "",
  id: 0,
};

const TodoList = () => {
  const [taskdata, setTaskData] = useState(InitialData);
  const [taskList, setTaskList] = useState([]);

  const [edit, setEdit] = useState(false);
  // const [showId, setShowId] = useState();

  const ValueChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskdata,  
      [name]: value,
    });
  };

  const ValueAdd = async (event) => {
    console.log("TASKDTA==",JSON.stringify(taskdata));
    event.preventDefault();
    try {
      if (taskdata.id) {
        const apiToEdit = await axios.put(`http://localhost:3002/todoedit/${taskdata.id}`, taskdata);
          console.log("apiToEdit==",JSON.stringify(apiToEdit));
          if (apiToEdit.status === 200){
            console.log("your task is updated");
            handleGetAllTodoList();
          }
      } else {
        const apiTodoAdd = await axios.post("http://localhost:3002/todolist",taskdata)
        // console.log(apiTodoAdd, "apitodoadd")
        if(apiTodoAdd.status === 201){
          console.log("your task is added")
          handleGetAllTodoList();
        }
      }

      
      
    } catch (error) {
      console.log(error.message)
      
    }
    
  }
  const handleGetAllTodoList = async(req, res) => {
    try {
      const apiTodoListing = await axios.get("http://localhost:3002/gettodolist")
      console.log(apiTodoListing, "apitodolistcheck")
      if(apiTodoListing.status === 200){
        const {data} = apiTodoListing.data
        setTaskList(data)
      }
      
    } catch (error) {
      console.log(error.message)
      
    }
  }
  useEffect(()=>{
    handleGetAllTodoList()},
  []);

  const ValueDelete = async(id) => {
    console.log(id);
    try {
      const apiTodoDelete = await axios.delete(`http://localhost:3002/tododelete/${id}`);
      if(apiTodoDelete.status === 200){
        console.log("your task deleted successfully")
        handleGetAllTodoList();
      
      }
      
    } catch (error) {
      console.log(error.message)
    }
  };

  const ValueEdit = async (taskObj) => {
    setEdit(true);
    setTaskData({
      task: taskObj.task,
      id: taskObj._id,
    })
    // setShowId(id)
   
  };

  const { task, id } = taskdata;
  return (
    <>
    <div className="container">
      <div>
        <h2>To-do List</h2>
        <input
          name="task"
          value={task}
          type="text"
          placeholder="enter yout task"
          onChange={ValueChange}
        />
        <input type="hidden" name="id" id="id" value={id} />
        <button onClick={ValueAdd}>{edit ? 'Edit' : 'Add'}</button>
      </div>
      <div className="table-box">
        <table>
          <tr >
            <th>Task List</th>
            <th>Button</th>
          </tr>
          {taskList?.map((value, i) => (
            <tr key={value.id}>
              <td>{value.task}</td>
              <td>
                <button className="table-btn" onClick={() => ValueDelete(value._id)}>delete</button>
                <button className="table-edit-btn" onClick={() => ValueEdit(value)}>Edit</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      </div> 
    </>
    );

};
export default TodoList;
