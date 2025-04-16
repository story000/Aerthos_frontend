"use client";
import Footer from "../../components/Footer/foot";
import NavBar from "../../components/Navbar/navBar";
import PlotlySignalChart from "./PlotlySignalChart";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="lg:py-0 hero min-h-full bg-inherit">
      <NavBar />
      <h1 className="text-2xl font-bold text-center">BackTesting Tool</h1>
      <div className="my-8 px-4">
        <PlotlySignalChart />
      </div>
      <Footer />
    </div>
  );
}
