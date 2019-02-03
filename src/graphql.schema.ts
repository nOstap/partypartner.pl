/* tslint:disable */
export enum Group {
    USER = "USER",
    CLINT = "CLINT"
}

export interface CreateUserInput {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
}

export interface IMutation {
    createUser(createUserInput?: CreateUserInput): boolean | Promise<boolean>;
}

export interface IQuery {
    getUsers(): User[] | Promise<User[]>;
    user(id: number): User | Promise<User>;
    temp__(): boolean | Promise<boolean>;
}

export interface ISubscription {
    userCreated(): User | Promise<User>;
}

export interface User {
    id: number;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    group?: Group;
}
