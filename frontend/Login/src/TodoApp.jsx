import { useState } from "react";
import EachTodo from "./EachTodo";

function TodoApp(){
    const [todos,setTodos] = useState([
        {
            id:1,
            text:"homework",
            completed:true,
            isEditing:false
        },
        {
            id:2,
            text:"check",
            completed:false,
            isEditing:false
        },
    ])


    const [todoText,setTodoText] = useState("");
    const [editTodoText,setEditTodoText] = useState("")

    const addTodo = (e) => {
        setTodoText(e.target.value);
        
    }

    const handleSubmit = (e) =>{
        console.log("submit triggred");
        if (todoText.trim() !== "") {
            const temp = [...todos,{text: todoText,completed:false}]
            setTodos(temp)
            setTodoText("")
        }
    }

    const toggleCompleted = (index) => {

        const temp = [...todos]
        temp[index].completed = !temp[index].completed
        console.log(todos[index],"index");
        
        setTodos(temp)

        // setTodos(
        //     todos.map((item,i) => i === index ? {...item,completed : !item.completed} : item)
        // )
        
    }

    const handleDelete = (index) => {

        // splice() and filter() both are used to delete the element from the array

        //splice() is used to delete the element from the array
        //filter() is used to filter the element from the array

        // const temp = [...todos]

        // temp.splice(index,1)
        // setTodos(temp)

        const filterData = todos.filter((item,i) => i !== index)
        setTodos(filterData)
    }

    const handleEdit = (index) => {
        const temp = [...todos]
        temp[index].isEditing = true
        setTodos(temp)
    }

    const handleCancel = (index) => {
        const temp = [...todos]
        temp[index].isEditing = false
        setTodos(temp)
    }

    const handleSave = (index) => {
        const temp = [...todos]
        temp[index].text = editTodoText
        temp[index].isEditing = false
        temp[index].completed = todos[index].completed
        setTodos(temp)

    }
    console.log(editTodoText,"edit");
    
    return(
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-center">Todo Application</h1>
            <div>

                <input type="text" 
                placeholder="enter the todo"
                value={todoText}
                onChange={(e) => addTodo(e)}/>

                <button className="ms-3" onClick={(e) => handleSubmit(e)}>Submit</button>

            </div>
            

            {
                todos.map((item,index) => (
                    <div key={index}>
                        <EachTodo 
                        item={item} 
                        index={index}
                        setEditTodoText = {setEditTodoText}
                        handleSave = {handleSave}
                        handleCancel = {handleCancel}
                        handleDelete = {handleDelete}
                        handleEdit = {handleEdit}
                        toggleCompleted = {toggleCompleted}/>
                    </div>
                
                    )
                )
            }
        </div>
        
        
    )
}
export default TodoApp