const token = localStorage.getItem("mockToken");

if (!token) {
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

    const res = await fetch("https://lively-boot-boa.cyclic.app/books", {
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
    const res = await fetch("https://lively-boot-boa.cyclic.app/books");
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

    const res = await fetch(`https://lively-boot-boa.cyclic.app/books/${id}`, {
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
    Img.id = "modalImg"

    const book_name = document.createElement("input");
    book_name.value = ele.book_name;
    book_name.id = "modalBook_name"

    const author = document.createElement("input");
    author.value = ele.author;
    author.id = "modalAuthor"

    const genre = document.createElement("select");
    genre.id = "modalGenre"

    const opt1 = document.createElement("option");
    opt1.textContent = "Science"
    opt1.value = "science";
    const opt2 = document.createElement("option");
    opt2.textContent = "Fiction";
    opt2.value = "fiction";
    const opt3 = document.createElement("option");
    opt3.textContent = "History";
    opt3.value = "history";
    const opt4 = document.createElement("option");
    opt4.textContent = "Tech"
    opt4.value = "tech";

    const opt5 = document.createElement("option");
    opt5.textContent = "Business";
    opt5.value = "business";

    genre.append(opt1, opt2, opt3, opt4, opt5);
    genre.value = String(ele.genre);

    const edition = document.createElement("select");
    edition.id = "modalEdition"

    const popt1 = document.createElement("option");
    popt1.textContent = "2020"
    popt1.value = "2020";
    const popt2 = document.createElement("option");
    popt2.textContent = "2021";
    popt2.value = "2021";
    const popt3 = document.createElement("option");
    popt3.textContent = "2022";
    popt3.value = "2022";

    edition.append(popt1, popt2, popt3);
    edition.value = String(ele.edition);

    const publisher = document.createElement("input");
    publisher.value = ele.publisher;
    publisher.id = "modalPublisher";

    const cost = document.createElement("input");
    cost.value = ele.cost;
    cost.id = "modalCost";

    const button = document.createElement("button");
    button.textContent = "Edit";
    button.type = "submit";

    button.onclick = () => {
        let modal = document.getElementById("modal");
        modal.style.display = "none";

        editFun(ele.id);
    }

    document.getElementById("modalForm").append(Img, book_name, author, genre, edition, publisher, cost, button);
};

let closeModal = document.getElementById("xBtn");
closeModal.onclick = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}


const editFun = async(id) => {
    event.preventDefault();
    const formData = {
        image_url: document.getElementById("modalImg").value,
        book_name: document.getElementById("modalBook_name").value,
        author: document.getElementById("modalAuthor").value,
        genre: document.getElementById("modalGenre").value,
        edition: document.getElementById("modalEdition").value,
        publisher: document.getElementById("modalPublisher").value,
        cost: document.getElementById("modalCost").value,
        borrowed: false
    };

    const res = await fetch(`https://lively-boot-boa.cyclic.app/books/${id}`, {
        mode: 'cors',
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    getData();
}