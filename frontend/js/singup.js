function registrarse() {
    $("input").removeClass("is-valid is-invalid")
    $("#alert").empty()

    if ($("#confirm_password").val() !== $("#password").val()) {
        $("#password").addClass("is-invalid")
        $("#confirm_password").addClass("is-invalid")
        $("#alert").html("<i class='fe-alert-circle'></i> Las contraseñas deben ser las mismas")
        
        return false
    }

    let url = "http://localhost:3000/user/register"
    let new_user = {
        full_name: $("#full_name").val(),
        email_address: $("#email_address").val(),
        username: $("#username").val(),
        password: $("#password").val()
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(new_user),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((response) => {
        if (response.status == 1) {
            let localStorage = window.localStorage
            localStorage.setItem("id_user", JSON.stringify(response.data["_id"]))
            localStorage.setItem("username", JSON.stringify(response.data["username"]))
            localStorage.setItem("new_user", JSON.stringify("true"))
            toastr.success('Bienvenido a Pokemon Favorites', 'Registrado correctamente', { "positionClass": "toast-bottom-left" })
            window.location.href = "index.html"
        }else{
            $("#username").addClass("is-invalid")
            toastr.warning(response.data, 'Oops...', { "positionClass": "toast-bottom-left" })
        }
    }).catch(function (error) {
        toastr.warning('Error en el servidor!', 'Oops...', { "positionClass": "toast-bottom-left" })
    })

    return false
}
