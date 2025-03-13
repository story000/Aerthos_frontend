import Footer from "../../components/Footer/foot"
import NavBar from "../../components/Navbar/navBar"

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Research</h1>
        <p>Here is the research content...</p>
      </main>
      <Footer />
    </div>
  )
} 