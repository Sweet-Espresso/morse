const entry = document.querySelector('#textarea-code-entry')
const out = document.querySelector('#textarea-code-output')
const entryLanguage = document.querySelector('#code-entry-language-btn')
const outLanguage = document.querySelector('#code-output-language-btn')
entry.value = ""
out.value = ""
function clean() {
    entry.value = ''
    out.value = ''
    entry.style.height = '190px'
    out.style.height = '190px'
    entryLanguage.style.color = '#646464'
    outLanguage.style.color = '#646464'
    this.entryLanguage = null
    this.outLanguage = null
    entryLanguage.innerHTML = "Automático"
    outLanguage.innerHTML = "Morse"
}

function scrollTexto(y) {

  window.scroll(0, Number(y))
}

function getFocus(alvo) {
  document.querySelector(alvo).focus({preventScroll:false});
  window.scroll(0, 600)
}

function copiar(a, b) {
  if(b) {
    morse(a)
    copiar('entry')
  }
  if(a === 'output') {
    out.select()
    document.execCommand('copy')
    msg()
  } else {
    entry.select()
    document.execCommand('copy')
    msg()
  }
}

function save(a) {
  checkOut()
  if(this.typeCheck) {
    if(!this.entryLanguage || !this.outLanguage) return msg('Nenhum texto foi encontrado')
    historico = {
        linguagemSelecionada: this.entryLanguage !== "alfanumerico" ? 2 : 1,
        linguagemTraduzida: this.outLanguage !== "alfanumerico" ? 2 : 1,
        usuarioId: this.user.id,
        conteudoSelecionado: a !== 'output' ? entry.value : out.value,
    }
    const body = JSON.stringify(historico)
    fetch('/save', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((textContent) => {
            if (textContent) throw textContent
            msg()
            getUser()
        })
        .catch(err => msg(err))
  }
}
//.reduce((list, sub) => list.concat(sub), [])

function deletar(idHistorico) {
  historico = {
        idHistorico: idHistorico
    }
    const body = JSON.stringify(historico)
    fetch('/save', {
        method: "DELETE",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((textContent) => {
            if (textContent) throw textContent
            msg()
            getUser()
        })
        .catch(err => msg(err))
}

function checkOut() {
  try {
    //Caso não haja usuário logado abrirá o formulário de login ou cadastro
    if (!this.user) return cadOrLogin('login')

    this.typeCheck = "check"
  } catch (error) {
    msg(error)
  }
}

function morse(conteudoSelecionado) {
  let i = 0;
    let alpha = " abcdefghijklmnopqrstuvwxyz1234567890".split(""),
				morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",")
        let text = '';
				!conteudoSelecionado ? text = entry.value.toLowerCase().trim().replace(/(?:\r\n|\r|\n)/g, ' ').replace(/\s\s+/g, ' ') : text = conteudoSelecionado.toLowerCase().trim().replace(/(?:\r\n|\r|\n)/g, ' ').replace(/\s\s+/g, ' ')
        if((text.includes("ä") || text.includes("ö") || text.includes("ü") || text.includes("ã") || text.includes("â") || text.includes("á") || text.includes("à") || text.includes("è") || text.includes("é") || text.includes("ê") || text.includes("ó") || text.includes("ò") || text.includes("õ") || text.includes("ô") || text.includes("ì") || text.includes("í") || text.includes("î") || text.includes("û") || text.includes("ú") || text.includes("ù") || text.includes("ü"))){
        text = text.replace(/[ä,ã,â,á,à]/gi, "a").replace(/[è,é,ê]/gi, "e").replace(/[ö,ó,ò,õ,ô]/gi, "o").replace(/[ì,í,î]/gi, "i").replace(/[ú,ù,ü]/gi, "u") 
        }
        if(text.includes("·") || text.includes("–")){
          text = text.replace(/·/gi, ".").replace(/–/gi, "-")
        }
          if(text.length < 1) {
            clean()
            return
          }
          entryLanguage.style.color = '#000'
          outLanguage.style.color = '#000'
		  	if (text.startsWith(".") || text.startsWith("-")) {
          this.entryLanguage = "morse"
          this.outLanguage = "alfanumerico"
          entryLanguage.innerHTML = "Morse"
          outLanguage.innerHTML = "Alfanumérico"
			   	text = text.split(" ");
		   		let length = text.length;
		   		for (i = 0; i < length; i++) {
		   			text[i] = alpha[morse.indexOf(text[i])];
				}
				text = text.join("").toUpperCase();
		  	} else {
          this.entryLanguage = "alfanumerico"
          this.outLanguage = "morse"
          entryLanguage.innerHTML = "Alfanumérico"
          outLanguage.innerHTML = "Morse"
          text = text.split("");
			  	let length = text.length;
			  	for (i = 0; i < length; i++) {
			  		text [i] = morse[alpha.indexOf(text[i])];
				  }
				 text = text.join(" ");
        }
        !conteudoSelecionado ? null : entry.value = conteudoSelecionado
  out.value = text
}

clean()