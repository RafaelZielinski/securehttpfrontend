import { Invoice } from "./invoice";

export interface Customer {
    id: number;
    name: string;
    email: string;
    address: string;
    type: string;
    status: string;
    imageUrl: string;
    phone: number;
    createdAt: Date;
    invoices?: Invoice[];
}