const { useState, useEffect } = React
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"

export function BookIndex() {
	const [books, setBooks] = useState(null)

	useEffect(() => {
		loadBooks()
	}, [])

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(() => {
				setBooks((books) => books.filter((book) => book.id !== bookId))
			})
			.catch((err) => {
				console.log("Problems removing book:", err)
			})
	}

	function loadBooks() {
		bookService
			.query()
			.then(setBooks)
			.catch((err) => {
				console.log("Problems getting books:", err)
			})
	}

	if (!books) return <div>Loading...</div>

	return (
		<section className="book-index">
			{/* <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
			<BookList books={books} onRemoveBook={onRemoveBook} />
		</section>
	)
}
