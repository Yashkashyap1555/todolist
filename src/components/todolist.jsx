import { useState } from "react";
import '../css/todolist.css'

const InitialData = {
  name: "",
};

const TodoList = () => {
  const [task, setTask] = useState(InitialData);
  const [taskList, setTaskList] = useState([]);
  console.log(taskList, "8767");

  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const ValueChange = (e) => {
    const { name, value, id } = e.target;
    setTask({
      ...task, 
      [id]:task.id + 1, 
      [name]: value,
    });
  };

  const ValueAdd = (event) => {
   
    event.preventDefault();
    if (edit) {
        const updatedTaskList = taskList.map((item, index) =>
          index === editIndex ? task : item
        );
        setTaskList(updatedTaskList);
        setEdit(false);
        setEditIndex(null);
      } else {
      
        setTaskList([...taskList, task]);
      }
      setTask(InitialData); 
    };

  const ValueDelete = (Data) => {
    console.log(Data, "confirm delete");
    const valuefilter = taskList.filter((value, i) => i !== Data);
    setTaskList(valuefilter);
  };

  const ValueEdit = (i) => {
    const taskToEdit = taskList[i];
    setTask(taskToEdit);
    setEdit(true);
    setEditIndex(i); 
  };

  const { name } = task;
  return (
    <>
    <div className="container">
      <div>
        <h2>To-do List</h2>
        <input
          name="name"
          value={name}
          type="text"
          placeholder="enter yout task"
          onChange={ValueChange}
        />
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
              <td>{value.name}</td>
              <td>
                <button className="table-btn" onClick={() => ValueDelete(i)}>delete</button>
                <button className="table-edit-btn" onClick={() => ValueEdit(i)}>Edit</button>
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
