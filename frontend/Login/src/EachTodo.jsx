import React from 'react';
function EachTodo({item,index,handleCancel,handleDelete,handleEdit,handleSave,toggleCompleted,todos,setTodos,editTodoText,setEditTodoText}){

    return(
        <li key={index} className="mt-3">

                    {
                        item.isEditing ? (
                            <>
                            <input type="text" name="" id="" placeholder="enter the text to edit.." 
                            onChange={(e) => setEditTodoText(e.target.value)}/>
                            <button className="btn btn-primary ms-3" onClick={() => handleSave(index)}>Save</button>     
                            <button className="btn btn-danger ms-3" onClick={() => handleCancel(index)}>Cancel</button>
                            </>
                            
                        ) : (
                            <>
                            <span style={{textDecoration: item.completed ? "line-through" : ""}}
                            onClick={() => toggleCompleted(index)}
                            >{item.text}
                            </span>
                            <button className="btn btn-primary ms-3" onClick={() => handleEdit(index)}>Edit</button>
                            <button className="btn btn-danger ms-3" onClick={() => handleDelete(index)}>Delete</button>
                            </>
                            
                        )
                    }
                 </li>
    )

}

export default EachTodo;