import Camp from "@/components/general/Camp";
import Features from "@/components/general/Features";
import GetApp from "@/components/general/GetApp";
import Guide from "@/components/general/Guide";
import { Hero } from "@/components/general/Hero";
import Image from "next/image";
import Footer from "@/components/general/Footer"
import Navbar from "@/components/general/Navbar";

export default function Home() {
  return (
    <>
     <Navbar/>
      <Hero/>
      <Camp/>
      <Guide/>
      <Features/>
      <GetApp/>
      <Footer/>
    </>
  );
}
