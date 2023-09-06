// schema.js
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const { Post } = require('./models'); // Import your MongoDB models

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Implement logic to fetch a post by ID from your MongoDB
        return Post.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Create a new post and save it to MongoDB
        const post = new Post({ title: args.title, content: args.content });
        return post.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
