const conexion = require('../../database/database');




const agregarEquipo = async(id , nombreEquipo, directorTecnico, capitan)=>{

    try {
    

        let respuesta = await conexion.query('INSERT INTO public.equipos(idequipo , nombreequipo, directortecnico, capitan) VALUES (  $1, $2, $3, $4)',
        [ id , nombreEquipo, directorTecnico, capitan ]
        )

        return respuesta

    } catch (error) {
        console.log(error)
    }
   
}


const consultarEquipo = async()=>{
    try {
        let respuesta = await conexion.query('SELECT * FROM public.equipos');
        return respuesta.rows;

    } catch (error) {
        console.log(error)
    }
   
}

module.exports = {agregarEquipo, consultarEquipo }