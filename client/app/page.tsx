import BooksComponent from "../components/BooksComponent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="container mx-auto mt-6">
        <div>
          <BooksComponent />
        </div>
      </main>

      <Footer />
    </>
  );
}
