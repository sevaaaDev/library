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

function displayBook() {
  for (let i = 0; i < library.length; i++) {
    const tr = document.createElement('tr')
    table.append(tr)
    for (let prop in library[i]) {
      const td = document.createElement('td')
      td.innerText =library[i][prop]
      tr.append(td)
    }
  }
}

displayBook()