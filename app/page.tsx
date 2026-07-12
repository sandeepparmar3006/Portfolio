import Rail from "./components/Rail";
import Topbar from "./components/Topbar";
import {
  Hero,
  Competencies,
  Experience,
  Projects,
  Skills,
  Education,
  Contact,
} from "./components/sections";

export default function Home() {
  return (
    <>
      <Rail />
      <Topbar />
      <main>
        <Hero />
        <Competencies />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
