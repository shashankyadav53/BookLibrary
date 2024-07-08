document.getElementById("search-button").addEventListener("click",function(){
    const query = document.getElementById("search-input").ariaValueMax;
    searchBooks(query);
})

// Event Listener for pressing Enter Key in the search input
document.getElementById("search-input").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        const query = document.getElementsById("search-input").value;
        searchBooks(query);
    }
})

// function to handle featching book data based on the search query
const searchBooks = (query) =>{
    fetch(`https://openlibrary.org/search.json?=${query}`)
    .then(response => response.json())
    .then(data => {
        displayBooks(data.docs);
    })
    .catch(error => {
        console.log("Error fetching data:", error);
    })
}

// function to display the fetched book information 
const displayBooks = (books) => {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    books.slice(0, 16).forEach(book => {
       const bookElement = document.createElement("div");
       bookElement.className = "book"; 

       // Extract book info (cover ID, title, author)
       const coverID = book.cover_i ? book.cover_i : null;

       const coverUrl = coverID
        ? `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`
        : "https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available"

        // construct the HTML content for the book element
        bookElement.innerHTML = `
        <img src = "${coverUrl}" alt = "${book.title}" />
        <h3>${book.title}</h3>
        <p>by ${book.auther_name ? book.auther_name.join(', '): "Unknown Author"}</p>
        `; 

        //Append the book element to the container
        container.appendChild(bookElement);
    });
};