const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/colorpet");

const WeeklyColor = mongoose.model('WeeklyColor', {
  hex: String,
  date: String,
  completed: Boolean
});

const Color = mongoose.model('Color', {
  hex: String,
  date: String
});

const typeDefs = `
  type Query {
    colors: [Color]
    weeklyColors: [WeeklyColor]
  }
  type Color {
    id: ID!
    hex: String!
    date: String!
  }
  type WeeklyColor {
    id: ID!
    hex: String!
    date: String!
    completed: Boolean!
  }
  type Mutation {
    createColor(hex: String!, date: String!): Color
    removeColor(id: ID!): Boolean

    createWeeklyColor(hex: String!, date: String!, completed: Boolean!): WeeklyColor
    removeWeeklyColor(id: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    colors: () => Color.find(),
    weeklyColors: () => WeeklyColor.find()
  },
  Mutation: {
    createColor: async (_, { hex, date }) => {
      const color = new Color({ hex, date });
      // save to database
      await color.save();
      return color;
    },
    removeColor: async (_, { id }) => {
      await Color.findByIdAndRemove(id);
      return true;
    },

    createWeeklyColor: async (_, { hex, date, completed }) => {
      const weeklyColor = new WeeklyColor({ hex, date, completed });
      // save to database
      await weeklyColor.save();
      return weeklyColor;
    },
    removeWeeklyColor: async (_, { id }) => {
      await WeeklyColor.findByIdAndRemove(id);
      return true;
    },
  }
}

const server = new GraphQLServer({ typeDefs, resolvers });
mongoose.connection.once("open", function () {
  server.start(() => console.log('Server is running on localhost:3000'));
});
