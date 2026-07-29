const offersContainer = document.getElementById("offersContainer")


document.getElementById("offerForm").addEventListener("submit", async function(e) {
    e.preventDefault()
    const formData = new FormData(this)
    formData.append("description", document.getElementById("description").value)
    formData.append("price", document.getElementById("price").value)
    console.log(formData)
    //Title and Image is already inside the formData, no need to append it


    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        })
        if (!response.ok) {
            throw new Error("Upload failed")
        }
        const result = await response.json()
    } catch (error) {
        console.error("Error:", error)
    }
    offerForm.reset()
    fetchOffers()

})

const fetchOffers = async () => {
    try {
        const response = await fetch("http://localhost:3000/offers")
        const offers = await response.json()

        console.log(offers)
        offersContainer.innerHTML = ""

        offers.forEach((offer) => {
            const offerElement = document.createElement("div")
            offerElement.classList.add("col", "s12", "m6", "l4","offerDiv")

            const offerCardElement = document.createElement("div")
            offerCardElement.classList.add("card", "hoverable")

            const offerCardImageElement = document.createElement("div")
            offerCardImageElement.classList.add("card-image")

            const offerCardContentElement = document.createElement("div")
            offerCardContentElement.classList.add("card-content")


            const titleElement = document.createElement("span")
            const descriptionElement = document.createElement("p")
            const priceElement = document.createElement("p")

            titleElement.classList.add("card-title")
            titleElement.textContent = offer.title
            descriptionElement.textContent = offer.description
            priceElement.textContent = `Price: ${offer.price}€`

            const imageElement = document.createElement("img")
            imageElement.classList.add("responsive-img")
            imageElement.src = offer.imagePath ? `${offer.imagePath}` : ""

            offerCardImageElement.appendChild(imageElement)
            offerCardImageElement.appendChild(titleElement)
            offerCardElement.appendChild(offerCardImageElement)
            
            offerCardContentElement.appendChild(priceElement)
            offerCardContentElement.appendChild(descriptionElement)
            offerCardElement.appendChild(offerCardContentElement)

            offerElement.appendChild(offerCardElement)

            offersContainer.appendChild(offerElement)
        })
    } catch (error) {
        console.error("Error", error)
    }
}

fetchOffers()