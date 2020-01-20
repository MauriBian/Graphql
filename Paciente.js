class Paciente {
    constructor(nombre,edad,dni,obrasocial,facturable) {
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.obrasocial = obrasocial;
        this.facturable = facturable
    }
toJSON() {
        return {
          nombre: String(this.nombre),
          edad:  Number(this.edad),
          dni:   Number(this.dni),
          obrasocial : String(this.obrasocial),
          facturable : this.facturable,
        };
   }
}

class Facturable {
    constructor(nombre){
        this.nombre = nombre
    }
  toJSON(){
      return{
          nombre : String(this.nombre),
      }
  }  
}
module.exports = {
    Paciente:Paciente,
    Facturable : Facturable,

}
