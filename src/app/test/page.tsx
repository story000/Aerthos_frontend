"use client"
import Footer from "../../components/Footer/foot"
import NavBar from "../../components/Navbar/navBar"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const wordPairs = [
  { clue: "__gger", word: "bugger" },
  { clue: "___ger", word: "banger" },
  { clue: "_i__er", word: "bitter" },
  { clue: "____er", word: "buffer" },
  { clue: "_i____", word: "bikers" },
  { clue: "__gg__", word: "boggle" },
  { clue: "__gge_", word: "bugged" },
  { clue: "_i_ger", word: "binger" },
  { clue: "____er", word: "banner" },
  { clue: "___ger", word: "danger" },
  { clue: "_i_ger", word: "singer" },
  { clue: "_igger", word: "digger" },
  { clue: "_i__er", word: "ticker" },
  { clue: "____er", word: "braver" },
  { clue: "____er", word: "buzzer" },
  { clue: "____er", word: "bunker" },
]

export default function ResearchPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const introAudioRef = useRef(null)
  const wordAudioRef = useRef(null)

  useEffect(() => {
    if (!audioEnabled) return

    const cycle = () => {
      // 播放引导音频
      if (introAudioRef.current) {
        introAudioRef.current.currentTime = 0
        introAudioRef.current.play()
      }

      // 显示拼写提示，隐藏答案
      setShowAnswer(false)

      // 切换图片索引
      setCurrentIndex((prev) => (prev + 1) % wordPairs.length)

      // 2 秒后显示完整答案并播放发音
      setTimeout(() => {
        setShowAnswer(true)
        if (wordAudioRef.current) {
          wordAudioRef.current.currentTime = 0
          wordAudioRef.current.play()
        }
      }, 5000)
    }

    cycle() // 初始立即执行一次
    const interval = setInterval(cycle, 7000)

    return () => clearInterval(interval)
  }, [audioEnabled])

  const currentWord = wordPairs[currentIndex].word

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">What is this?</h1>

        {!audioEnabled && (
          <div className="text-center mb-6">
            <button
              onClick={() => setAudioEnabled(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              点击启用声音
            </button>
          </div>
        )}

        <div className="flex justify-center mb-4">
          <Image
            src={`/images/${currentWord}.png`}
            alt="rotating example"
            width={350}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center text-xl font-semibold mt-4">
          {showAnswer ? currentWord : wordPairs[currentIndex].clue.split('').join(' ')}
        </div>

        <audio ref={introAudioRef} src="/sound/output_audio.mp3" preload="auto" />
        <audio ref={wordAudioRef} src={`/sound/${currentWord}.mp3`} preload="auto" />
      </main>
      <Footer />
    </div>
  )
} 
