import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
	const [book, setBook] = useState(null)
	const params = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		console.log("params.bookId", params.bookId)
		loadBook()
	}, [params.bookId])

	function loadBook() {
		bookService
			.get(params.bookId)
			.then(setBook)
			.catch((err) => {
				console.log("err:", err)
			})
	}
	function onBack() {
		navigate("/book")
	}

	if (!book) return <div>Loading...</div>
	return <section className="book-details">Book ID: {book.id}</section>
}
