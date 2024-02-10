import { GraphQLClient } from "graphql-request";

const url = "https://doylestown.stepzen.net/api/vociferous-elk/__graphql";

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const client = new GraphQLClient(url, {
  headers: {
    Authorization:
      "apikey doylestown::stepzen.io+1000::3a0611000eba6d01fad59ad708da5a198a85169b0162f2b23927b8668ed7649b",
  },
});

export default client;
