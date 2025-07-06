const bookGrid = document.querySelector('.book-grid');
const exitFormBtn = document.querySelector('.exit-form');
const modal = document.querySelector('.modal');
const addBookBtn = document.querySelector('.add-book-button');
const submitFormBtn = document.querySelector('.submit-form');

// MODAL COMPONENTS
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numberOfPages = document.querySelector('#numberOfPages');
const readingStatus = document.querySelector('#status');

class Book {
  constructor(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
  } 
}

const myLibrary = [
    new Book(
        "Blue Box",
        "Kouji Miura",
        "198",
        "Reading"
    ),
    new Book(
        "Orb: On the Movements of the Earth",
        "Uoto",
        "62",
        "Completed"
    ),
    new Book(
        "Chainsaw Man",
        "Tatsuki Fujimoto",
        "207",
        "Reading"
    )
];

exitFormBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

addBookBtn.addEventListener('click', () => {
    modal.style.display = 'block';
})

submitFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newBook = new Book(
        title.value.trim(),
        author.value.trim(),
        numberOfPages.value.trim(),
        readingStatus.value
    )
    addBookToLibrary(newBook);
    loadLibraryIntoView();
    resizeBookTitles();
    modal.style.display = 'none';
})


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function loadLibraryIntoView() {
    bookGrid.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        console.log("loading library...");
        const tile = document.createElement('div');
        tile.classList.add('bookTile');

        tile.innerHTML = `
            <div class="bookTitleRow">
                <p class="bookTitle">${book.title}</p>
                <button class="removeBtn">×</button>
            </div>
            <div class="bookInfo">
                <div class="bookInfoHeader">
                    <p>Author:</p>
                    <p>Pages:</p>
                    <p>Status:</p>
                </div>
                <div class="bookInfoContent">
                    <p>${book.author}</p>
                    <p>${book.numberOfPages}</p>
                    <p>${book.status}</p>
                </div>
            </div>
        `;

        tile.querySelector('.removeBtn').addEventListener('click', () => {
            myLibrary.splice(i, 1);
            loadLibraryIntoView();
            resizeBookTitles();
        });

        bookGrid.appendChild(tile);
    }
}

const resizeBookTitles = () => {
  const titles = document.querySelectorAll('.bookTitle');
  titles.forEach(title => {
    title.style.fontSize = '3rem'; // reset first
    if (title.scrollHeight > parseFloat(getComputedStyle(title).lineHeight) * 1.5) {
      title.style.fontSize = '2rem';
    }
  });
};

window.addEventListener('load', resizeBookTitles);
window.addEventListener('resize', resizeBookTitles);

loadLibraryIntoView(myLibrary);