const express = require('express');
const bodyparser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyparser.json());
app.use('/graphql', graphqlHttp({
    schema: buildSchema (
        `type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }`
    ),
    rootValue: {
        events: (args) => {
            return ['Romantic Cooking', 'Sailing', 'All-night Party']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
})
);

app.listen(3000);