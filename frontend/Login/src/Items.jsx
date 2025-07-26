import React, { useEffect, useState } from "react";

function Items() {
    const [products, setProducts] = useState([])
    const [category,setCategory] = useState("electronics")
    const [loading,setLoading]  = useState(false)
    const fetchProducts = async () => {

        setLoading(true);


        let url = "https://fakestoreapi.com/products"
        if(category == 'all'){
            const response = await fetch(url)
            const data = await response.json();

            setProducts(data)
        }
        else{
            console.log('else');
            
            const filterurl = `https://fakestoreapi.com/products/category/${category}`
            const response = await fetch(filterurl)
            const data = await response.json();

            setProducts(data)
        }

    }
    setLoading(false);
    console.log(products,'set');
    
    
        useEffect(
            () => {
                fetchProducts();
            },[category]
        )

    console.log(products, 'pr');

    return (

        <>
        {
            loading ? ( <h1>Loading.. </h1>) : (<div>
            <h1 className="d-flex justify-content-center">
                Products Page
            </h1>
            <div className="container">

                <button onClick={() => setCategory('all')}>all</button>
                <button onClick={() => setCategory("men's%20clothing")}>Mens Clothing</button>
                <button onClick={() => setCategory("women's%20clothing")}>Women Clothing</button>
                <button onClick={() => setCategory('jewelery')}>Jewellwery</button>
                <button onClick={() => setCategory('electronics')}>Electronics</button>

                <div className="col">
                    {
                        products.map((item,index) => (
                            <div className="col-9" key={index}>

                                <div className="border d-flex flex-row align-items-center py-5 mx-5 my-3">
                                    <div className="mb-2 mx-5"><img src={item.image} alt=""  width='100px' height='100px' /></div>
                                    <div>
                                        <h5>{item.title}</h5>


                                        <div className="fv-bold fs-3"><sup>$</sup>{item.price}</div>
                                        <button className="btn btn-warning border rounded-pill">Add to cart</button>
                                    </div>

                                </div>
                            </div>


                        ))
                    }
                </div>
            </div>


        </div>)
        }
        
        </>

    )
}

export default Items