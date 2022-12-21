let id_user = null

let localStorage = window.localStorage;
if (localStorage.getItem("id_user")) {
    id_user = JSON.parse(localStorage.getItem("id_user"));
}else{
    window.location.href = "login.html"
}

