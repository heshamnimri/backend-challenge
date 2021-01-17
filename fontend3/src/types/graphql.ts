export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents a DateTime. The DateTime is serialized as an RFC 3339 quoted string */
  DateTime: any;
};

/** Result of a mutation that does not return data */
export type MutationResult = {
  __typename?: 'MutationResult';
  /** Indicator if request was successful */
  success: Scalars['Boolean'];
};

/** Salary entity */
export type Salary = {
  __typename?: 'Salary';
  /** Contacts assigned to salary class */
  contacts: Array<Contact>;
  /** Salary creation time */
  created: Scalars['DateTime'];
  /** Salary description */
  description?: Maybe<Scalars['String']>;
  /** Salary name */
  name: Scalars['String'];
  /** Permission required to access salary */
  permission: Array<Scalars['String']>;
  /** Salary rate */
  rate: Scalars['Float'];
  /** Salary update time */
  updated: Scalars['DateTime'];
  /** Salary unique identifier */
  uuid: Scalars['ID'];
};


/** Salary entity */
export type SalaryPermissionArgs = {
  permission?: Maybe<ContactAuthorizedTypeEnum>;
};


/** Contact authorization levels */
export enum ContactAuthorizedTypeEnum {
  /** System user */
  System = 'System',
  /** Permanent Dev/Tech staff */
  FyeLabsDevTechPermanent = 'FyeLabs_DevTech_Permanent',
  /** Non-permanent Dev/Tech staff */
  FyeLabsDevTech = 'FyeLabs_DevTech',
  /** Client administrative staff */
  ClientAdministrative = 'Client_Administrative',
  /** Client Dev/Tech staff */
  ClientDevTech = 'Client_DevTech',
  /** Generic client staff */
  ClientOther = 'Client_Other',
  /** Administrative staff */
  FyeLabsAdministrative = 'FyeLabs_Administrative',
  /** PRE staff */
  FyeLabsPre = 'FyeLabs_PRE',
  /** Management staff */
  FyeLabsManagement = 'FyeLabs_Management',
  /** Client management staff */
  ClientManagement = 'Client_Management'
}

/** Timezone entity */
export type Timezone = {
  __typename?: 'Timezone';
  /** Timezone value */
  value: Scalars['String'];
};

/** Country entity */
export type Country = {
  __typename?: 'Country';
  /** Country value */
  value: Scalars['String'];
};

/** Company entity */
export type Company = {
  __typename?: 'Company';
  /** Company address */
  address?: Maybe<Scalars['String']>;
  /** Company city */
  city?: Maybe<Scalars['String']>;
  /** Contacts assigned to company */
  contacts: Array<Contact>;
  /** Company country */
  country?: Maybe<Scalars['String']>;
  /** Company creation time */
  created: Scalars['DateTime'];
  /** Company currency */
  currency: Scalars['String'];
  /** Company email address */
  email?: Maybe<Scalars['String']>;
  /** Company label */
  label: Scalars['String'];
  /** Company name */
  name: Scalars['String'];
  /** Permission required to access company */
  permission: Array<Scalars['String']>;
  /** Company phone number */
  phone?: Maybe<Scalars['String']>;
  /** Company postal/zip code */
  postal?: Maybe<Scalars['String']>;
  /** Company province/state/region */
  region?: Maybe<Scalars['String']>;
  /** Company update time */
  updated: Scalars['DateTime'];
  /** Company unique identifier */
  uuid: Scalars['ID'];
  /** Company website */
  website?: Maybe<Scalars['String']>;
};


/** Company entity */
export type CompanyCurrencyArgs = {
  currency?: Maybe<CompanyCurrencyEnum>;
};


/** Company entity */
export type CompanyLabelArgs = {
  label?: Maybe<CompanyLabelEnum>;
};


/** Company entity */
export type CompanyPermissionArgs = {
  permission?: Maybe<ContactAuthorizedTypeEnum>;
};

