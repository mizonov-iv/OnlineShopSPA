export interface FbResponse {
    name: string
}

export interface Product {
    date: string | number | Date
    type?: string
    id?: string
    title?: string
    photo?: string
    info?: string
    price?: string
}