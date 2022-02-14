
module.exports = validate => {
    function characterCheck(value, msg) {
        if (/(?:\r\n|\r|\n)/.test(value) || /\s\s+/.test(value) || /^\s+|\s+$/g.test(value) || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(value)) throw msg
    }
    function lengthMin(value, msg, length) {
      if (value.length < length) throw msg
    }
      //existe gera um erro
    function existsOrError(value, msg) {
        if (!value) throw msg//se não existir
        if (Array.isArray(value) && value.length === 0) throw msg//Se retornar um array vasio
        if (typeof value === 'string' && !value.trim()) throw msg//se a string for vasia
    }

    //se não existir está ok caso exista gera um erro 
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    //se for igual não dar erro
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }
    /*
  function validation(inputName, a, b) {
    console.log(inputName, a, b)
  if(inputName === 'usuario') {
    let usuarioInp = a
    if(usuarioInp.length < 1) {
      throw [inputName, 'Campo obrigatório.']
    }
    if(/(?:\r\n|\r|\n)/.test(usuarioInp) || /\s\s+/.test(usuarioInp) || /^\s+|\s+$/g.test(usuarioInp) || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(usuarioInp)) {
      throw [inputName, 'Por favor, apenas letras, números e espaços.']
    } 
  }
  if(inputName === 'senha') {
    let senhaInp = a
    if(senhaInp.length < 1) {
      throw [inputName, 'Campo obrigatório.']
    }
    if(/(?:\r\n|\r|\n)/.test(senhaInp) || /\s\s+/.test(senhaInp) || /^\s+|\s+$/g.test(senhaInp) || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-)(*&%$#@!_+=>< ]+$/.test(senhaInp)) {
      throw [inputName, 'Por favor, apenas letras, números, espaços e -)(*&%$#@!_+=><.']
    }
    if(senhaInp.length < 8 || !/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-)(*&%$#@!_+=>< ]+$/.test(senhaInp)){
        throw [inputName, 'Mínimo de 8 caracteres.']
      }
    validation('validation-senha', a)

    let validationSenhaInp = b
      if(validationSenhaInp.length < 1) {
      throw [inputName, 'Campo obrigatório.', 'validationSenhaInp']
    }
    if(senhaInp != validationSenhaInp) {
      throw [inputName, 'As senhas precisam ser iguais.', 'validationSenhaInp']
    }
  }
  }*/
return { existsOrError, notExistsOrError, equalsOrError, characterCheck, lengthMin }
}