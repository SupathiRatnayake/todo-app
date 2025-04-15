import { Guid } from "guid-typescript";

export class TodoItem {
    id: Guid = Guid.createEmpty();
    title: string = '';
    description: string = '';
    due: Date = new Date();
    isComplete: boolean = false;
    isDeleted: boolean = false;
    ownerId: Guid = Guid.createEmpty();


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.title) this.title = initializer.title;
        if (initializer.description) this.description = initializer.description;
        if (initializer.due) this.due = initializer.due;
        if (initializer.isComplete) this.isComplete = initializer.isComplete;
        if (initializer.isDeleted) this.isDeleted = initializer.isDeleted;
        if (initializer.ownerId) this.ownerId = initializer.ownerId;

    }
}