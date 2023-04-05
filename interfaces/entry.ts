



export interface Entry { // Creamos la entrada que tendra nuestro contexto y le pasamos las propiedades que necesisatamos 
    _id : string;
    description : string;
    createDate : number;
    // El estatus debe estar tipado para permitir solo el status que nosotros deseamos por ello creamos otra interface o un type para proporcianar los estados que nosotros queremos
    status :  EntrieState,
}


export type EntrieState = 'Pending' | 'in-progress' | 'Finished' // Creamos los estados que queremos que tenga la propiedad estatus de nuestra interface Entry y creamos la tuveria con el slash recto