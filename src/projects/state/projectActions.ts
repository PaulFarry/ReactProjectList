import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { projectAPI } from "../projectAPI";
import { Project } from "../Project";
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_FAILURE,
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE,
  SAVE_PROJECT_REQUEST,
  SAVE_PROJECT_SUCCESS,
  SAVE_PROJECT_FAILURE,
  ProjectState,
} from "./projectTypes";

//action creators

export function loadProject(id: number) : ThunkAction<void, ProjectState, null, Action<string>>
{
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROJECT_REQUEST });
    try {
      const data = await projectAPI.find(id);
      dispatch({
        type: LOAD_PROJECT_SUCCESS,
        payload: { project: data },
      });
    } catch (error) {
      dispatch({ type: LOAD_PROJECT_FAILURE, payload: error });
    }
  };
}

export function loadProjects(
  page: number
): ThunkAction<void, ProjectState, null, Action<string>> {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROJECTS_REQUEST });
    try {
      const data = await projectAPI.get(page);
      dispatch({
        type: LOAD_PROJECTS_SUCCESS,
        payload: { projects: data, page },
      });
    } catch (error) {
      dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error });
    }
  };
}

export function saveProject(
  project: Project
): ThunkAction<void, ProjectState, null, Action<string>> {
  return async (dispatch: any) => {
    dispatch({ type: SAVE_PROJECT_REQUEST });
    try {
      const data = await projectAPI.put(project);
      dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SAVE_PROJECT_FAILURE, payload: error });
    }
  };
}
