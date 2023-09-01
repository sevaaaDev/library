const table = document.getElementById('table')

let library = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToTheList(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  library.push(book)
}

addBookToTheList('Sapiens', 'Yuval Noah Harari', 500, 'Read') 

function resetDisplay() {
  while (table.firstChild) {
    table.removeChild(table.firstChild)
  }
}

function displayBook() {
  resetDisplay()
  for (let i = 0; i < library.length; i++) {
    const tr = document.createElement('tr')
    table.append(tr)
    for (let prop in library[i]) {
      const td = document.createElement('td')
      td.innerText = library[i][prop]
      tr.append(td)
    }
    const td = document.createElement('td')
    const btnDelete = document.createElement('button')
    btnDelete.setAttribute('data-index', i)
    btnDelete.innerText = 'Delete'
    td.append(btnDelete)
    tr.append(td)
  }
}

displayBook()

const dialog = document.querySelector('dialog')
const btnShowDialog = document.getElementById('show-dialog')
const btnCloseDialog = document.getElementById('close-dialog')
const btnDelete = document.querySelectorAll('[data-index]')
const input = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  pages: document.getElementById('pages'),
  read: document.getElementById('finished')
}


btnShowDialog.addEventListener('click', () => {
  dialog.showModal()
})

btnCloseDialog.addEventListener('click', () => {
  if (input.read.checked) {
    addBookToTheList(input.title.value, input.author.value, input.pages.value, 'Read')
    displayBook()
  } else {
    addBookToTheList(input.title.value, input.author.value, input.pages.value, 'Not read')
    displayBook()
  }
})

window.addEventListener('click', (e) => {
  if (e.target.dataset.index === undefined) {
    return
  }
  removeBook(e.target.dataset.index)
  console.log(e.target.dataset.index)
})

function removeBook(index) {
  library.splice(index, 1)
  displayBook()
}