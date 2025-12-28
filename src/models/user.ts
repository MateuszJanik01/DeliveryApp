import { UserRole } from "./userRole";

export class User{
    constructor(public id: number = 0, public email: string, public password: string, public role: UserRole) {}
}