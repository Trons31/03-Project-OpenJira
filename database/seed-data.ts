

// TODO: Al objeto padre le creamos la propiedad entries, y lo tipamos con nuestra interface SeedEntry
interface SeedData {
    entries : SeedEntry[];
}



// TODO: para tipar aun mas nuestras entradas podemos crear una interface con la Props de nuestras entradas

interface SeedEntry {
    description: string;
    status: string;
    createDate: number
}


//  TODO: Creamos un objeto para insertar las entradas en nuestra base de datos
export const seedData :SeedData = { // Tipamos nuestro objeto con las Props que contiene nuesta interface SeeData
    entries: [ // Creamos una propiedad llamada entry y creamos nuestras entradas
    // Nuestras entradas los ID de mongo
            { 
                description:  'Pendiente : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, odit!',
                status: 'Pending', // como tipamos nuestro estatus solo aceptara los estatus con los que fue tipado de echo cuando colocamos las comillas nos da la autoayuda mostrandonos solo los tres estatus que pueda recibir
                createDate: Date.now()
            },
            { 
                description:  'In-Progress: Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
               status: 'in-progress', // como tipamos nuestro estatus solo aceptara los estatus con los que fue tipado de echo cuando colocamos las comillas nos da la autoayuda mostrandonos solo los tres estatus que pueda recibir
               createDate: Date.now() - 1000000,
           },
            { 
               description:  'Completado :Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in?',
               status: 'Finished', // como tipamos nuestro estatus solo aceptara los estatus con los que fue tipado de echo cuando colocamos las comillas nos da la autoayuda mostrandonos solo los tres estatus que pueda recibir
               createDate: Date.now() - 1000000,
           },
           { 
            description:  'Completado :Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, in?',
            status: 'Finished', // como tipamos nuestro estatus solo aceptara los estatus con los que fue tipado de echo cuando colocamos las comillas nos da la autoayuda mostrandonos solo los tres estatus que pueda recibir
            createDate: Date.now() - 1000000,
        },
    ]
}