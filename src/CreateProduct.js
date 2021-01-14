import {useState} from 'react'

export default function CreateProduct({addToProducts}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        let product = {
            name: name,
            description: description,
            price: price
        }
        addToProducts(product)
    }

    return (
        <>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input value={name} onChange={event => setName(event.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={event => setDescription(event.target.value)}></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input value={price} onChange={event => setPrice(event.target.value)} />
                </div>
                <button>Submit New Product</button>
            </form>
        </>
    )
}
