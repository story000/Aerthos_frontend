 // Start of Selection
import ChartComponent from '../components/tv';
import Footer from "../components/Footer/foot"
import NavBar from "../components/Navbar/navBar"
import Hero from "../components/Landing/hero"
export const dynamic = "force-dynamic"


export default function Home() {
  return (
    <div className="lg:py-0 hero min-h-full bg-inherit">
    <NavBar />
    <Hero />
    <Footer />
    </div>  
  );
  

}
