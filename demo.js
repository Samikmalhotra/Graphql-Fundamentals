const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        email: String!,
        avatar: String,
        friends: [User!]!,
    }

    type Query{
        me: User!
    }
     
`