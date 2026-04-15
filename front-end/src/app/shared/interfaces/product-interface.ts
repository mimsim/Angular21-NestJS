export interface IProduct {
    id?: number;
    title: string;
    description: string;
}

export interface ICreateProductRequest {
    title: string;
    description: string;
}