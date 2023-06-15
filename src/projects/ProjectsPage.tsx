import { MOCK_PROJECTS } from "./MockProjects";
import ProjectsList from "./ProjectsList";
import { Project } from "./Project";

function ProjectsPage() {
    const saveProject = (project: Project) => {
        console.log('Saving Project: ', project);
    }

    return (
        <>
            <h1>Projects</h1>
            <ProjectsList projects={MOCK_PROJECTS} onSave={saveProject} />
        </>
    )
}

export default ProjectsPage;
