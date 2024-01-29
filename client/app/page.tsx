import BooksComponent from "./components/BooksComponent";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <main className="container mx-auto">
        <div className="pt-6">
          <BooksComponent />
        </div>
      </main>

      <Footer />
    </>
  );
}
