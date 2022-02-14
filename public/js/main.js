let drop = document.querySelector('.drop')

// Puxada ao clicar no perfil depois de logado
function cadOrLogin(a) {
  drop.style.height = '100vh'
  drop.style.width = '100vw'
  drop.style.display = 'flex'
  this.mode = a
  metodoCadOrLogin()
}

//Muda o conteúdo dos botões do dropDown de acordo ao this.mode
function metodoCadOrLogin() {
    var alterCadLogin = document.querySelectorAll('#drop-form .cad')
    var btnLoginOrCad = document.querySelector('.btn-login-or-cad')
    var aLoginOrCad = document.querySelector('.a-login-or-cad')
    //reset()
    if (this.mode !== "cad") {
        alterCadLogin.forEach((a) => {
          a.style.display = 'none'
          })
        btnLoginOrCad.innerHTML = "Entrar"
        aLoginOrCad.innerHTML = "Criar Conta"
        this.mode = "cad"
    } else {
        alterCadLogin.forEach((a) => {
            a.style.display = 'inline-block'
        })
        btnLoginOrCad.innerHTML = "Enviar"
        aLoginOrCad.innerHTML = "Entrar"
        this.mode = "login"
    }
}

//Altera os inputs que apareceram no dropDown de acordo com o this.mode
function signinOrCad() {
    this.mode === 'cad' ? signin() : cadastro()
}

//É puxado a cada keyup nos inputs de cadastro e login, é ele que informa se os valores são válidos ou não
function validation(a) {
  if(a === 'usuario') {
    let usuarioInp = document.getElementById('usuario-inp')
    let usuarioInpFeedback = document.getElementById('usuario-inp-feedback')
    if(usuarioInp.value.length < 1) {
      usuarioInp.className = "form-control is-invalid";
      usuarioInpFeedback.className = 'invalid-feedback';
      usuarioInpFeedback.innerHTML = 'Campo obrigatório.'
      return 'Erro'
    }
    if(/(?:\r\n|\r|\n)/.test(usuarioInp.value) || /\s\s+/.test(usuarioInp.value) || /^\s+|\s+$/g.test(usuarioInp.value) || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(usuarioInp.value)) {
      usuarioInp.className = "form-control is-invalid";
      usuarioInpFeedback.className = 'invalid-feedback';
      usuarioInpFeedback.innerHTML = 'Por favor, apenas letras, números e espaços.'
      return 'Erro'
    } else {
      usuarioInp.className = "form-control is-valid";
    }
  }
  if(a === 'senha') {
    let senhaInp = document.getElementById('senha-inp')
    let senhaInpFeedback = document.getElementById('senha-inp-feedback')
    if(senhaInp.value.length < 1) {
      senhaInp.className = "form-control is-invalid";
      senhaInpFeedback.className = 'invalid-feedback';
      senhaInpFeedback.innerHTML = 'Campo obrigatório.'
      return 'Erro'
    }
    if(/(?:\r\n|\r|\n)/.test(senhaInp.value) || /\s\s+/.test(senhaInp.value) || /^\s+|\s+$/g.test(senhaInp.value) || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(senhaInp.value)) {
      senhaInp.className = "form-control is-invalid";
      senhaInpFeedback.className = 'invalid-feedback';
      senhaInpFeedback.innerHTML = 'Por favor, apenas letras, números e espaços'
      return 'Erro'
    }
  
    if(senhaInp.value.length < 8 || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-)(*&%$#@!_+=>< ]+$/.test(senhaInp.value)){
        senhaInp.className = "form-control is-invalid";
        senhaInpFeedback.className = 'invalid-feedback';
        senhaInpFeedback.innerHTML = 'Mínimo de 8 caracteres.'
        return 'Erro'
      }
    senhaInp.className = "form-control is-valid";
    validation('validation-senha')
  }
  if(a === 'validation-senha') {
    let senhaInp = document.getElementById('senha-inp')
    let senhaInpFeedback = document.getElementById('senha-inp-feedback')
    let validationSenhaInp = document.getElementById('validation-senha-inp')
    let validationSenhaInpFeedback = document.getElementById('validation-senha-inp-feedback')
      if(validationSenhaInp.value.length < 1) {
      validationSenhaInp.className = "form-control is-invalid";
      validationSenhaInpFeedback.className = 'invalid-feedback';
      validationSenhaInpFeedback.innerHTML = 'Campo obrigatório.'
      return 'Erro'
    }
    if(senhaInp.value != validationSenhaInp.value) {
      validationSenhaInp.className = "form-control is-invalid";
      validationSenhaInpFeedback.className = 'invalid-feedback';
      validationSenhaInpFeedback.innerHTML = 'As senhas precisam ser iguais.'
      return 'Erro'
    }
    validationSenhaInp.className = "form-control is-valid";
  }
}

