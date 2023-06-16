import { Project } from "./Project";
const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

const projectAPI = {
  async get(page = 1, limit = 20) {
    try {
      const rawResponse = await fetch(
        `${url}?_page=${page}&_limit=${limit}&_sort=name`
      );
      const response = await checkStatus(rawResponse);
      const data = await parseJSON(response);
      return convertToProjectModels(data);
    } catch (error) {
      console.log("log client error " + error);
      throw new Error(
        "There was an error retrieving the projects. Please try again."
      );
    }
  },

  async put(project: Project) {
    try {
      const rawResponse = await fetch(`${url}/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await checkStatus(rawResponse);
      return parseJSON(response);
    } catch (error) {
      console.log("log client error " + error);
      throw new Error(
        "There was an error updating the project. Please try again."
      );
    }
  },
  async find(id: number): Promise<Project> {
    const rawResponse = await fetch(`${url}/${id}`);
    const response = await checkStatus(rawResponse);
    const item = await parseJSON(response);
    return convertToProjectModel(item);
  },
};

export { projectAPI };
