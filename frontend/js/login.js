function iniciar_sesion() {
    $("input").removeClass("is-valid is-invalid")
    $("#alert").empty()

    let url = "http://localhost:3000/api/login"
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    }

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then((response) => {
        if (response.length == 0) {
            $("#username").addClass("is-invalid")
            $("#password").addClass("is-invalid")
            $("#alert").html("<i class='fe-alert-circle'></i> Usuario y/o contraseña incorrectos")
        }else{
            let localStorage = window.localStorage
            localStorage.setItem("id_user", JSON.stringify(response[0]["_id"]))
            window.location.href = "index.html"
        }
    }).catch(function (error) {
        toastr.warning('Error en el servidor!', 'Oops...')
    })
    
    return false
}
