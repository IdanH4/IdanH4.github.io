const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { HomePage } from "./cmps/HomePage.jsx"
import { AboutUs } from "./cmps/AboutUs.jsx"
import { BookIndex } from "./cmps/BookIndex.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"

export function RootCmp() {
	return (
		<Router basename="/">
			<section className="main">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/book" element={<BookIndex />} />
					<Route path="/book/:bookId" element={<BookDetails />} />
					<Route path="/book/edit" element={<BookEdit />} />
				</Routes>
			</section>
		</Router>
	)
}
