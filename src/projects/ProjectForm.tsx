import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";
import { ProjectError } from "./ProjectError";
import { useDispatch } from 'react-redux';
import { saveProject } from './state/projectActions';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { AnyAction } from 'redux';

interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
}

function ProjectForm({
    project: initialProject,
    onCancel
}: ProjectFormProps) {


const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

const [project, setProject] = useState(initialProject);

let defaultError = new ProjectError();

const [errors, setErrors] = useState(defaultError);

const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (validate(project).hasError) return;
    dispatch(saveProject(project));
};

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        //if input type is checkbox, use checked
        //otherwise it's text, number etc so use value;

        let updatedValue = type === "checkbox" ? checked : value;
        //if input type is number convert to updatedValue string to a +number
        if (type === "number") {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        //need to do function update because 
        //the new project state is based on the previous project state
        //we we can keep the project propertyies that aren't being edited +like project.id
        // the spread operator (...) is used to
        //spread the previous project properties and the new change
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => {
            let er = validate(updatedProject);
            console.log("Validated", er);
            return er;
        });
    };


    function validate(project: Project): ProjectError {
        let errors = new ProjectError({ name: '', description: '', budget: '' });
        if (project.name.length === 0) {
            errors.name = "Name is required";
            errors.hasError = true;
        }

        if (project.name.length < 3) {
            errors.name = "Name needs to be at least 3 characters.";
            errors.hasError = true;
        }
        if (project.description.length === 0) {
            errors.description = "Description is required";
            errors.hasError = true;
        }

        if (project.budget <= 0) {
            errors.budget = "Budget must be more than $0.";
            errors.hasError = true;
        }


        return errors;
    }


    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name"
                value={project.name} onChange={handleChange} />
            {errors.hasError && errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            <label htmlFor="description">Project Description</label>

            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}></textarea>
            {errors.hasError && errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}
            <label htmlFor="budget">Project Budget</label>

            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.hasError && errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
            </div>
        </form>);
}

export default ProjectForm;
