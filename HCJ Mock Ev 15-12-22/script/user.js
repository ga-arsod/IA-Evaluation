
let data;

const getData = async () => {
    const res = await fetch("https://lively-boot-boa.cyclic.app/books");
    const d = await res.json();
    data = d;
    appendData(d);
    return;
};

getData();


const appendData = async (data) => {
    data.map((ele) => {
        
        let img = document.createElement("img");
        img.src = ele.image_url;

        let title = document.createElement("h2");
        title.textContent = ele.book_name;

        let author = document.createElement("h4")
        author.textContent = "Author : " + ele.author;

        let genre = document.createElement("h4")
        genre.textContent = "Genre : " + ele.genre;

        let edition = document.createElement("h4");
        edition.textContent = "Edition : " + ele.edition;

        let publisher = document.createElement("h4");
        publisher.textContent = "Publisher : " + ele.publisher;

        let cost = document.createElement("h4");
        cost.textContent = "Cost : " + ele.cost;

        let btn = document.createElement("button");
        btn.textContent = "Borrow";

        btn.onclick = () => {
            openModal(ele);
        }

        let div = document.createElement("div");
        div.append(title, author, genre, edition, publisher, cost, btn);

        let div2 = document.createElement("div");
        div2.append(img, div);

        document.getElementById("mainContainer").append(div2);
    });
};

let closeModal = document.getElementById("xBtn");
closeModal.onclick = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

const openModal = (ele) => {
    let modalDiv = document.getElementById("modalDiv");
    modalDiv.innerHTML = "";
    let modal = document.getElementById("modal");
    modal.style.display = "block";


    let img = document.createElement("img");
    img.src = ele.image_url;

    let title = document.createElement("h2");
    title.textContent = ele.book_name;

    let author = document.createElement("h4")
    author.textContent = "Author : " + ele.author;

    let edition = document.createElement("h4");
    edition.textContent = "Edition : " + ele.edition;

    
    
    let borrower = document.createElement("h4");
    borrower.textContent = "Borrowed By : John Doe"
    let date = document.createElement("h4");
    date.textContent = "Date of Borrow : 29-10-2022";

    let cost = document.createElement("h4");
    cost.textContent = "Cost : " + ele.cost;

    let btn = document.createElement("button");
    btn.textContent = "Close";

    btn.onclick = () => {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    let btn2 = document.createElement("button");
    btn2.textContent = "Cofirm";

    btn2.onclick = () => {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    let div2 = document.createElement("div");
    div2.append(btn,btn2);

    modalDiv.append(img, title, author, edition, borrower, date, cost, div2);
}