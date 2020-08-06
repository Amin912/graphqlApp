const axios = require('axios');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');

//First type
const LaunchType = new GraphQLObjectType({
    name: 'launch',
    fields: ()=> ({
        flight_number: { type: GraphQLInt },
        mission_name: {type:GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type :GraphQLBoolean },
        rocket : { type: RocketType }
    })
});

const RocketType = new GraphQLObjectType({
    name: 'rocket',
    fields: ()=> ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});

//root query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args){
                if (args.flight_number)
                return axios.get('https://api.spacexdata.com/v3/launches/'+args.flight_number)
                .then(res => res.data);
                return axios.get('https://api.spacexdata.com/v3/launches/'+1)
                .then(res => res.data);

            }

        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});