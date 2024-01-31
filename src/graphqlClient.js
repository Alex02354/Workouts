import { GraphQLClient } from "graphql-request";

const url = 'https://doylestown.stepzen.net/api/vociferous-elk/__graphql';

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const client = new GraphQLClient(url, {headers:{Authorization: `apiKey ${apiKey}`}});

export default client;