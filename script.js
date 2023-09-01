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

addBookToTheList('Sapiens', 'Yuval Noah Harari', 500, false) 
