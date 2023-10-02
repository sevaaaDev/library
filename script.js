const Library = () => {
  let bookshelf = [];

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    changeStatus() {
      if (this.read === "Read") {
        this.read = "Not read";
      } else {
        this.read = "Read";
      }
    }
  }

  function getShelf() {
    return bookshelf;
  }

  function removeBook(index) {
    bookshelf.splice(index, 1);
  }

  function changeStatus(index) {
    bookshelf[index].changeStatus();
  }

  function addBookToTheList(title, author, pages, read) {
    bookshelf.push(new Book(title, author, pages, read));
  }

  return { addBookToTheList, removeBook, getShelf, changeStatus };
};

const displayController = () => {
  const table = document.getElementById("table");
  const dialog = document.querySelector("dialog");
  const btnShowDialog = document.getElementById("show-dialog");
  const btnCloseDialog = document.getElementById("close-dialog");
  const btnDelete = document.querySelectorAll("[data-index]");
  const form = document.querySelector("form");
  const input = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages"),
    read: document.getElementById("finished"),
  };

  function resetDisplay() {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  function displayBook(shelf) {
    resetDisplay();
    for (let i = 0; i < shelf.length; i++) {
      const tr = document.createElement("tr");
      table.append(tr);
      const key = Object.keys(shelf[i]);
      key.forEach((key) => {
        const td = document.createElement("td");
        td.innerText = shelf[i][key];
        tr.append(td);
      });
      const td = document.createElement("td");
      const td2 = document.createElement("td");
      const btnRead = document.createElement("button");
      btnRead.innerText = "Change Status";
      btnRead.setAttribute("data-index", i);
      td.append(btnRead);
      const btnDelete = document.createElement("button");
      btnDelete.setAttribute("data-index", i);
      btnDelete.innerText = "Delete";
      td2.append(btnDelete);
      tr.append(td);
      tr.append(td2);
    }
  }

  return {
    table,
    dialog,
    btnShowDialog,
    btnCloseDialog,
    btnDelete,
    input,
    displayBook,
    form,
  };
};

const inputController = (() => {
  const library = Library();
  const display = displayController();

  display.btnShowDialog.addEventListener("click", () => {
    display.dialog.showModal();
  });

  display.btnCloseDialog.addEventListener("click", () => {
    if (display.form.checkValidity()) {
      library.addBookToTheList(
        display.input.title.value,
        display.input.author.value,
        display.input.pages.value,
        display.input.read.value,
      );
      display.displayBook(library.getShelf());
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target.dataset.index === undefined) {
      return;
    }
    if (e.target.innerText === "Change Status") {
      library.changeStatus(e.target.dataset.index);
      display.displayBook(library.getShelf());
      return;
    }
    library.removeBook(e.target.dataset.index);
    display.displayBook(library.getShelf());
    console.log(e.target.dataset.index);
  });
})();
