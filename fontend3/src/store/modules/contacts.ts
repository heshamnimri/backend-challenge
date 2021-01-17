import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import { graphQL } from '@/utils/logic';
import axios from 'axios';
import { Contact, Company } from '@/types/graphql';
import { gql } from 'graphql-request';

@Module({
  name: 'contacts',
  namespaced: true,
})
export default class ContactsState extends VuexModule {
  public photos: any[] = []
  public companies = []

  // Populates the state with the list of all contacts
  @MutationAction({ mutate: ['photos'] })
  async getAllPhotos() {
    const res: any = await axios.get('http://localhost:1234/images');
    console.log(res.data);
    return { photos: res.data };
  }

  // Populates the state with the list of all companies
  @MutationAction({ mutate: ['companies'] })
  async getCompanies() {
    const query = `
      query{
        companies{
          name
          uuid
        }
      }
    `;
    const res: any = await graphQL(query);
    return res;
  }

  // Mutation for filtering states related a given company
  @Mutation
  filterContacts(companyFilter: string) {
    this.photos = this.photos.filter(
      (photo) => photo?.company?.uuid === companyFilter,
    );
  }

  // Funciton for creating a new contact entitiy
  @Action({ commit: "createContact" })
  async createContact(contactObject: Partial<Contact>) {
    // this can be made to be dynamic such that non-required feilds can be optional
    const { authorizedType, label, email, firstName, lastName, isInternal, company } = contactObject;
    const query = gql`
      mutation createContact($authorizedType:ContactAuthorizedTypeEnum!, $label:ContactLabelEnum!, $email: String!, $firstName: String!, $lastName: String, $isInternal: Boolean!, $company:ID )
      {
        contactCreate( authorizedType: $authorizedType, label: $label, email: $email, firstName: $firstName, lastName: $lastName, isInternal: $isInternal, company: $company)
          {
            firstName
          }
        }
    `;
    const variables = {
      authorizedType,
      label,
      email,
      firstName,
      lastName,
      isInternal,
      company,
    };
    const res: any = await graphQL(query, variables);
    return res;
  }

  // Function for deleting a contact form the database given a uuid
  @Action({ commit: "deleteContant" })
  async deleteContact(uuid: string | undefined) {
    // this can be made to be dynamic such that non-required feilds can be optional
    const query = gql`
      mutation deleteContact($uuid: ID!){
        contactDelete(uuid: $uuid)
        {
          success
        }
      }
    `;
    const res: any = await graphQL(query, { uuid });
    return res;
  }

  // Function for creating a new company entity
  @Action({ commit: "createCompany" })
  async createCompany(companyObject: Partial<Company>) {
    // this can be made to be dynamic such that non-required feilds can be optional
    const { currency, label, permission, name } = companyObject;
    const query = gql`
      mutation createCompany($permission:[ContactAuthorizedTypeEnum!]!, $label:CompanyLabelEnum!, $currency: CompanyCurrencyEnum!, $name: String! )
      {
        companyCreate( permission: $permission, label: $label, currency: $currency, name: $name)
          {
            name
          }
        }
    `;
    const variables = {
      permission,
      label,
      currency,
      name,
    };
    const res: any = await graphQL(query, variables);
    return res;
  }
}
