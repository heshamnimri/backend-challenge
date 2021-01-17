import { GraphQLClient } from 'graphql-request';
import { removeEmptyStringFields } from './misc';

const graphQLClient = new GraphQLClient('https://201211.applicant.fyelabs.com/graphql');

export async function graphQL(query: string, variables: null | any = null) {
  if (variables !== null) {
    variables = removeEmptyStringFields(variables);
  }
  return graphQLClient.request(query, variables);
}
