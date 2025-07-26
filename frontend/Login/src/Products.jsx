import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState("all")


    const fetchProducts = async () => {
        let url = "https://fakestoreapi.com/products"
        if (category == 'all') {
            const response = await fetch(url)
            const data = await response.json();

            setProducts(data)
        }
        else {
            console.log('else');

            const filterurl = `https://fakestoreapi.com/products/category/${category}`
            const response = await fetch(filterurl)
            const data = await response.json();

            setProducts(data)
        }

    }


    console.log(products, 'set');


    useEffect(
        () => {
            fetchProducts();
        }, [category]
    )
    // [ ] represents dependency



    console.log(products, 'pr');

    return (

        <div className="m-4 p-2 text-dark bg-opacity-25">
            <h1 className="d-flex justify-content-center text-info bg-dark">
                Products Page
            </h1>
            <div className="container ">

                <button onClick={() => setCategory('all')} className="btn btn-secondary m-2">All</button>
                <button onClick={() => setCategory("men's%20clothing")} className="btn btn-secondary m-2">Mens Clothing</button>
                <button onClick={() => setCategory("women's%20clothing")} className="btn btn-secondary m-2">Women Clothing</button>
                <button onClick={() => setCategory('jewelery')} className="btn btn-secondary m-2">Jewelwery</button>
                <button onClick={() => setCategory('electronics')} className="btn btn-secondary m-2" >Electronics</button>

                <div className="row">
                    {products.map((item, index) => {
                        console.log('Product item:', item);
                        return (
                        <div className="col-md-4 mb-4 d-flex justify-content-center align-items-center  bg-light" key={index}>
                            <div className="card h-100 w-100 text-center p-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="card-img-top mx-auto"
                                    style={{ maxWidth: "100px", height: "100px" }}
                                />
                                <div className="card-body">
                                    {item.id ? (
                                        <Link to={`/products/${item.id}`}>
                                            <h5 className="card-title">{item.title}</h5>
                                        </Link>
                                    ) : (
                                        <div style={{color: 'red'}}>No ID found for this product</div>
                                    )}
                                    <div className="card-text fw-bold fs-5">
                                        <sup>$</sup>{item.price}
                                    </div>
                                    <button className="btn btn-warning rounded-pill mt-2">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>

            </div>


        </div>


    )
}

export default Products