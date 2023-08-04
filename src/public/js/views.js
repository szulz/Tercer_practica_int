function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}


//cuando preciono agregar, crear un carrito y si agrego, la proxima vez que toque, no crea otro carro, capturo el id => agrego el producto al carro.
async function addProduct(productId) {
    try {
        fetch(`/carts/products/${productId}`, {
            method: "POST",
        })
        window.alert("Product added to the cart")
    } catch (e) {
        res.send({ msg: e })
    }
}


function redirectToURL(url) {
    window.location.href = url;
}


async function logOut() {
    localStorage.clear()
    redirectToURL(`http://localhost:8080/auth/logOut`)
}