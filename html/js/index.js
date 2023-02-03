const input = document.querySelector('input')

input.addEventListener('input', async () => {
  const selectValue = document.querySelector('select').value
  const searchValue = input.value
  const endpoint = `/${selectValue}`
  
  console.log(searchValue)
 
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ search: searchValue })
  })

  const data = await response.json()
  console.log(data)
  alert(data.value)
})

const menu = document.querySelector('.menu')

menu.addEventListener('click', event => {
  const itensMenu = Array.from(menu.firstElementChild.children)
  const clickedElement = event.target

  itensMenu.forEach(item => item.classList.remove('selected'))
  clickedElement.classList.add('selected')
})


