import Header from "../../components/Header";
import { Link } from "react-router-dom";

function Projects() {
  const projects = [
    { id: 1, name: "Project One" },
    { id: 2, name: "Project Two" },
    { id: 3, name: "Project Three" },
  ];
  return (
    <>
      <Header />
      <div>
        <h1>Meus Projetos</h1>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Projects;
