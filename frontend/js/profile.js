let id_user = null

let localStorage = window.localStorage;
if (localStorage.getItem("id_user")) {
    id_user = JSON.parse(localStorage.getItem("id_user"));
    username = JSON.parse(localStorage.getItem("username"));
    $("#sesion_username").text(username)
} else {
    window.location.href = "login.html"
}

profile()
async function profile() {
    let response = await fetch("http://localhost:3000/user/profile/" + id_user)
    let data = await response.json()

    $("#txt_full_name").text(data.full_name)
    $("#txt_email_address").text(data.email_address)
    $("#txt_username").text(data.username)
    
    $("#full_name").val(data.full_name)
    $("#email_address").val(data.email_address)
    $("#username").val(data.username)
    $("#password").val(data.password)
    $("#confirm_password").val(data.password)
}

function habilitar() {
    $(".form-control").removeAttr("disabled")
}

function actualizar() {
    $("input").removeClass("is-valid is-invalid")
    $("#alert").empty()

    if ($("#confirm_password").val() !== $("#password").val()) {
        $("#password").addClass("is-invalid")
        $("#confirm_password").addClass("is-invalid")
        $("#alert").html("<i class='fe-alert-circle'></i> Las contraseñas deben ser las mismas")

        return false
    }

    if (window.confirm("¿Estás seguro de actualizar tus datos?")) {
        let url = "http://localhost:3000/user/update/" + id_user
        let user = {
            full_name: $("#full_name").val(),
            email_address: $("#email_address").val(),
            username: $("#username").val(),
            password: $("#password").val()
        }

        fetch(url, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then((response) => {
                toastr.success('Datos actualizados correctamente!', 'Operaciòn exitosa', { "positionClass": "toast-bottom-left" })
                profile()
            }).catch(function (error) {
                toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
            })
    }
    
    return false
}

function eliminar_cuenta() {
    if (window.confirm("¿Estás seguro de eliminar tu cuenta?")) {
        fetch('http://localhost:3000/user/delete/' + id_user, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((response) => {
            toastr.success('Eliminado correctamente', 'Operación realizada', { "positionClass": "toast-bottom-left" })
            let localStorage = window.localStorage;
            localStorage.removeItem('id_user');
            window.location.href = "login.html"
        }).catch(function (error) {
            toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
        })
    }
}