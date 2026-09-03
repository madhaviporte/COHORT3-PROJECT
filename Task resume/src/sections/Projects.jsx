import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Projects" subtitle="A selection of my recent work" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
