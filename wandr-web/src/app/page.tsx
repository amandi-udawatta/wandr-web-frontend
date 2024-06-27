import Camp from "@/components/Camp";
import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import { Hero } from "@/components/Hero";
import Image from "next/image";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Hero/>
      <Camp/>
      <Guide/>
      <Features/>
      <GetApp/>
      <Footer/>
    </>
  );
}
