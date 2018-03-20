const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
} = graphql;

const workouts = [
	{ id: '1', workoutType: 'HITT', date: 378237 },
	{ id: '2', workoutType: 'Calastenics', date: 273892 }
];

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		id: 	     { type: GraphQLString },
		name: 	     { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(res => res.data)
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: 	   { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: 	   { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(resp => resp.data)
			}
		}
	})
});

const WorkoutType = new GraphQLObjectType({
	name: 'Workout',
	fields: {
		id:          { type: GraphQLString },
		workoutType: { type: GraphQLString },
		date:        { type: GraphQLInt }
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			// resolve func, tells GraphQL how to get the actual data
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			}
		},
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		},
		workout: {
			type: WorkoutType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return _.find(workouts, { id: args.id })
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
