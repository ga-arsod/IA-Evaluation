

async function loginFun() {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passInput").value

    if(email.length == 0 || password.length == 0) {
        alert("E-mail or password can't be empty");
        return;
    }

    const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await res.json();

    if(data.error) {
        alert(data.error);
        return;
    }

    localStorage.setItem("mockToken", data.token);
    alert("Successfully logged in as an Admin")
    location.href = "/admin.html";
    return
}