/** Nexus mutations */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new company. */
  companyCreate: Company;
  /** Delete a company. */
  companyDeleteByUUID: MutationResult;
  /** Update an existing company. */
  companyUpdateByUUID: Company;
  /** Create a new contact. */
  contactCreate: Contact;
  /** Delete a contact. */
  contactDelete: MutationResult;
  /** Update an existing contact. */
  contactUpdate: Contact;
  /** Create a new salary. */
  salaryCreate: Salary;
  /** Delete a salary. */
  salaryDelete: MutationResult;
  /** Update an existing salary. */
  salaryUpdate: Salary;
};


/** Nexus mutations */
export type MutationCompanyCreateArgs = {
  address?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  currency: CompanyCurrencyEnum;
  label: CompanyLabelEnum;
  permission: Array<ContactAuthorizedTypeEnum>;
};


/** Nexus mutations */
export type MutationCompanyDeleteByUuidArgs = {
  uuid: Scalars['ID'];
};


/** Nexus mutations */
export type MutationCompanyUpdateByUuidArgs = {
  country?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  currency: CompanyCurrencyEnum;
  permission: Array<ContactAuthorizedTypeEnum>;
  name: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  label: CompanyLabelEnum;
  uuid: Scalars['ID'];
};


/** Nexus mutations */
export type MutationContactCreateArgs = {
  timezone?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['ID']>;
  salary?: Maybe<Scalars['ID']>;
  label: ContactLabelEnum;
  lastName?: Maybe<Scalars['String']>;
  authorizedType: ContactAuthorizedTypeEnum;
  firstName: Scalars['String'];
  website?: Maybe<Scalars['String']>;
  isInternal: Scalars['Boolean'];
  email: Scalars['String'];
  authID?: Maybe<Scalars['String']>;
};


/** Nexus mutations */
export type MutationContactDeleteArgs = {
  uuid: Scalars['ID'];
};


/** Nexus mutations */
export type MutationContactUpdateArgs = {
  authID?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['ID']>;
  authorizedType: ContactAuthorizedTypeEnum;
  website?: Maybe<Scalars['String']>;
  isInternal: Scalars['Boolean'];
  uuid: Scalars['ID'];
  email: Scalars['String'];
  label: ContactLabelEnum;
  salary?: Maybe<Scalars['ID']>;
};


