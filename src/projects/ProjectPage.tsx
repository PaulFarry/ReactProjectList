import { useEffect } from "react";

import ProjectDetail from "./ProjectDetail";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../state';
import { ThunkDispatch } from 'redux-thunk';
import { ProjectState } from './state/projectTypes';
import { loadProject } from './state/projectActions';
import { AnyAction } from 'redux';


function ProjectPage(props: any) {
    const loading = useSelector((appState: AppState) => appState.projectState.loading);
    const project = useSelector((appState: AppState) => appState.projectState.project);
    const error = useSelector((appState: AppState) => appState.projectState.error);
    const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        dispatch(loadProject(id));
    }, [dispatch, id]);

    return (
        <div>
            <>
                <h1>Project Detail</h1>
                {loading && (
                    <div className="centre-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <span className="icon-alert inverse"></span> {error}
                                </p>
                            </section>
                        </div>
                    </div>
                )}

                {project && (
                    <ProjectDetail project={project} />
                )}
            </>
        </div>
    )
}

export default ProjectPage;
