export class ProjectError {
    name: string = "";
    description: string = "";
    budget: string = "";
    hasError : boolean = false;

constructor(initialiser?: any) {
    console.log("Errors!" , this);
    if (!initialiser) return;
    if (initialiser.name) this.name = initialiser.name;
    if (initialiser.description) this.description = initialiser.description;
    if (initialiser.budget) this.budget = initialiser.budget;

    console.log("Errors" , this);
  }
}
