export class Project {
  id: number | undefined;
  name: string = "";
  description: string = "";
  imageUrl: string = "";
  contactTypeId: number | undefined;
  contactSignedOn: Date = new Date();
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
    if (initialiser.contactTypeId)
      this.contactTypeId = initialiser.contactTypeId;
    if (initialiser.contactSignedOn)
      this.contactSignedOn = initialiser.contactSignedOn;
    if (initialiser.budget) this.budget = initialiser.budget;
    if (initialiser.isActive) this.isActive = initialiser.isActive;
  }
}
