import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'
import gql from 'graphql-tag'

const http = new HttpLink({uri: 'http://localhost:4000/'})
const cache = new InMemoryCache()

const delay = setContext(
    request => 
        new Promise((success, fail)=>{
            setTimeout(()=>{
                success()
            }, 800)
        })
)

const link = ApolloLink.from([
    delay,
    http
])

const client = new ApolloClient({
    link,
    cache
})

// const query = gql`
//     {
//         characters{
//             results{
//                 name
//                 id
//             }
//         }
//     }
// `

// client.query({query: query}).then(result => console.log(result))


export default client
