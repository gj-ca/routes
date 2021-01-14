import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import {useEffect, useState} from 'react'
import CreateProduct from './CreateProduct'
import seedProducts from './seed.js'

function ShowProduct({products}) {
    const [chosenProduct, setProduct] = useState(null)
    const [option, setOption] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        let product = products.find(element => element.id == option)
        setProduct(product)
    }

    const handleChange = (event) => {
        setOption(event.target.value)
    }

    return (
        <>
            <h1>Show Product</h1>
            {/* products/:id */}
            <ol>
                {products.map((product) => (
                    <li><Link to={`/products/show/${product.id}`}>{product.name}</Link></li>
                ))}
            </ol>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    {products.map(product => (
                       <option value={product.id}>{product.name}</option> 
                    ))}
                </select>
                <button>Go!</button>
            </form>
            {chosenProduct == null ? <p>Choose a product!</p> : (
                <>
                    <ul>
                        <li>{chosenProduct.name}</li>
                        <li>{chosenProduct.description}</li>
                        <li>{chosenProduct.price}</li>
                    </ul>
                </>
            )}
        </>
    )
}

function UpdateProduct() {
    return <h1>Update Product</h1>
}

function DeleteProduct() {
    return <h1>Delete Product</h1>
}

export default function ProductsPage() {
    const {path} = useRouteMatch()
    const [products, setProducts] = useState([])

    // Mounting Function
    useEffect(() => {
        // Mock call to api
        let mockData = seedProducts()
        // update products state
        setProducts(mockData)
    }, [])

    const addToProducts = (product) => {
        product.id = products.length + 1
        products.push(product)
    }

    return (
        <>
        <h1>Products</h1>
        <ol>
            {/* /products/new */}
            <li><Link to={`${path}/new`}>Create Product</Link></li>
            {/* /products/show */}
            <li><Link to={`${path}/show`}>Show Product</Link></li>
            <li><Link to={`${path}/update`}>Update Product</Link></li>
            <li><Link to={`${path}/delete`}>Delete Product</Link></li>
        </ol>
        <Switch>
            <Route path={`${path}/new`} render={() =>
                <CreateProduct addToProducts={addToProducts} /> }>
            </Route>
            <Route exact path={`${path}/show`} render={() => 
                <ShowProduct products={products}/>}>
            </Route>
            <Route path={`${path}/update`} component={UpdateProduct}></Route>
            <Route path={`${path}/delete`} component={DeleteProduct}></Route>
        </Switch>
        </>
    )
}