//Cadastra a conta via fetch
function cadastro() {
    user = {
        usuario: document.querySelector('#usuario-inp').value,
        senha: document.querySelector('#senha-inp').value,
        validateSenha: document.querySelector('#validation-senha-inp').value
    }
    const body = JSON.stringify(user)
    fetch('/usuarios', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((textContent) => {
            if (textContent) throw textContent
            reset()
            metodoCadOrLogin()
            msg()
        })
        .catch(err => msg(err))
}

//Entra na conta via fetch
function signin() {
  !this.autoLoginNome ? document.querySelector('#usuario-inp').value : document.querySelector('#usuario-inp').value = this.autoLoginNome
  !this.autoLoginSenha ? document.querySelector('#senha-inp').value : document.querySelector('#senha-inp').value = this.autoLoginSenha
    userSignin = {
        usuario: document.querySelector('#usuario-inp').value,
        senha: document.querySelector('#senha-inp').value
    }
    const body = JSON.stringify(userSignin)
    fetch('/signins', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error
            let keys = JSON.stringify(data[0][0])
            localStorage.setItem('user', keys)
            let userHistorico = !JSON.stringify(data[1]) ? null : JSON.stringify(data[1])
            if(userHistorico) localStorage.setItem('userHistorico', userHistorico)
            !this.autoLoginNome ? msg() : null
            !this.autoLoginNome ? getUser() : null
            reset() 
            !userHistorico ? null : getUserHistorico()
            !userHistorico ? null : carregaHistorico()
        })
        .catch(err => msg(err))

}

//Limp todos os imputs e se o modo for login remove o dropDown
function reset() {
    let inputCad = document.querySelectorAll("#drop-form .cad")
    let inputLogin = document.querySelectorAll("#drop-form .login")
    inputCad.forEach((a) => a.querySelector('input').value = "")
    inputLogin.forEach((a) => a.querySelector('input').value = "")
    let feedback = [document.getElementById('validation-senha-inp-feedback'), document.getElementById('usuario-inp-feedback'), document.getElementById('senha-inp-feedback')]
    let inpClass = [document.getElementById('validation-senha-inp'), document.getElementById('usuario-inp'), document.getElementById('senha-inp')]
    feedback.forEach(a => {
      a.className = ''
      a.innerHTML = ''
    })
    inpClass.forEach(a => {
      a.className = 'form-control'
    })
    this.mode !== "login" ? down() : null
}

//Ativa o dropDown, coloca o modo em login e limpa os inputs do dropDown
function down() {
  this.mode = 'login'
  drop.style.display = 'none'
  reset()
}

//Transforma o historico salvo no localStorage em this.userHistorico
function getUserHistorico() {
  this.userHistorico = JSON.parse(localStorage.getItem('userHistorico'))
}

//Transforma o historico salvo no localStorage em this.user, carrega os botões ao entrar e caso encontre um usuario arruma os botões para os de logado
function getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
    loadBtns(this.user)
    if(this.user) {
      this.user = JSON.parse(localStorage.getItem('user'))
  this.autoLoginNome = this.user.nome
  this.autoLoginSenha = this.user.senha
  signin()
      this.user.urlImg ? document.querySelector('.usuario').style.backgroundImage = 'url(this.user.urlImg)' : document.querySelector('.usuario').style.backgroundImage = "url('https://www.pngfind.com/pngs/m/176-1760995_png-file-svg-user-icon-free-copyright-transparent.png')"
}
}

//Carrega o histórico na div .historic
function carregaHistorico() {
    if(this.userHistorico) {
        let historico = document.querySelector('.historic')
        let historicoTexto = `
        <div class="esconde">
            <div class="historic-grab"><i class="fa fa-angle-double-right fa-rotate-180"></i></div>
          </div>`
        this.userHistorico.forEach((a, i) => {
          historicoTexto += `
          <div class="historic1">
              <div class="historic1-header">
                <div class="historic1-header-date">
                ${new Date(a.data_hora).toISOString().substring(0, 10)}
                </div>
                <div class="historic-header-btn">
                  <i class="fa fa-copy" onclick="copiar('${a.conteudo_selecionado}', 'conteudoSelecionado')"></i>
                  <i class="fa fa-trash" onclick="deletar('${a.id}')"></i>  
                </div>
              </div>
              <div class="historic1-body">
              <div class="historic1-body-header">
                <div class="historic1-body-header-entry">${a.id_linguagem_selecionada !== 1 ? 'Morse' : 'Alfanumérico'}</div> 
                <i class="fa fa-angle-double-right"></i> 
                <div class="historic1-body-header-output">${a.id_linguagem_traduzida !== 1 ? 'Morse' : 'Alfanumérico'}</div>
              </div>
                <div class="historic1-body-texto" onclick="morse('${a.conteudo_selecionado}')">
                ${a.conteudo_selecionado}
                </div>
            </div>
            </div>
          `
        })
        historico.innerHTML = historicoTexto
        document.querySelector('.historic .esconde').style.height = '100%'
      }
}

