import React from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
interface ProjectsListProps {
    projects: Project[];
}

function ProjectsList({ projects }: ProjectsListProps) {

    const handleEdit = (project: Project)=>{
        console.log(project);
    }

    return (
        <div className="row">
            {projects.map((project) => (
                <div className="cols-sm">
                    <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
                    <ProjectForm project={project}></ProjectForm>
                </div>
            ))}
        </div>
    );
}

export default ProjectsList;
