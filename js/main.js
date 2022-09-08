const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens") ) || []

itens.forEach(elemento => {
    criaElemento(elemento)
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value)

    if (existe){
        itemAtual.id = existe.id
        atualizarElemento(itemAtual)
        itens[itens.findIdex(elemento => elemento.id === existe.id)] = itemAtual

    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1].id + 1 ) : 0
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }


 

    localStorage.setItem("itens",JSON.stringify(itens))


    nome.value = ""
    quantidade.value = ""

    



})

function criaElemento(itemAtual){


    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = itemAtual.quantidade
    numeroItem.dataset.id = itemAtual.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += itemAtual.nome
    novoItem.appendChild(botaoDeleta(itemAtual.id))

    lista.appendChild(novoItem)

}

function atualizarElemento (itemAtual){
    document.querySelector("[data-id = '"+itemAtual.id+"']").innerHTML = itemAtual.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })
    return  elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1 )

    localStorage.setItem("itens",JSON.stringify(itens))
}
