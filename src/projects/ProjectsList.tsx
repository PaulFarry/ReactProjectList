import React from "react";
import { Project } from "./Project";
import ProjectCard  from "./ProjectCard";

interface ProjectsListProps {
    projects: Project[];
}

function ProjectsList({ projects }: ProjectsListProps) {
    return (
        <div className="row">
            {projects.map((project) => (
                <div className="cols-sm">
                    <ProjectCard project={project}></ProjectCard>
                </div>
            ))}
        </div>
    );
}

export default ProjectsList;
