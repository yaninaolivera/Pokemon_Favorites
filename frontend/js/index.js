let id_user = null

let localStorage = window.localStorage;
if (localStorage.getItem("id_user")) {
    id_user = JSON.parse(localStorage.getItem("id_user"));
    username = JSON.parse(localStorage.getItem("username"));
    $("#sesion_username").text(username)
}else{
    window.location.href = "login.html"
}

if (localStorage.getItem("new_user")) {
    toastr.info('Bienvenido a Pokemon Favorites!', 'Cuenta creada correctamente', {"positionClass": "toast-bottom-left"})

    let localStorage = window.localStorage;
    localStorage.removeItem('new_user');
}

pokemon()
async function pokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/generation/1/")
    let data = await response.json()

    let html = "<option value=''>Seleccione . . .</option>"
    for(index in data.pokemon_species){
        html += "<option value="+data.pokemon_species[index].name+">"+data.pokemon_species[index].name+"</option>"
    }
    $("#lista").append(html)
}

async function ver() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+$("#lista").val())
    let data = await response.json()

    $("#poke_img").attr("src", data.sprites.front_default)
    $("#poke_name").text(data.name)
    $("#card_bg").removeClass("bg-warning")

    let url = "http://localhost:3000/pokemon/verify_favorite"
    let verify_pokemon = {
        name: $("#poke_name").text(),
        id_user: id_user
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(verify_pokemon),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then((response) => {
        if (response.length == 0) {
            $("#poke_button").html('<button type="button" class="btn btn-pink" onclick="agregar_favorito()"><i class="fe-heart"></i> Agregar a favoritos</button>')
        }else{
            $("#card_bg").addClass("bg-warning")
        }
    }).catch(function (error) {
        toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
    }) 
}

function agregar_favorito(){
    if (window.confirm("¿Estás seguro de agregar a tus favoritos?")) {
        let url = "http://localhost:3000/pokemon/register"
        let new_pokemon = {
            name: $("#poke_name").text(),
            photo: $("#poke_img").attr("src"),
            id_user: id_user
        }

        fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(new_pokemon),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then((response) => {
            toastr.success("Agregado a favoritos correctamente", 'Operación exitosa', { "positionClass": "toast-bottom-left" })
            setTimeout(() => {
                window.location.href = "index.html"
            }, 500);
        }).catch(function (error) {
            toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
        }) 
    }
}