let id_user = null

let localStorage = window.localStorage;
if (localStorage.getItem("id_user")) {
    id_user = JSON.parse(localStorage.getItem("id_user"));
    username = JSON.parse(localStorage.getItem("username"));
    $("#sesion_username").text(username)
} else {
    window.location.href = "login.html"
}

listar()
async function listar() {
    $("#lista").empty()

    let response = await fetch("http://localhost:3000/pokemon/list/"+id_user)
    let data = await response.json()

    for (index in data) {
        let html = `
            <div class="col-md-2 mb-4">
                <div class="card bg-gray">
                    <div class="card-body text-center">
                        <img src="${data[index].photo}" width="100%">
                        <h6 class="text-secondary mt-3 mb-3"><i>${data[index].name}</i></h6>
                        <button type="button" class="btn btn-danger btn-sm" onclick="eliminar_favorito('${data[index]._id}')"><i class="fe-trash"></i></button>
                    </div>
                </div>
            </div>
        `
        $("#lista").append(html)
    }
}

function eliminar_favorito(id) {
    if (window.confirm("¿Estás seguro de eliminar de tus favoritos?")) {
        fetch('http://localhost:3000/pokemon/delete/' + id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((response) => {
            toastr.success('Eliminado correctamente', 'Operación realizada', { "positionClass": "toast-bottom-left" })
            listar()
        }).catch(function (error) {
            toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
        })
    }
}