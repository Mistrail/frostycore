export class FilterDto {
    offset?: number
    limit?: number
}

export function buildFilter<T>(fields: Partial<T>): T {
    return {offset: 0, limit: 20, ...fields} as T
}