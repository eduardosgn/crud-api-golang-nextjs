package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Book struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Writer *Writer `json:"writer"`
}

type Writer struct {
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`
}

var books []Book

func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// pega os parametros da url
	params := mux.Vars(r)

	for _, item := range books {
		// se o item.ID for o mesmo do parametro {id} da url o livro será retornado
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

func deleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// pega os parametros da url
	params := mux.Vars(r)

	// tipo forEach no javascript
	for index, book := range books {
		// se o item.ID for o mesmo do parametro {id} da url o livro será deletado
		if book.ID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			break
		}
	}

	json.NewEncoder(w).Encode(books)
}

func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// cria um livro
	var book Book
	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = strconv.Itoa(rand.Intn(1000000))
	books = append(books, book)

	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
	// seta o header para json
	w.Header().Set("Content-Type", "application/json")

	// pega os parametros da url
	params := mux.Vars(r)

	// loop por todos os livros
	for index, item := range books {
		// se o item.ID for o mesmo do parametro {id} da url o livro será atualizado
		if item.ID == params["id"] {
			books = append(books[:index], books[index+1:]...)

			// cria um livro
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)
			book.ID = params["id"]
			books = append(books, book)

			json.NewEncoder(w).Encode(books)
			return
		}
	}

	json.NewEncoder(w).Encode(books)
}

func main() {
	r := mux.NewRouter()

	books = append(books, Book{ID: "1", Title: "O Poder do Hábito", Writer: &Writer{Firstname: "Charles", Lastname: "Duhigg"}})
	books = append(books, Book{ID: "2", Title: "A Arte da Guerra", Writer: &Writer{Firstname: "Sun", Lastname: "Tsu"}})
	books = append(books, Book{ID: "3", Title: "O Poder do Silêncio", Writer: &Writer{Firstname: "Eckhart", Lastname: "Trolle"}})

	r.HandleFunc("/books", getBooks).Methods("GET")
	r.HandleFunc("/books/{id}", getBook).Methods("GET")
	r.HandleFunc("/books", createBook).Methods("POST")
	r.HandleFunc("/books", updateBook).Methods("PUT")
	r.HandleFunc("/books/{id}", deleteBook).Methods("DELETE")

	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})

	fmt.Printf("Server running on port 8080\n")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(r)))
	

	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		
	// 	w.Header().Set("Access-Control-Allow-Origin", "*")
	// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// 	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

	// 	fmt.Fprintf(w, "Hello server! r.URL.Path => %s\n", r.URL.Path)

	// })

	// http.ListenAndServe(":8080", nil)
}