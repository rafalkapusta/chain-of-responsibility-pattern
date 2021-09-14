export type Results = {
    1: { data: [string]; errors: [] }
    2: { data: null; errors: [] }
    3: { data: [string]; errors: [string] }
    4: { data: null; errors: [string] | [] }
}

export interface IResponse {
    data: [string] | null
    errors: [string] | []

    response(): IResponse
}
