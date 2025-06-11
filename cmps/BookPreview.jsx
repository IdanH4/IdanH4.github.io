export function BookPreview({ book }) {
	return (
		<article className="book-preview">
			<h2>name: {book.name}</h2>
			<h4>Book description: {book.description}</h4>
			<img src={`../assets/img/${book.name}.jpg`} alt="book-image" />
		</article>
	)
}
