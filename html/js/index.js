const input = document.querySelector('input')
const button = document.querySelector('button')
const menu = document.querySelector('.menu')
const menuOffice = document.querySelector('.menu-office')
const containerTotalVotes = document.querySelector('.total-votes')
const radios = document.querySelector('.radio')
let optionMenu = ''
let dataGlobal = ''

const handleMenuOptions = {
  togleHidden(action) {
    const array = [input, button]
    const toggle = action === 1 ? 'add' : 'remove'
    array.forEach(item => item.classList[toggle]('hidden'))
  },
  candidate() {
    input.value = ''
    menuOffice.classList.add('hidden')
    containerTotalVotes.classList.add('hidden')
    this.togleHidden(0)
    radios.classList.add('hidden')

    optionMenu = 'candidates'
  },
  office() {
    this.togleHidden(1)
    menuOffice.classList.remove('hidden')
    containerTotalVotes.classList.add('hidden')
    radios.classList.add('hidden')
    
    optionMenu = 'offices'
  },
  cities() {
    input.value = ''
    menuOffice.classList.add('hidden')
    radios.classList.add('hidden')
    this.togleHidden(0)
    
    optionMenu = 'cities'
  },
  overallResult() {
    menuOffice.classList.add('hidden')
    this.togleHidden(1)
    radios.classList.remove('hidden')
    containerTotalVotes.classList.add('hidden')
    optionMenu = '/overalResult'
    
    requestData(optionMenu, '*')
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
    <span>${votes.toLocaleString('pt-BR')}</span>
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

const showDataOnScreen = ({ data }, showTotal) => {
  const containerResult = document.querySelector('.result')
  let countVotes = 0
  
  containerResult.innerHTML = ''
  containerResult.innerHTML = titleResult
  containerTotalVotes.innerHTML = ''
  
  data.forEach( line => {  
    const div = document.createElement('div')

    if (showTotal) {
      countVotes += line.votes
      containerTotalVotes.classList.remove('hidden')
    }
          
    div.classList.add('result-line')    
    div.innerHTML += formatLine(line)
    containerResult.appendChild(div)
  })
  
  containerTotalVotes.innerHTML = `
    <h4>Total de votos nessa cidade: 
    ${countVotes.toLocaleString('pt-BR')}<h4>`
}

async function requestData (endpoint, searchValue) {
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
  dataGlobal = data

  endpoint === '/cities' ? showDataOnScreen(data, 1) : showDataOnScreen(data, 0)
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

const showDataOnScreenOverall = ({ data }, option) => {
  const containerResult = document.querySelector('.result')
  
  containerResult.innerHTML = ''
  containerResult.innerHTML = titleResult

  data.forEach( line => {  
    const div = document.createElement('div')
    const match = line.status == 'Eleito'

    if (option && !match) {
      return
    }

    if (!option && match) {
      return
    }
    
    div.classList.add('result-line')    
    div.innerHTML += formatLine(line)
    containerResult.appendChild(div)
  })
}

radios.addEventListener('change', event => {
  const elementChanged = event.target

  if (elementChanged.value === 'eleitos') {
    showDataOnScreenOverall(dataGlobal, 1)
  } else if (elementChanged.value === 'nao-eleitos') {
    showDataOnScreenOverall(dataGlobal, 0)
  } else {
    showDataOnScreen(dataGlobal)
  }
})
