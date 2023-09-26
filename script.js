
//ADD book to the table
function addBookToTable(id, title, author, price) {
    var table = document.getElementById("bookTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var textNode1 = document.createTextNode(id);
    cell1.appendChild(textNode1);

    var cell2 = newRow.insertCell(1);
    var textNode2 = document.createTextNode(title);
    cell2.appendChild(textNode2);

    var cell3 = newRow.insertCell(2);
    var textNode3 = document.createTextNode(author);
    cell3.appendChild(textNode3);

    var cell4 = newRow.insertCell(3);
    var textNode4 = document.createTextNode(price);
    cell4.appendChild(textNode4);

    var cell5 = newRow.insertCell(4);
    var editButton = document.createElement('button');
    editButton.className = "btn btn-info";
    editButton.textContent = "Edit";
    cell5.appendChild(editButton);

    var cell6 = newRow.insertCell(5);
    var deleteButton = document.createElement('button');
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    cell6.appendChild(deleteButton);
}

//ADD book to local Storage
function addBookToStorage(id, title, author, price) {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ id: id, title: title, author: author, price: price });
    localStorage.setItem('books', JSON.stringify(books));
}


function fillEditForm(id, title, author, price) {
    document.getElementById("editID").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editPrice").value = price;
}

//Load all the books from the storage
function loadBooksFromStorage() {
    var books = JSON.parse(localStorage.getItem('books')) || [];

    for (var i = 0; i < books.length; i++) {
        var book = books[i];
        addBookToTable(book.id, book.title, book.author, book.price);
    }

//delete book
    var deleteButtons = document.querySelectorAll('.btn-danger');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            var confirmation = confirm("Are you sure you want to delete this book?");
            if (confirmation) {
                var row = this.parentElement.parentElement;
                var id = row.cells[0].textContent;
                var table = document.getElementById("bookTable");
                var rowIndex = row.rowIndex;

                table.deleteRow(rowIndex);

                var books = JSON.parse(localStorage.getItem('books')) || [];
                books = books.filter(function (book) {
                    return book.id !== id;
                });
                localStorage.setItem('books', JSON.stringify(books));
            }
        });
    }

//Edit Book
    var editButtons = document.querySelectorAll('.btn-info');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function () {
            var editForm = document.getElementById("editForm");
            editForm.style.display = "block";

            var row = this.parentElement.parentElement;
            var id = row.cells[0].textContent;
            var title = row.cells[1].textContent;
            var author = row.cells[2].textContent;
            var price = row.cells[3].textContent;

            fillEditForm(id, title, author, price);
        });
    }
}

//Event after clicking on edit
document.getElementById("editForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var id = document.getElementById("editID").value;
    var title = document.getElementById("editTitle").value;
    var author = document.getElementById("editAuthor").value;
    var price = document.getElementById("editPrice").value;

    var books = JSON.parse(localStorage.getItem('books')) || [];
    for (var i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i] = { id: id, title: title, author: author, price: price };
            break;
        }
    }
    localStorage.setItem('books', JSON.stringify(books));


    var table = document.getElementById("bookTable");
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].textContent === id) {
            rows[i].cells[1].textContent = title;
            rows[i].cells[2].textContent = author;
            rows[i].cells[3].textContent = price;
            break;
        }
    }


    document.querySelector("#editForm form").reset();
    document.getElementById("editForm").style.display = "none";
});

//event after  clicking on submit
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    var id = document.getElementById("BookID").value;
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var price = document.getElementById("price").value;

    addBookToTable(id, title, author, price);
    addBookToStorage(id, title, author, price);

    document.querySelector("form").reset();
});
//hide and display form 
document.getElementById("addBook").addEventListener("click", function () {
    var bookForm = document.getElementById("bookForm");
    if (bookForm.style.display === "none" || bookForm.style.display === "") {
        bookForm.style.display = "block";
    } else {
        bookForm.style.display = "none";
    }
});

window.addEventListener("load", loadBooksFromStorage);