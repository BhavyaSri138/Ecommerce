import { useEffect, useState } from "react"

function Counter(params) {
    const[count,setCount] = useState(0)

    const handleIncrement = () => {
        setCount(count+1)
    }
    useEffect(() => {
        console.log("running the useEffect");
        
    })
    // here no dependency
    return(
        <div>
            <h1>
            counter : {count}
            </h1>
        <button className="btn btn-warning border rounded-pill" onClick={() => handleIncrement()}> Increment</button>
        </div>
        
    )
    
}
export default Counter