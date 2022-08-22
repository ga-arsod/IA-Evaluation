let {country} = JSON.parse(localStorage.getItem("user"));

import { navbar } from "../components/navbar.js";
import { sidebar } from "../components/sidebar.js";

document.getElementById("navbar").innerHTML = navbar();

let side = document.getElementById("sidebar");
sidebar(side)

let getID = (event) => {

}

let searchData = async () => {
    let q = document.getElementById("search").value

    try {
        let res = await fetch(`https://masai-mock-api-2.herokuapp.com/news?q=${q}`);

        let data = await res.json();

        appendData(data.articles);
    }
    catch (err) {
        console.log({ error: err })
    }
}

// document.getElementsByClassName("links").addEventListener("click", (event) => {
//     console.log(event)
// })

let getData = async (id) => {
    if(!id) {
        id = country;
    }
    try {
        let res = await fetch(`https://masai-mock-api-2.herokuapp.com/news/top-headlines?country=${id}`);
        
        let data = await res.json();

        appendData(data.articles);
    }
    catch(err) {
        console.log({error : err})
    }
};

getData();

let appendData = (data) => {
    let container = document.getElementById("news_container");
    container.innerHTML = "";

    console.log(data);
    data.map((ele) => {

        let div = document.createElement("div");
        div.className = "news";

        div.addEventListener("click", () => {
            localStorage.setItem("news", JSON.stringify(ele));

            console.log(ele);

            window.location.href = "./news.html"
        })

        let img = document.createElement("img");
        let title = document.createElement("h4");
        let author = document.createElement("h3");

        let div2 = document.createElement("div");

        img.src = ele.urlToImage;
        title.textContent = ele.title;
        author.textContent = ele.author;

        div2.append(title, author)

        div.append(img, div2)
        container.append(div);
    })
}

