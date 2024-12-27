export class List<T>{
    data?: T[] | null | []
    total?: number
}

export function batchToList<T>(batch: T[] | null | [], total?: number): List<T>{
    const list = new List<T>()
    list.data = batch
    list.total = total
    return list
}