const token = localStorage.getItem("mockToken");

if(!token) {
    location.href = "/login.html"
}


const postData = async () => {
    
    const formData = {
        image_url: document.getElementById("image_url").value,
        book_name: document.getElementById("book_name").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        edition: document.getElementById("edition").value,
        publisher: document.getElementById("publisher").value,
        cost: document.getElementById("cost").value,
        borrowed: false
    };

    const res = await fetch("http://localhost:3000/books", {
        method: "POST", 
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    
    const data = await res.json();

    alert(`Added ${data.book_name} Successfully`);
};

const getData = async () => {
    const res = await fetch("http://localhost:3000/books");
    const data = await res.json();

    appendData(data);
    return;
};

getData();


const appendData = (data) => {

    document.querySelector("tbody").innerHTML = "";

    data.map((ele) => {
        const tr = document.createElement("tr");

        const Img = document.createElement("td");
        Img.textContent = ele.image_url;

        const book_name = document.createElement("td");
        book_name.textContent = ele.book_name;

        const author = document.createElement("td");
        author.textContent = ele.author;

        const genre = document.createElement("td");
        genre.textContent = ele.genre;

        const edition = document.createElement("td");
        edition.textContent = ele.edition;

        const publisher = document.createElement("td");
        publisher.textContent = ele.publisher;

        const cost = document.createElement("td");
        cost.textContent = ele.cost;


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.onclick = () => {
            editBook(ele);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () => {
            deleteBook(ele.id);
        }

        const editTd = document.createElement("td");
        editTd.append(editBtn);
        const deleteTd = document.createElement("td");
        deleteTd.append(deleteBtn);

        tr.append(Img, book_name, author, genre, edition, publisher, cost, editTd, deleteTd);

        document.querySelector("tbody").append(tr);
    })
};


const deleteBook = async (id) => {

    const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE"
    });

    getData();
}


const editBook = async (ele) => {
    document.getElementById("modalForm").innerHTML = "";

    let modal = document.getElementById("modal");
    modal.style.display = "block";

    const Img = document.createElement("input");
    Img.value = ele.image_url;

    const book_name = document.createElement("input");
    book_name.value = ele.book_name;

    const author = document.createElement("input");
    author.value = ele.author;

    const genre = document.createElement("select");

    const opt1 = document.createElement("option");
    opt1.textContent ="Science"
    const opt2 = document.createElement("option");
    opt2.textContent= "Fiction";
    const opt3 = document.createElement("option");
    opt3.textContent= "History";
    const opt4 = document.createElement("option");
        opt4.textContent = "Tech"
    
    const opt5 = document.createElement("option");
    opt5.textContent = "Business";

    genre.append(opt1, opt2, opt3, opt4, opt5);

    const edition = document.createElement("select");
    
    const popt1 = document.createElement("option");
    popt1.textContent = "2020"
    const popt2 = document.createElement("option");
    popt2.textContent = "2021";
    const popt3 = document.createElement("option");
    popt3.textContent = "2022";
    const publisher = document.createElement("input");

    edition.append(popt1, popt2, popt3);


    publisher.value = ele.publisher;


    
    const cost = document.createElement("input");
    cost.value = ele.cost;

    const button = document.createElement("button");
    button.textContent = "Edit";
    button.type = "submit";

    document.getElementById("modalForm").append(Img, book_name, author, genre, edition, publisher, cost, button);
};

let closeModal = document.getElementById("xBtn");
closeModal.onclick = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}