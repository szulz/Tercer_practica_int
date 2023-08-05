function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}


async function finishPurchase(cartid) {
    let redirectUrl = `/carts/${cartid}/checkout`
    fetch(`/carts/${cartid}/checkout`, {
        method: 'GET',
    })
    window.location.href = redirectUrl
}
