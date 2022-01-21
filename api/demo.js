const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

const typeDefs = gql`
    # union Footwear = Sneaker | Boot
    enum ShoeType {
        JORDAN
        NIKE
        ADIDAS
        PUMA
    }
    type User{
        email: String!,
        avatar: String,
        shoes: [Shoe]!
    }
    
    interface Shoe{
        brand: ShoeType!
        size: Int!
        user: User!
    }

    type Sneaker implements Shoe{
        brand: ShoeType!
        size: Int!
        sport: String!
        user: User!

    }

    type Boot implements Shoe{
        brand: ShoeType!
        size: Int!
        hasGrip: Boolean!
        user: User!
    }

    input ShoesInput{
        brand: ShoeType
        size: Int
    }

    input NewShoeInput{
        brand: ShoeType!
        size: Int!
    }

    type Query{
        me: User!
        shoes(input: ShoesInput): [Shoe]!
    }

    type Mutation{
        newShoe(input: NewShoeInput!): Shoe!
    }
`

const user = {
    id: 1,
    email: 'yoda@masters.com',
    avatar: 'http://yoda.png',
    shoes: []
}

const resolvers = {
    Query: {
        shoes(_, {input}){
            return [
                {brand: 'NIKE', size: 12, user: 1},
                {brand: 'ADIDAS', size: 12, sport: 'basketball', user: 1},
                {brand: 'PUMA', size: 12}
            ]
        },
        me() {
            return user
        }
    },
    Mutation:{
        newShoe(_,{input}){
            return input
        }
    },
    Shoe: {
        __resolveType(shoe){
            if(shoe.sport) return 'Sneaker'
            return 'Boot'
        }
    },
    Sneaker: {
        user(shoe){
            return user
        }
    },
    Boot: {
        user(shoe){
            return user
        }
    }
    // Footwear:{
    //     __resolveType(shoe){
    //         if(shoe.sport) return 'Sneaker'
    //         return 'Boot'
    //     }
    // }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(()=>console.log('on port 4000'))