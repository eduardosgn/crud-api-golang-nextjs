import type { NextApiRequest, NextApiResponse } from "next";

type Writer = {
  Firstname: string;
  Lastname: string;
};

type Book = {
  ID: number;
  Title: string;
  Writer: Writer;
};

type Data = {
  books: Book[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await fetch("http://localhost:8080/books");
  const books: Book[] = await response.json();
  res.status(200).json({ books });
}
