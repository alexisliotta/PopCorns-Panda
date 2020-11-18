import {CARGAR_ESTADO,GUARDAR_PELICULA, GUARDAR_REPARTO} from '../action/peliculasactions';

const estado_default ={
    peliculasApi: [],
    page: 1,
    pelicula: {},
    reparto:[],
}


export default (state = estado_default, action)=>{
    switch(action.type){
        case CARGAR_ESTADO:
            return{
                ...state,
                page: state.page + 1,
                peliculasApi: [...state.peliculasApi, ...action.payload.results]
            }
        case GUARDAR_PELICULA:
            return{
                ...state,
                pelicula: action.payload
            }
        case GUARDAR_REPARTO:
            return{
                ...state,
                reparto: action.payload
            }
        default:
            return state;
        }

}

