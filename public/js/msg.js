var erro = document.getElementById('error')
var success = document.getElementById('success')

function msg(e) {
    if (e) {
        erro.style.display = "flex"
        erro.innerHTML = e
    } else {
        success.style.display = "flex"
        success.innerHTML = "Operação realizada com sucesso!"
    }
    setTimeout(() => {
        erro.style.display = "none"
        erro.innerHTML = ""
        success.style.display = "none"
        success.innerHTML = ""
    }, 5000)
}
