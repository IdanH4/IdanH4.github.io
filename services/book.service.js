import { loadFromStorage, makeId, saveToStorage } from "./util.service.js"
import { storageService } from "./async-storage.service.js"

const BOOK_KEY = "bookDB"
_createBooks()

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	getDefaultFilter,
}

function query(filterBy = {}) {
	return storageService.query(BOOK_KEY).then((books) => {
		if (filterBy.txt) {
			const regExp = new RegExp(filterBy.txt, "i")
			books = books.filter((car) => regExp.test(car.vendor))
		}
		if (filterBy.minSpeed) {
			books = books.filter((car) => car.speed >= filterBy.minSpeed)
		}
		return books
	})
}

function get(bookId) {
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevCarId)
}

function remove(carId) {
	// return Promise.reject('Oh No!')
	return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
	if (car.id) {
		return storageService.put(BOOK_KEY, car)
	} else {
		return storageService.post(BOOK_KEY, car)
	}
}

function getEmptyBook(vendor = "", speed = "") {
	return { vendor, speed }
}

function getDefaultFilter() {
	return { txt: "", minSpeed: "" }
}

function _setNextPrevCarId(car) {
	return query().then((cars) => {
		const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
		const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
		const prevCar = cars[carIdx - 1]
			? cars[carIdx - 1]
			: cars[cars.length - 1]
		car.nextCarId = nextCar.id
		car.prevCarId = prevCar.id
		return car
	})
}

function _createBooks() {
	let books = loadFromStorage(BOOK_KEY)
	if (!books || !books.length) {
		books = [
			_createBook("Harry Potter"),
			_createBook("Green Street Holigans"),
			_createBook("Shrek", "Shrek and Fiona!"),
		]
		saveToStorage(BOOK_KEY, books)
	}
}

function _createBook(name, description = "Test is some description") {
	const book = getEmptyBook(name, description)
	// book.id = makeId()
	book.id = makeId()
	return book
}
