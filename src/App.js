import { BrowserRouter, Switch, Route, Link, useRouteMatch} from "react-router-dom"
import {useState, useEffect} from 'react'
import ContactPage from './ContactPage.js'
import HomePage from './HomePage.js'
import AboutPage from './AboutPage.js'
import ProductsPage from "./ProductsPage.js"
import seedProducts from './seed.js'

function Product() {
  const products = seedProducts()
  const {params} = useRouteMatch()

  const product = products.find(element => element.id == params.id)
  return (
    <>
      <h1>show individual product</h1>
      <p>Product Name: {product.name}</p>
      <p>Product Description: {product.description}</p>
      <p>Product Price: {product.price}</p>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/contact">Contact</Link> | 
          <Link to="/about">About</Link> | 
          <Link to="/">Home</Link> |
          <Link to="/products">Products</Link>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/contact" component={ContactPage}></Route>
        <Route exact path="/about" component={AboutPage}></Route>
        <Route path="/products/show/:id" component={Product} ></Route>
        <Route path="/products" component={ProductsPage}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;