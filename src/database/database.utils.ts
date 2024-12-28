import { ModelCtor } from "sequelize-typescript"

const registeredModels: ModelCtor[] = [];
export function registerModel(model: ModelCtor){
    registeredModels.push(model)
}

export function getRegisteredModels(): ModelCtor[]{
    return registeredModels
}