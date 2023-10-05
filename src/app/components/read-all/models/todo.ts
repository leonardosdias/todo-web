export interface Todo {
    id?:String,
    titulo: String,
    descricao?:String,
    dataParaFinalizar: Date | string,
    finalizado: Boolean
}