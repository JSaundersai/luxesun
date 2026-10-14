import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeSections from "@/components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeSections startDelayMs={5000} />
      <Footer />
    </>
  );
}
