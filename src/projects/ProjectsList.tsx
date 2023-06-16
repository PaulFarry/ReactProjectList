import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
interface ProjectsListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectsList({ projects, onSave }: ProjectsListProps) {

    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }

    const cancelEditing = () => {
        setProjectBeingEdited({});
    }

    return (
        <div className="row">
            {projects.map((project) => (
                <div className="cols-sm">
                    {project === projectBeingEdited ? (
                        <ProjectForm
                            project={project}
                            onCancel={cancelEditing}
                            onSave={onSave} />
                    ) : (<ProjectCard
                        project={project}
                        onEdit={handleEdit} />)}
                </div>
            ))}
        </div>
    );
}

export default ProjectsList;
