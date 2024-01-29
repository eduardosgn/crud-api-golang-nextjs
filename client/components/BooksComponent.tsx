"use client";
import { useEffect, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Writer = {
  firstname: string;
  lastname: string;
};

type Book = {
  id: number;
  title: string;
  writer: Writer;
};

export default function BooksComponent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:8080/books");
      try {
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const book = {
      title,
      writer: {
        firstname,
        lastname,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const data: Book = await response.json();

      console.log(data);

      setBooks((prevBooks) => [...prevBooks, data]);
      setTitle("");
      setFirstname("");
      setLastname("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-indigo-900 font-bold text-2xl">
          GoBooks - CRUD API in Golang + Next.js
        </h2>

        <div className="flex items-center gap-2">
          <img src="golang.svg" alt="Golang" className="w-[35px]" />
          <span>+</span>
          <img src="next-js.svg" alt="Golang" className="w-[35px]" />
        </div>
      </div>

      <div className="flex justify-items-start gap-4 flex-wrap my-5">
        {books.map((book, index) => (
          <div
            key={index}
            className="text-center bg-indigo-600 text-white flex-1 p-3 rounded-md flex items-center flex-col justify-center"
          >
            <span className="font-bold ">{book.title}</span> <span className="text-xs">por</span>
            <span className="text-sm">
              {book.writer?.firstname} {book.writer?.lastname}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full justify-start gap-4 flex-wrap">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do livro"
          className="border-[1px] border-slate-200 p-2 rounded-md px-3 flex-1"
          required
        />
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Nome do autor"
          className="border-[1px] border-slate-200 p-2 rounded-md px-3 flex-1"
          required
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Sobrenome do autor"
          className="border-[1px] border-slate-200 p-2 rounded-md px-3 flex-1"
          required
        />
        <Button type="submit">Adicionar livro</Button>
      </form>
    </div>
  );
}
