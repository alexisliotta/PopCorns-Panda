export const CARGAR_ESTADO = 'CARGAR_ESTADO';
export const GUARDAR_PELICULA = 'GUARDAR_PELICULA';
export const GUARDAR_REPARTO = 'GUARDAR_REPARTO';

export const cargarPeliculas = (data) => {
    return{
        type: CARGAR_ESTADO,
        payload: data
    }
}



export const guardarPeliculas = (data) => {
    return{
        type: GUARDAR_PELICULA,
        payload: data
    }
}

export const guardarReparto = (data) => {
    return{
        type: GUARDAR_REPARTO,
        payload: data
    }
}