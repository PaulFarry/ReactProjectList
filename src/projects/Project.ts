export class Project {
  id?: number;
  name: string = "";
  description: string = "";
  imageUrl: string = "";
  contractTypeId?: number;
  contractSignedOn: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initialiser?: any) {
    if (!initialiser) return;
    if (initialiser.id) this.id = initialiser.id;
    if (initialiser.name) this.name = initialiser.name;
    if (initialiser.description) this.description = initialiser.description;
    if (initialiser.imageUrl) this.imageUrl = initialiser.imageUrl;
    if (initialiser.contractTypeId)
      this.contractTypeId = initialiser.contractTypeId;
    if (initialiser.contractSignedOn)
      this.contractSignedOn = initialiser.contractSignedOn;
    if (initialiser.budget) this.budget = initialiser.budget;
    if (initialiser.isActive) this.isActive = initialiser.isActive;
  }
}
