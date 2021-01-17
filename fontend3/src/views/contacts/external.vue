<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
      <el-button-group>
        <el-button
          @click="handleAddContact"
        >Create Contact</el-button>
          <el-dialog
            title="Create New Contact"
            :visible.sync="contactDialogVisible">
            <div>
              <span>First Name: </span>
              <el-input
                placeholder="john"
                v-model="newContactPayload.firstName"
              >
              </el-input>
            </div>
            <br>
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
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="contactDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleAddContactClose">Confirm</el-button>
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
                placeholder="FYELABS"
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
      <!-- <el-table
          :data="contactsModule.contacts"
          stripe
          style="width: 100%">
          <el-table-column
            label="Company Name">
            <template slot-scope="scope">
              <i class="el-icon-user"></i>
              <span v-if="scope.row.company" style="margin-left: 10px">{{ scope.row.company.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Contact">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>First Name:  {{ scope.row.firstName }}</p>
                <p>Last Name:  {{ scope.row.lastName }}</p>
                <p>Auth:  {{ scope.row.authorizedType }}</p>
                <p>email:   {{ scope.row.email }}</p>
                <p>Internal:  {{ scope.row.isInternal }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.firstName+ ' '+ scope.row.lastName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="Operations">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table> -->
    </el-col>
    <el-row>
      <el-col
        v-for="photo in contactsModule.photos"
        :key="photo.title"
      >
        <v-card
          tile
        >
          <v-img
            :src="photo.src"
            class="white--text align-end"
            height="500px"
            width="750"
            name="photo.name"
          >
            <v-card-title v-text="photo.title"></v-card-title>
            <v-card-text v-text="photo.subtitle"></v-card-text>
          </v-img>
        </v-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContactsState from '@/store/modules/contacts';
import { Contact, ContactAuthorizedTypeEnum, ContactLabelEnum, Company, CompanyCurrencyEnum, CompanyLabelEnum } from '@/types/graphql';

import { getModule } from 'vuex-module-decorators';
import { logger } from '@/utils/logger';

@Component({
  name: 'ExternalContacts',
})
export default class extends Vue {
  private contactsModule = getModule(ContactsState, this.$store);

  private newContactPayload: Partial<Contact> = {};
  private newCompanyPayload: Partial<Company> = {};
  private contactDialogVisible = false;
  private companyDialogVisible = false;

  private companyFilter: any = ''

  private contactLabels = ContactLabelEnum
  private contactAuth = ContactAuthorizedTypeEnum
  private companyCurrencies = CompanyCurrencyEnum
  private companyLabels = CompanyLabelEnum

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
    await this.contactsModule.getCompanies();
    console.log(this.contactLabels);
  }

  // Handels launching the popup and resets the payload for creating a new contact
  handleAddContact() {
    this.newContactPayload = {};
    this.contactDialogVisible = true;
  }

  // Handels the subimission to create a new contact entity
  async handleAddContactClose() {
    this.contactsModule.createContact(this.newContactPayload);
    await this.contactsModule.getAllPhotos();
    this.contactDialogVisible = false;
  }

  // Handels launching the popup and resets the payload for creating a new company
  handleAddCompany() {
    this.newContactPayload = {};
    this.companyDialogVisible = true;
  }

  // Handels the subimission to create a new company entity
  async handleAddCompanyClose() {
    this.contactsModule.createCompany(this.newCompanyPayload);
    await this.contactsModule.getCompanies();
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
  async handleDelete(contact: Partial<Contact>) {
    this.contactsModule.deleteContact(contact.uuid);
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
