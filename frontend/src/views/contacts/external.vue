<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <el-button-group>
        <el-button
          @click="handleUpload"
        >Upload Image</el-button>
          <el-dialog
            title="Upload Image"
            :visible.sync="uploadDialogVisible">
            <div>
              <v-file-input
                multiple
                accept="image/*"
                label="File input"
                v-model="uploadImagePayload.fileList"
              ></v-file-input>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="uploadImagePayload.name"
                label="File Name"
                required
              ></v-text-field>
              <el-select
                v-model="uploadImagePayload.privacy"
                placeholder="Select privacy">
                <el-option
                  v-for="item in ['private', 'public']"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <v-spacer></v-spacer>
            <!-- <br>
            <div>
              <span>Last Name:     </span>
              <el-input placeholder="Doe" v-model="newContactPayload.lastName">Last Name: </el-input>
            </div>
            <br>
            <div>
              <span>Email:     </span>
              <el-input placeholder="example@email.com" v-model="newContactPayload.email">Email: </el-input>
            </div>
            <br>
            <div>
              <span>Select Company:   </span>
              <el-select
                v-model="newContactPayload.company"
                placeholder="Select Company">
                <el-option
                  v-for="item in contactsModule.companies"
                  :key="item.name"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
            </div>
            <br>
            <div>
              <span>Select Authorization:   </span>
              <el-select
              v-model="newContactPayload.authorizedType"
              placeholder="Select Authorization">
              <el-option
                v-for="(key,val) in contactAuth"
                :key="val"
                :label="key.split('_').join(' ')"
                :value="key">
              </el-option>
             </el-select>
            </div>
            <br>
            <div>
              <span>Select Label:   </span>
              <el-select
                v-model="newContactPayload.label"
                placeholder="Select Label">
                <el-option
                  v-for="(key,val) in contactLabels"
                  :key="val"
                  :label="key.split('_').join(' ')"
                  :value="key">
                </el-option>
              </el-select>
            </div>
            <br>
            <div>
              <span>Is Contact Internal?     </span>
              <el-select
                v-model="newContactPayload.isInternal"
                placeholder="True/False">
                <el-option
                  v-for="item in internalStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div> -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="uploadDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleUploadClose">Confirm</el-button>
            </span>
          </el-dialog>
        <el-button
          @click="handleAddCompany"
        >Add Company</el-button>
          <el-dialog
            title="Create New Company"
            :visible.sync="companyDialogVisible">
            <div>
              <span>Company Name:    </span>
              <el-input
                placeholder="SHOPIFY"
                v-model="newCompanyPayload.name"
              >
              </el-input>
            </div>
            <br>
            <div>
              <span>Select Currency:     </span>
              <el-select
                v-model="newCompanyPayload.currency"
                placeholder="Select Currency">
                <el-option
                  v-for="(key,val) in companyCurrencies"
                  :key="val"
                  :label="key.split('_').join(' ')"
                  :value="key">
                </el-option>
              </el-select>
            </div>
            <br>
            <div>
              <span>Select Authorization:    </span>
              <el-select
              v-model="newCompanyPayload.permission"
              placeholder="Select Authorization">
              <el-option
                v-for="(key,val) in contactAuth"
                :key="val"
                :label="key.split('_').join(' ')"
                :value="key">
              </el-option>
             </el-select>
            </div>
            <br>
            <div>
              <span>Select Label:     </span>
              <el-select
                v-model="newCompanyPayload.label"
                placeholder="Select Label">
                <el-option
                  v-for="(key,val) in companyLabels"
                  :key="val"
                  :label="key.split('_').join(' ')"
                  :value="key">
                </el-option>
              </el-select>
            </div>
            <br>
            <span slot="footer" class="dialog-footer">
              <el-button @click="companyDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleAddCompanyClose">Confirm</el-button>
            </span>
          </el-dialog>
        <el-select
          v-model="companyFilter"
          @change="updateFilters"
          clearable placeholder="Select Company Filter">
          <el-option
              v-for="item in contactsModule.companies"
              :key="item.name"
              :label="item.name"
              :value="item.uuid">
          </el-option>
        </el-select>
      </el-button-group>
      <br>
      <br>
    <template>
      <v-row>
        <v-col
          v-for="photo in contactsModule.photos"
          :key="photo.title"
          cols="4"
        >
          <v-card
          >
            <v-img
              :src="photo.src"
              name="photo.title"
            >
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              {{photo.title9}}
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactsState from '@/store/modules/contacts';

import { getModule } from 'vuex-module-decorators';

@Component({
  name: 'ExternalContacts',
})
export default class extends Vue {
  private contactsModule = getModule(ContactsState, this.$store);

  private uploadImagePayload: any = {};
  private uploadDialogVisible = false;
  private privacyChoices = ['private', 'public'];

  private newContactPayload: any = {};
  private newCompanyPayload: any = {};
  private companyDialogVisible = false;

  private companyFilter: any = ''

  private contactLabels = []
  private contactAuth = []
  private companyCurrencies = []
  private companyLabels = []

  private internalStatus = [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ]

  // State is loaded with all copanies and contacts on creation
  async created() {
    await this.contactsModule.getAllPhotos();
    // await this.contactsModule.getCompanies();
    console.log(this.contactLabels);
  }

  // Handels launching the popup and resets the payload for creating a new contact
  handleUpload() {
    this.newContactPayload = {};
    this.uploadDialogVisible = true;
  }

  // Handels the subimission to create a new contact entity
  async handleUploadClose() {
    this.contactsModule.uploadImage(this.uploadImagePayload);
    await this.contactsModule.getAllPhotos();
    this.uploadDialogVisible = false;
  }

  // Handels launching the popup and resets the payload for creating a new company
  handleAddCompany() {
    this.newContactPayload = {};
    this.companyDialogVisible = true;
  }

  // Handels the subimission to create a new company entity
  async handleAddCompanyClose() {
    // this.contactsModule.createCompany(this.newCompanyPayload);
    // await this.contactsModule.getCompanies();
    this.companyDialogVisible = false;
  }

  // Handels updating the state based on the user selected filter
  async updateFilters() {
    if (this.companyFilter) {
      this.contactsModule.filterContacts(this.companyFilter.toString());
      console.log(this.companyFilter);
    } else {
      await this.contactsModule.getAllPhotos();
    }
  }

  // not developed
  handleEdit(index: any, row: any) {
    console.log(this.companyFilter);
  }

  // calls on the methods for deleting contacts and updating contacts
  async handleDelete(contact: any) {
    // this.contactsModule.deleteContact(contact.uuid);
    await this.contactsModule.getAllPhotos();
  }
}
</script>

<style lang="scss" scoped>
  .input-label {
    display: inline-block;
  }

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demo-input-size {
    display: table;
    width: 100%;
    table-layout: fixed;    /* For cells of equal size */
  }
</style>
