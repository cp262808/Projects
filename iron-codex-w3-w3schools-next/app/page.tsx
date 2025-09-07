import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Tiles from "@/components/Tiles";
import Featured from "@/components/Featured";
import Example from "@/components/Example";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Page(){
  return (
    <>
      <NavBar />
      <Hero />
      <Tiles />
      <Featured />
      <Example />
      <Stats />
      <Footer />
    </>
  )
}