/** Nexus mutations */
export type MutationSalaryCreateArgs = {
  rate: Scalars['Float'];
  permission: Array<ContactAuthorizedTypeEnum>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


/** Nexus mutations */
export type MutationSalaryDeleteArgs = {
  uuid: Scalars['ID'];
};


/** Nexus mutations */
export type MutationSalaryUpdateArgs = {
  permission: Array<ContactAuthorizedTypeEnum>;
  uuid: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  rate: Scalars['Float'];
};

/** Contact entity */
export type Contact = {
  __typename?: 'Contact';
  /** Token for authentication with SSO */
  authID?: Maybe<Scalars['String']>;
  /** Provided level of access */
  authorizedType: Scalars['String'];
  /** Company assigned to contact */
  company?: Maybe<Company>;
  /** Contact creation time */
  created: Scalars['DateTime'];
  /** Email address */
  email: Scalars['String'];
  /** First name */
  firstName: Scalars['String'];
  /** Indicator if contact is internal (FyeLabs) */
  isInternal: Scalars['Boolean'];
  /** Job title */
  jobTitle?: Maybe<Scalars['String']>;
  /** Contact label */
  label: Scalars['String'];
  /** Last name */
  lastName?: Maybe<Scalars['String']>;
  /** Phone number */
  phone?: Maybe<Scalars['String']>;
  /** Salary assigned to contact (for internal contacts) */
  salary?: Maybe<Salary>;
  /** Timezone */
  timezone?: Maybe<Scalars['String']>;
  /** Contact update time */
  updated: Scalars['DateTime'];
  /** Unique contact identifier */
  uuid: Scalars['ID'];
  /** Website */
  website?: Maybe<Scalars['String']>;
};


/** Contact entity */
export type ContactAuthorizedTypeArgs = {
  authorizedType?: Maybe<ContactAuthorizedTypeEnum>;
};


/** Contact entity */
export type ContactLabelArgs = {
  label?: Maybe<ContactLabelEnum>;
};

export enum ContactLabelEnum {
  /** Client technical contact */
  CustomerTechnical = 'Customer_Technical',
  /** Contractor administrative contact */
  ContractorAdministrative = 'Contractor_Administrative',
  /** Partner contact */
  Partner = 'Partner',
  /** Part time employee */
  EmployeePartTime = 'Employee_Part_Time',
  /** Terminated employee */
  EmployeeTerminated = 'Employee_Terminated',
  /** Customer administrative contact */
  CustomerAdministrative = 'Customer_Administrative',
  /** Vendor technical contact */
  VendorTechnical = 'Vendor_Technical',
  /** Contractor technical contact */
  ContractorTechnical = 'Contractor_Technical',
  /** Other contact */
  Other = 'Other',
  /** Management employee */
  EmployeeManagement = 'Employee_Management',
  /** Inactive/past employee */
  EmployeeInactive = 'Employee_Inactive',
  /** Vendor billing contact */
  VendorBilling = 'Vendor_Billing',
  /** Vendor management contact */
  VendorManagement = 'Vendor_Management',
  /** Contractor billing contact */
  ContractorBilling = 'Contractor_Billing',
  /** Lead contact */
  Lead = 'Lead',
  /** Intern employee */
  EmployeeIntern = 'Employee_Intern',
  /** Client billing contact */
  CustomerBilling = 'Customer_Billing',
  /** PRE employee */
  EmployeePre = 'Employee_PRE',
  /** Full time employee */
  EmployeeFullTime = 'Employee_Full_Time',
  /** Client management contact */
  CustomerManagement = 'Customer_Management',
  /** Vendor administrative contact */
  VendorAdministrative = 'Vendor_Administrative',
  /** Contractor management contact */
  ContractorManagement = 'Contractor_Management',
  /** Investor contact */
  Investor = 'Investor',
  /** System user */
  System = 'System',
  /** Administrative employee */
  EmployeeAdministrative = 'Employee_Administrative',
  /** Consultant contact */
  Consultant = 'Consultant'
}

/** Labels to classify a company */
export enum CompanyLabelEnum {
  /** Self is assignd to FyeLabs */
  Self = 'Self',
  /** Contractor company */
  Contractor = 'Contractor',
  /** Vendor company */
  Vendor = 'Vendor',
  /** Customer company */
  Customer = 'Customer',
  /** Hot lead, potential client */
  HotLead = 'Hot_Lead',
  /** Warm lead, potential client */
  WarmLead = 'Warm_Lead',
  /** Cold lead, potential client */
  ColdLead = 'Cold_Lead'
}

/** Nexus queries */
export type Query = {
  __typename?: 'Query';
  /** Queries companies. */
  companies: Array<Company>;
  /** Queries contacts. */
  contacts: Array<Contact>;
  /** Queries countries. */
  countries: Array<Country>;
  /** Queries salary. */
  salaries: Array<Salary>;
  /** Queries timezones. */
  timezones: Array<Timezone>;
};


/** Nexus queries */
export type QueryCompaniesArgs = {
  uuid?: Maybe<Scalars['ID']>;
};


/** Nexus queries */
export type QueryContactsArgs = {
  uuid?: Maybe<Scalars['ID']>;
  isInternal?: Maybe<Scalars['Boolean']>;
};


/** Nexus queries */
export type QuerySalariesArgs = {
  uuid?: Maybe<Scalars['ID']>;
};

/** Company currency */
export enum CompanyCurrencyEnum {
  /** Canadian dollar */
  Cad = 'CAD',
  /** United States dollar */
  Usd = 'USD'
}
