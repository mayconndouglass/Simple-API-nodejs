const input = document.querySelector('input')
const menu = document.querySelector('.menu')
let optionMenu = ''

const handleMenuOptions = {
  candidate() {
    input.value = ''
    input.classList.remove('hidden')
    optionMenu = 'candidates'
  },
  office() {
    input.classList.add('hidden')
  },
  city() {
    input.classList.add('hidden')
  },
  overallResult() {
    input.classList.add('hidden')
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

input.addEventListener('input', async () => {
  // const selectValue = document.querySelector('select').value
  const searchValue = input.value
  const endpoint = `/${optionMenu}`
  
  console.log(searchValue)
 
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: searchValue })
  })

  const data = await response.json()
  console.log('tipo do arquivo recebido no front');
  console.log(typeof data)
  console.log(data);
})

console.log('teste')
// para não esquecer o roteiro do que precisa ser feito
/*  1 - criar uma função para cada botão
    2- criar um variavel global para salvar qual botão foi clicado para passar como rota
 */
