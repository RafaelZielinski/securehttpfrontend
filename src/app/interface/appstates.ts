import { DataState } from "../enum/datastate.enum";
import { User } from "./user";
import {Events} from "./events";
import {Role} from "./role";
import { Customer } from "./customer";

export interface LoginState {
    dataState: DataState;
    loginSuccess?: boolean;
    error?: string;
    message?: string;
    isUsingMfa?: boolean;
    phone?: string;
}

export interface CustomHttpResponse<T> {
    timestamp: Date;
    statusCode: number;
    status: string;
    message: string;
    reason?: string;
    developerMessage?: string;
    data?: T
}

export interface Profile {
    user?: User;
    events?: Events[];
    roles?: Role[];
    access_token?: string;
    refresh_token?: string;
}

export interface Page {
    content: Customer[];
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    size: number;
    number: number;
}
export interface CustomerState {
    user: User;
    customer: Customer;
}

