import { Module, VuexModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import axios from 'axios';
import FormData from 'form-data';

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
    // const pics = [res.data[0], res.data[0], res.data[0], res.data[0], res.data[0], res.data[0]];
    return { photos: res.data };
  }

  // Populates the state with the list of all companies
  // @MutationAction({ mutate: ['companies'] })
  // async getCompanies() {
  //   const query = `
  //     query{
  //       companies{
  //         name
  //         uuid
  //       }
  //     }
  //   `;
  //   const res: any = await graphQL(query);
  //   return res;
  // }

  // Mutation for filtering states related a given company
  @Mutation
  filterContacts(companyFilter: string) {
    this.photos = this.photos.filter(
      (photo) => photo?.company?.uuid === companyFilter,
    );
  }

  // Funciton for creating a new contact entitiy
  @Action({ commit: "uploadImage" })
  async uploadImage(metaData: any) {
    const { fileList, name, privacy } = metaData;
    const res = await Promise.all(fileList.map(async (file: any) => {
      var data = new FormData();

      data.append('image', file);
      data.append('privacy', privacy);
      data.append('name', name);

      axios({
        method: 'post',
        url: 'http://localhost:1234/images',
        headers: {
          'content-type': 'multipart/form-data',
        },
        data,
      })
        .then((response) => {
          console.log(JSON.stringify(response.data));
        });
    }));
    return res;
  }

  // // Function for deleting a contact form the database given a uuid
  // @Action({ commit: "deleteContant" })
  // async deleteContact(uuid: string | undefined) {
  //   // this can be made to be dynamic such that non-required feilds can be optional
  //   const query = gql`
  //     mutation deleteContact($uuid: ID!){
  //       contactDelete(uuid: $uuid)
  //       {
  //         success
  //       }
  //     }
  //   `;
  //   const res: any = await graphQL(query, { uuid });
  //   return res;
  // }

  // // Function for creating a new company entity
  // @Action({ commit: "createCompany" })
  // async createCompany(companyObject: Partial<Company>) {
  //   // this can be made to be dynamic such that non-required feilds can be optional
  //   const { currency, label, permission, name } = companyObject;
  //   const query = gql`
  //     mutation createCompany($permission:[ContactAuthorizedTypeEnum!]!, $label:CompanyLabelEnum!, $currency: CompanyCurrencyEnum!, $name: String! )
  //     {
  //       companyCreate( permission: $permission, label: $label, currency: $currency, name: $name)
  //         {
  //           name
  //         }
  //       }
  //   `;
  //   const variables = {
  //     permission,
  //     label,
  //     currency,
  //     name,
  //   };
  //   const res: any = await graphQL(query, variables);
  //   return res;
  // }
}
