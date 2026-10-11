import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Hours from '@/components/Hours';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-900 flex flex-col font-sans selection:bg-orange-200 selection:text-red-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Menu />
        <Hours />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
