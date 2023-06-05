import { Header } from '../components/Header';
import { MainContent } from '../components/MainContent';

export default function Home() {
  return (
    <main className="w-screen h-screen grid-rows-[2fr_9fr] sm:grid sm:grid-rows-[1fr_10fr] sm:grid-cols-[1fr_5fr_1fr]">
      <Header />
      <MainContent />
    </main>
  )
}
