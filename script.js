const table = document.getElementById("table");
const dialog = document.querySelector("dialog");
const btnShowDialog = document.getElementById("show-dialog");
const btnCloseDialog = document.getElementById("close-dialog");
const btnDelete = document.querySelectorAll("[data-index]");
const input = {
  title: document.getElementById("title"),
  author: document.getElementById("author"),
  pages: document.getElementById("pages"),
  read: document.getElementById("finished"),
};
let library = [];

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

function addBookToTheList(title, author, pages, read) {
  library.push(new Book(title, author, pages, read));
}

function resetDisplay() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function displayBook() {
  resetDisplay();
  for (let i = 0; i < library.length; i++) {
    const tr = document.createElement("tr");
    table.append(tr);
    const key = Object.keys(library[i]);
    key.forEach((key) => {
      const td = document.createElement("td");
      td.innerText = library[i][key];
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

btnShowDialog.addEventListener("click", () => {
  dialog.showModal();
});

btnCloseDialog.addEventListener("click", () => {
  if (input.read.checked) {
    addBookToTheList(
      input.title.value,
      input.author.value,
      input.pages.value,
      "Read"
    );
    displayBook();
  } else {
    addBookToTheList(
      input.title.value,
      input.author.value,
      input.pages.value,
      "Not read"
    );
    displayBook();
  }
});

window.addEventListener("click", (e) => {
  if (e.target.dataset.index === undefined) {
    return;
  }
  if (e.target.innerText === "Change Status") {
    library[e.target.dataset.index].changeStatus();
    displayBook();
    return;
  }
  removeBook(e.target.dataset.index);
  console.log(e.target.dataset.index);
});

function removeBook(index) {
  library.splice(index, 1);
  displayBook();
}

addBookToTheList("Sapiens", "Yuval Noah Harari", 500, "Read");
displayBook();
