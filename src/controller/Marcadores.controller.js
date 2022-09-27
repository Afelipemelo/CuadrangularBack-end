const conexion = require('../../database/database');

const agregarMarcador = async(idEquipo , golesAfabor, golesEncontra, puntos, partidosJugados )=>{

    try {
    
        let respuesta = await conexion.query('INSERT INTO public.marcadores(  idequipo, golesafabor, golesencontra, puntos, partidosjugados) VALUES ($1 , $2, $3, $4 , $5 )',
        [ idEquipo , golesAfabor, golesEncontra, puntos , partidosJugados ]
        )

        return respuesta

    } catch (error) {
        console.log(error)
    }
   
}

const consultarMarcadores = async()=>{
    try {
        let respuesta = await conexion.query('select   (select nombreequipo from equipos where idequipo = ma.idequipo ) ,  ma.idequipo,    sum(ma.golesafabor) as golesafabor , sum(ma.golesencontra) as golesencontra , sum(ma.puntos) as puntos ,  sum(ma.partidosjugados) as partidosJugados  from marcadores as ma group by ma.idequipo');
        return respuesta.rows;

    } catch (error) {
        console.log(error)
    }
   
}




module.exports = {agregarMarcador, consultarMarcadores }