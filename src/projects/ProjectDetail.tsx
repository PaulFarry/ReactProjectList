import React from "react";
import { Project } from "./Project";

interface ProjectDetailProps {
    project: Project;
}

function ProjectDetail({ project }: ProjectDetailProps) {

    console.log(project);
    const displaySigned: string = new Date(project.contractSignedOn).toLocaleDateString();

    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="card large">
                    <img className="rounded" src={project.imageUrl} alt={project.name} />
                    <section className="section dark">
                        <h3 className="strong">
                            <strong>{project.name}</strong>
                        </h3>
                        <p>{project.description}</p>
                        <p>Budget: ${project.budget.toLocaleString()}</p>
                        <p>Signed: {displaySigned}</p>
                        <p>
                            <mark className="active">
                                {' '} {project.isActive ? "active" : "inactive"}
                            </mark>
                        </p>
                    </section>
                </div>

            </div>
        </div>
    )
}

export default ProjectDetail;