//Desfaz o login, limpa os dados e altera os botões para os de não logado
function signOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('userHistorico')
    this.user = null
    this.autoLoginNome = null
    this.autoLoginSenha = null
    document.querySelector('.historic').innerHTML = `
    <div class="esconde">
            <div class="historic-grab"><i class="fa fa-angle-double-right fa-rotate-180"></i></div>
          </div>
          <div class="block">
            <div class="block-body">
              <div class="block-body-header">
                Crie uma conta para ter acesso ao histórico
              </div>
              <div class="block-body-btn">
            <button class="entrar" onclick="cadOrLogin('login')">Log in</button>
            <button class="criar" onclick="cadOrLogin('cad')">Sign up</button>
            </div>
            </div>
          </div>
            <div class="historic1">
              <div class="historic1-header">
                <div class="historic1-header-date">
                  xxxx-xx-xx
                </div>
                <div class="historic-header-btn">
                  <i class="fa fa-copy" onclick=""></i>
                  <i class="fa fa-trash" onclick=""></i>  
                </div>
              </div>
              <div class="historic1-body">
              <div class="historic1-body-header">
                <div class="historic1-body-header-entry">Alfanumérico</div> 
                <i class="fa fa-angle-double-right"></i> 
                <div class="historic1-body-header-output">Morse</div>
              </div>
                <div class="historic1-body-texto">
                  O melhor do morse em um só site
                </div>
            </div>
            </div>
            <div class="historic1">
              <div class="historic1-header">
                <div class="historic1-header-date">
                  xxxx-xx-xx
                </div>
                <div class="historic-header-btn">
                  <i class="fa fa-copy" onclick=""></i>
                  <i class="fa fa-trash" onclick=""></i>  
                </div>
              </div>
              <div class="historic1-body">
              <div class="historic1-body-header">
                <div class="historic1-body-header-entry">Alfanumérico</div> 
                <i class="fa fa-angle-double-right"></i> 
                <div class="historic1-body-header-output">Morse</div>
              </div>
                <div class="historic1-body-texto">
                  O melhor do morse em um só site
                </div>
            </div>
            </div>
            <div class="historic1">
              <div class="historic1-header">
                <div class="historic1-header-date">
                  xxxx-xx-xx
                </div>
                <div class="historic-header-btn">
                  <i class="fa fa-copy" onclick=""></i>
                  <i class="fa fa-trash" onclick=""></i>  
                </div>
              </div>
              <div class="historic1-body">
              <div class="historic1-body-header">
                <div class="historic1-body-header-entry">Alfanumérico</div> 
                <i class="fa fa-angle-double-right"></i> 
                <div class="historic1-body-header-output">Morse</div>
              </div>
                <div class="historic1-body-texto">
                  O melhor do morse em um só site
                </div>
            </div>
            </div>`
            document.querySelector('.historic .esconde').style.height = '100%'
    loadBtns(this.user)
}

//Faz botão entrar ou sair aparecer 
function loadBtns(logUser) {
    if(!logUser) {
      document.querySelector('.criar').style.display = 'inline-block'
      document.querySelector('.entrar').style.display = 'inline-block'
      document.querySelector('.usuario').style.display = 'none'
      document.querySelector('.sair').style.display = 'none'
    } else {
        document.querySelector('.criar').style.display = 'none'
      document.querySelector('.entrar').style.display = 'none'
      document.querySelector('.usuario').style.display = 'inline-block'
      document.querySelector('.sair').style.display = 'inline-block'
    }
}

//FUnção para melhor responsividade, seleciona o input ou textarea alvo e move a tela
function scrollTexto(y, alvo) {
  window.scroll(0, Number(y))
  !alvo ? null : document.querySelector(alvo).focus({preventScroll:false});
}

//Procura pelo usuário e ajusta o site ao resultado
getUser()
