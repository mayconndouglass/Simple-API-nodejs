const input = document.querySelector('input')
const button = document.querySelector('button')
const menu = document.querySelector('.menu')
const menuOffice = document.querySelector('.menu-office')
let optionMenu = ''

const handleMenuOptions = {
  togleHidden(action) {
    const array = [input, button]
    const toggle = action === 1 ? 'add' : 'remove'
    array.forEach(item => item.classList[toggle]('hidden'))
  },
  candidate() {
    input.value = ''
    menuOffice.classList.add('hidden')
    this.togleHidden(0)

    optionMenu = 'candidates'
  },
  office() {
    this.togleHidden(1)
    menuOffice.classList.remove('hidden')
    optionMenu = 'offices'
  },
  city() {
    menuOffice.classList.add('hidden')
    this.togleHidden(1)
  },
  overallResult() {
    menuOffice.classList.add('hidden')
    this.togleHidden(1)
  }  
}

menu.addEventListener('click', event => {
  const optionsMenu = Array.from(menu.firstElementChild.children)
  const clickedElement = event.target
  const option = clickedElement.dataset.option

  optionsMenu.forEach(item => item.classList.remove('selected'))
  clickedElement.classList.add('selected')

  handleMenuOptions[option]()
})

const formatLine = ({ name, office, votes, status }) => {
  const formattedLine = `
    <span class="candName">${name}</span>
    <span>${office}</span>
    <span>${votes}</span>
    <span>${status}</span>
  `

  return formattedLine
}

const titleResult = `
  <div class="result-title result-line">
    <span>Nome</span>
    <span>Cargo</span>
    <span>Votos</span>
    <span>Status</span>
  </div>
`

const showDataOnScreen = ({ data }) => {
  const containerResult = document.querySelector('.result')
  containerResult.innerHTML = ''
  containerResult.innerHTML = titleResult

  console.log(data)
  data.forEach( line => {
    const div = document.createElement('div')
    div.classList.add('result-line')

    div.innerHTML += formatLine(line)
    containerResult.appendChild(div)
  })
}

const requestData = async (endpoint, searchValue) => {
  if (!searchValue) {
    return
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: searchValue })
  })

  const data = await response.json()
  console.log(data);
  showDataOnScreen(data)
}

button.addEventListener('click', async () => {
  const searchValue = input.value
  const endpoint = `/${optionMenu}`
  
  requestData(endpoint, searchValue)
  input.value = ''
})

menuOffice.addEventListener('click', async event => {
  const optionsMenu = Array.from(menuOffice.firstElementChild.children)
  const clickedElement = event.target
  const searchValue = clickedElement.dataset.office
  const endpoint = `/${optionMenu}`

  optionsMenu.forEach(item => item.classList.remove('selectedd'))
  clickedElement.classList.add('selectedd')

  requestData(endpoint, searchValue)
})

// para não esquecer o roteiro do que precisa ser feito
/*  1 - criar uma função para cada botão
    2- criar um variavel global para salvar qual botão foi clicado para passar como rota
 */
