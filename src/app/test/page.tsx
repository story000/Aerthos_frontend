import Footer from "../../components/Footer/foot"
import NavBar from "../../components/Navbar/navBar"
import Image from "next/image"
import { useState, useEffect } from "react"

const images = [
  "/images/image1.png",
]

const wordPairs = [
  { clue: "b_k_r", answer: "baker" },
]

export default function ResearchPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setShowAnswer(false)
    }, 5000)

    const answerTimeout = setInterval(() => {
      setShowAnswer(true)
    }, 5000 + 2000) // show answer 2s after image switch

    return () => {
      clearInterval(interval)
      clearInterval(answerTimeout)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">What is this?</h1>

        <div className="flex justify-center mb-4">
          <Image
            src={images[currentIndex]}
            alt="rotating example"
            width={350}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center text-xl font-semibold mt-4">
          {showAnswer ? wordPairs[currentIndex].answer : wordPairs[currentIndex].clue}
        </div>
      </main>
      <Footer />
    </div>
  )
} 
