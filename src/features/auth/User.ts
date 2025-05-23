import { Guid } from "guid-typescript";

export class User {
    id: Guid = Guid.createEmpty();
    name: string ='';
    
    email: string = '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.name) this.name = initializer.name;
        if (initializer.email) this.email = initializer.email;
    }
} 