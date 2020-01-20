
const Paciente = require('./Paciente.js').Paciente
const Facturable = require('./Paciente.js').Facturable

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cloro = new Facturable('Cloro en sangre')
var edgar = new Paciente('Edgar',10,3030,'IOMA',[cloro])
var jose = new Paciente('Jose',10,3030,'IOMA',[cloro])
var nestor = new Paciente('Nestor',10,3030,'IOMA',[cloro])
var pacientes = [edgar,jose,nestor]
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query{
    allPaciente(last: Int) : [Paciente!]
  }
  type Mutation{
    createPaciente(nombre: String!, edad: Int!, dni: Int! obrasocial: String!): Paciente!
  }
  type Subscription {
    newPaciente: Paciente!
  }
  type Paciente{
    nombre : String!
    edad : Int!
    dni : Int!
    obrasocial : String!
    facturable: [Facturable!]!
  }
  type Facturable{
    nombre : String!
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
  allPaciente : (cantidad) =>{
    return pacientes.slice(0,cantidad.last);

  },
  createPaciente : (paciente) => {
    let pacienteNew = new Paciente(paciente.nombre,paciente.edad,paciente.dni,paciente.obrasocial,[cloro]);
    console.log(pacienteNew)
    pacientes.push(pacienteNew);
    return pacienteNew;
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(8083);
console.log('Running a GraphQL API server at http://localhost:8080/graphql');