/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type About = {
  __typename?: 'About';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  csr?: Maybe<ComponentAboutCsr>;
  documentId: Scalars['ID']['output'];
  heroImage?: Maybe<UploadFile>;
  landing?: Maybe<ComponentGeneralSection>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<About>>;
  localizations_connection?: Maybe<AboutRelationResponseCollection>;
  mission?: Maybe<ComponentGeneralSection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  values?: Maybe<ComponentAboutValues>;
  vision?: Maybe<ComponentAboutVision>;
  whyUs?: Maybe<ComponentAboutWhyChooseUs>;
};

export type AboutInput = {
  csr?: InputMaybe<ComponentAboutCsrInput>;
  heroImage?: InputMaybe<Scalars['ID']['input']>;
  landing?: InputMaybe<ComponentGeneralSectionInput>;
  mission?: InputMaybe<ComponentGeneralSectionInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<ComponentAboutValuesInput>;
  vision?: InputMaybe<ComponentAboutVisionInput>;
  whyUs?: InputMaybe<ComponentAboutWhyChooseUsInput>;
};

export type AboutRelationResponseCollection = {
  __typename?: 'AboutRelationResponseCollection';
  nodes: Array<About>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Brand = {
  __typename?: 'Brand';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Brand>>;
  localizations_connection?: Maybe<BrandRelationResponseCollection>;
  logo?: Maybe<UploadFile>;
  name: Scalars['String']['output'];
  offerings: Array<Maybe<Offering>>;
  offerings_connection?: Maybe<OfferingRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type BrandLocalizationsArgs = {
  filters?: InputMaybe<BrandFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BrandLocalizations_ConnectionArgs = {
  filters?: InputMaybe<BrandFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BrandOfferingsArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type BrandOfferings_ConnectionArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BrandEntityResponseCollection = {
  __typename?: 'BrandEntityResponseCollection';
  nodes: Array<Brand>;
  pageInfo: Pagination;
};

export type BrandFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BrandFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<JsonFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BrandFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<BrandFiltersInput>;
  offerings?: InputMaybe<OfferingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BrandFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BrandInput = {
  description?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offerings?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type BrandRelationResponseCollection = {
  __typename?: 'BrandRelationResponseCollection';
  nodes: Array<Brand>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Category>>;
  localizations_connection?: Maybe<CategoryRelationResponseCollection>;
  name?: Maybe<Scalars['String']['output']>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryLocalizationsArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CategoryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  nodes: Array<Category>;
  pageInfo: Pagination;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<CategoryFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryRelationResponseCollection = {
  __typename?: 'CategoryRelationResponseCollection';
  nodes: Array<Category>;
};

export type Certificate = {
  __typename?: 'Certificate';
  audit_report?: Maybe<UploadFile>;
  certificate?: Maybe<UploadFile>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  documentId: Scalars['ID']['output'];
  logo?: Maybe<UploadFile>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CertificateEntityResponseCollection = {
  __typename?: 'CertificateEntityResponseCollection';
  nodes: Array<Certificate>;
  pageInfo: Pagination;
};

export type CertificateFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CertificateFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<JsonFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CertificateFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CertificateFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CertificateInput = {
  audit_report?: InputMaybe<Scalars['ID']['input']>;
  certificate?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  logo?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ComponentAboutCsr = {
  __typename?: 'ComponentAboutCsr';
  goals?: Maybe<Array<Maybe<ComponentGeneralPointWithIcon>>>;
  id: Scalars['ID']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentAboutCsrGoalsArgs = {
  filters?: InputMaybe<ComponentGeneralPointWithIconFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentAboutCsrInput = {
  goals?: InputMaybe<Array<InputMaybe<ComponentGeneralPointWithIconInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentAboutValues = {
  __typename?: 'ComponentAboutValues';
  general?: Maybe<ComponentGeneralSection>;
  id: Scalars['ID']['output'];
  values?: Maybe<Array<Maybe<ComponentGeneralGoals>>>;
};


export type ComponentAboutValuesValuesArgs = {
  filters?: InputMaybe<ComponentGeneralGoalsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentAboutValuesInput = {
  general?: InputMaybe<ComponentGeneralSectionInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  values?: InputMaybe<Array<InputMaybe<ComponentGeneralGoalsInput>>>;
};

export type ComponentAboutVision = {
  __typename?: 'ComponentAboutVision';
  general?: Maybe<ComponentGeneralSection>;
  goals?: Maybe<Array<Maybe<ComponentGeneralGoals>>>;
  id: Scalars['ID']['output'];
};


export type ComponentAboutVisionGoalsArgs = {
  filters?: InputMaybe<ComponentGeneralGoalsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentAboutVisionInput = {
  general?: InputMaybe<ComponentGeneralSectionInput>;
  goals?: InputMaybe<Array<InputMaybe<ComponentGeneralGoalsInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentAboutWhyChooseUs = {
  __typename?: 'ComponentAboutWhyChooseUs';
  general?: Maybe<ComponentGeneralSection>;
  id: Scalars['ID']['output'];
  points?: Maybe<Array<Maybe<ComponentAboutWhyUs>>>;
};


export type ComponentAboutWhyChooseUsPointsArgs = {
  filters?: InputMaybe<ComponentAboutWhyUsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentAboutWhyChooseUsInput = {
  general?: InputMaybe<ComponentGeneralSectionInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  points?: InputMaybe<Array<InputMaybe<ComponentAboutWhyUsInput>>>;
};

export type ComponentAboutWhyUs = {
  __typename?: 'ComponentAboutWhyUs';
  iconName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<UploadFile>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentAboutWhyUsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAboutWhyUsFiltersInput>>>;
  iconName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAboutWhyUsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAboutWhyUsFiltersInput>>>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentAboutWhyUsInput = {
  iconName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentDatesBrandGradeSpec = {
  __typename?: 'ComponentDatesBrandGradeSpec';
  grade: Enum_Componentdatesbrandgradespec_Grade;
  id: Scalars['ID']['output'];
  pack_options: Array<Maybe<PackOption>>;
  pack_options_connection?: Maybe<PackOptionRelationResponseCollection>;
  sizes: Enum_Componentdatesbrandgradespec_Sizes;
};


export type ComponentDatesBrandGradeSpecPack_OptionsArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentDatesBrandGradeSpecPack_Options_ConnectionArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentDatesBrandGradeSpecFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentDatesBrandGradeSpecFiltersInput>>>;
  grade?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDatesBrandGradeSpecFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentDatesBrandGradeSpecFiltersInput>>>;
  pack_options?: InputMaybe<PackOptionFiltersInput>;
  sizes?: InputMaybe<StringFilterInput>;
};

export type ComponentDatesBrandGradeSpecInput = {
  grade?: InputMaybe<Enum_Componentdatesbrandgradespec_Grade>;
  id?: InputMaybe<Scalars['ID']['input']>;
  pack_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  sizes?: InputMaybe<Enum_Componentdatesbrandgradespec_Sizes>;
};

export type ComponentDatesGradeWrapper = {
  __typename?: 'ComponentDatesGradeWrapper';
  date_grades: Array<Maybe<DateGrade>>;
  date_grades_connection?: Maybe<DateGradeRelationResponseCollection>;
  id: Scalars['ID']['output'];
};


export type ComponentDatesGradeWrapperDate_GradesArgs = {
  filters?: InputMaybe<DateGradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentDatesGradeWrapperDate_Grades_ConnectionArgs = {
  filters?: InputMaybe<DateGradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentDatesMixComposition = {
  __typename?: 'ComponentDatesMixComposition';
  class: Enum_Componentdatesmixcomposition_Class;
  id: Scalars['ID']['output'];
  percentage: Scalars['Int']['output'];
};

export type ComponentDatesMixCompositionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentDatesMixCompositionFiltersInput>>>;
  class?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDatesMixCompositionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentDatesMixCompositionFiltersInput>>>;
  percentage?: InputMaybe<IntFilterInput>;
};

export type ComponentDatesMixCompositionInput = {
  class?: InputMaybe<Enum_Componentdatesmixcomposition_Class>;
  id?: InputMaybe<Scalars['ID']['input']>;
  percentage?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentDatesSizeSpecs = {
  __typename?: 'ComponentDatesSizeSpecs';
  class: Enum_Componentdatessizespecs_Class;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  weightMaxG?: Maybe<Scalars['Float']['output']>;
  weightMinG: Scalars['Float']['output'];
};

export type ComponentDatesSizeSpecsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentDatesSizeSpecsFiltersInput>>>;
  class?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentDatesSizeSpecsFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentDatesSizeSpecsFiltersInput>>>;
  weightMaxG?: InputMaybe<FloatFilterInput>;
  weightMinG?: InputMaybe<FloatFilterInput>;
};

export type ComponentDatesSizeSpecsInput = {
  class?: InputMaybe<Enum_Componentdatessizespecs_Class>;
  id?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  weightMaxG?: InputMaybe<Scalars['Float']['input']>;
  weightMinG?: InputMaybe<Scalars['Float']['input']>;
};

export type ComponentGeneralGoals = {
  __typename?: 'ComponentGeneralGoals';
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralGoalsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralGoalsFiltersInput>>>;
  not?: InputMaybe<ComponentGeneralGoalsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralGoalsFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  value?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralGoalsInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralHeader = {
  __typename?: 'ComponentGeneralHeader';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ComponentGeneralHeaderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralLink = {
  __typename?: 'ComponentGeneralLink';
  href: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
};

export type ComponentGeneralLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkFiltersInput>>>;
};

export type ComponentGeneralLinkInput = {
  href?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralPointWithIcon = {
  __typename?: 'ComponentGeneralPointWithIcon';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralPointWithIconFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralPointWithIconFiltersInput>>>;
  icon?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentGeneralPointWithIconFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralPointWithIconFiltersInput>>>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentGeneralPointWithIconInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentGeneralSection = {
  __typename?: 'ComponentGeneralSection';
  id: Scalars['ID']['output'];
  image?: Maybe<UploadFile>;
  subtitle?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentGeneralSectionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentHomepageHeroSlide = {
  __typename?: 'ComponentHomepageHeroSlide';
  ctaPrimary?: Maybe<Scalars['String']['output']>;
  ctaSecondary?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image: UploadFile;
  primaryLink?: Maybe<Scalars['String']['output']>;
  secondaryLink?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ComponentHomepageHeroSlideFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentHomepageHeroSlideFiltersInput>>>;
  ctaPrimary?: InputMaybe<StringFilterInput>;
  ctaSecondary?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentHomepageHeroSlideFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentHomepageHeroSlideFiltersInput>>>;
  primaryLink?: InputMaybe<StringFilterInput>;
  secondaryLink?: InputMaybe<StringFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentHomepageHeroSlideInput = {
  ctaPrimary?: InputMaybe<Scalars['String']['input']>;
  ctaSecondary?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  primaryLink?: InputMaybe<Scalars['String']['input']>;
  secondaryLink?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentHomepageMapSection = {
  __typename?: 'ComponentHomepageMapSection';
  countryToContinent?: Maybe<Scalars['JSON']['output']>;
  countryToIso?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  exportedCountries?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentHomepageMapSectionInput = {
  countryToContinent?: InputMaybe<Scalars['JSON']['input']>;
  countryToIso?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  exportedCountries?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentProductsPackOption = {
  __typename?: 'ComponentProductsPackOption';
  amount: Scalars['Float']['output'];
  amountMax?: Maybe<Scalars['Int']['output']>;
  amountMin?: Maybe<Scalars['Float']['output']>;
  gradeConstraint?: Maybe<Enum_Componentproductspackoption_Gradeconstraint>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  packagingNote?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Enum_Componentproductspackoption_Unit>;
};

export type ContactUs = {
  __typename?: 'ContactUs';
  contactDetails?: Maybe<Array<Maybe<ComponentGeneralPointWithIcon>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  hero?: Maybe<ComponentGeneralHeader>;
  logo?: Maybe<UploadFile>;
  mapsUrl?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ContactUsContactDetailsArgs = {
  filters?: InputMaybe<ComponentGeneralPointWithIconFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContactUsInput = {
  contactDetails?: InputMaybe<Array<InputMaybe<ComponentGeneralPointWithIconInput>>>;
  hero?: InputMaybe<ComponentGeneralHeaderInput>;
  logo?: InputMaybe<Scalars['ID']['input']>;
  mapsUrl?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Customer = {
  __typename?: 'Customer';
  company?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  isSubscriber?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderRelationResponseCollection>;
  phone?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CustomerOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CustomerOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CustomerEntityResponseCollection = {
  __typename?: 'CustomerEntityResponseCollection';
  nodes: Array<Customer>;
  pageInfo: Pagination;
};

export type CustomerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CustomerFiltersInput>>>;
  company?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  isSubscriber?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CustomerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CustomerFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  phone?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CustomerInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isSubscriber?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  phone?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateGrade = {
  __typename?: 'DateGrade';
  classType?: Maybe<Enum_Dategrade_Classtype>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  grade: Enum_Dategrade_Grade;
  gradeName: Enum_Dategrade_Gradename;
  looseSkinMaxPct?: Maybe<Scalars['Int']['output']>;
  looseSkinMinPct: Scalars['Int']['output'];
  mixComposition: Array<Maybe<ComponentDatesMixComposition>>;
  pack_options: Array<Maybe<PackOption>>;
  pack_options_connection?: Maybe<PackOptionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sizeSpecs: Array<Maybe<ComponentDatesSizeSpecs>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type DateGradeMixCompositionArgs = {
  filters?: InputMaybe<ComponentDatesMixCompositionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DateGradePack_OptionsArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DateGradePack_Options_ConnectionArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type DateGradeSizeSpecsArgs = {
  filters?: InputMaybe<ComponentDatesSizeSpecsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DateGradeEntityResponseCollection = {
  __typename?: 'DateGradeEntityResponseCollection';
  nodes: Array<DateGrade>;
  pageInfo: Pagination;
};

export type DateGradeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DateGradeFiltersInput>>>;
  classType?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  grade?: InputMaybe<StringFilterInput>;
  gradeName?: InputMaybe<StringFilterInput>;
  looseSkinMaxPct?: InputMaybe<IntFilterInput>;
  looseSkinMinPct?: InputMaybe<IntFilterInput>;
  mixComposition?: InputMaybe<ComponentDatesMixCompositionFiltersInput>;
  not?: InputMaybe<DateGradeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DateGradeFiltersInput>>>;
  pack_options?: InputMaybe<PackOptionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sizeSpecs?: InputMaybe<ComponentDatesSizeSpecsFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DateGradeInput = {
  classType?: InputMaybe<Enum_Dategrade_Classtype>;
  grade?: InputMaybe<Enum_Dategrade_Grade>;
  gradeName?: InputMaybe<Enum_Dategrade_Gradename>;
  looseSkinMaxPct?: InputMaybe<Scalars['Int']['input']>;
  looseSkinMinPct?: InputMaybe<Scalars['Int']['input']>;
  mixComposition?: InputMaybe<Array<InputMaybe<ComponentDatesMixCompositionInput>>>;
  pack_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sizeSpecs?: InputMaybe<Array<InputMaybe<ComponentDatesSizeSpecsInput>>>;
};

export type DateGradeRelationResponseCollection = {
  __typename?: 'DateGradeRelationResponseCollection';
  nodes: Array<DateGrade>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse';
  documentId: Scalars['ID']['output'];
};

export type Enum_Componentdatesbrandgradespec_Grade =
  | 'Grade_1_Premium'
  | 'Grade_2'
  | 'Grade_3'
  | 'Mixed';

export type Enum_Componentdatesbrandgradespec_Sizes =
  | 'Any'
  | 'Jumbo'
  | 'Large'
  | 'Medium'
  | 'Small';

export type Enum_Componentdatesmixcomposition_Class =
  | 'Jumbo'
  | 'Large'
  | 'Medium'
  | 'Small';

export type Enum_Componentdatessizespecs_Class =
  | 'Jumbo'
  | 'Large'
  | 'Medium'
  | 'Small';

export type Enum_Componentproductspackoption_Gradeconstraint =
  | 'Grade_1_premium_jumbo'
  | 'Premium_large_medium'
  | 'Premium_medium_only'
  | 'Small_premium_or_grade_3';

export type Enum_Componentproductspackoption_Unit =
  | 'L'
  | 'g'
  | 'kg'
  | 'ml';

export type Enum_Dategrade_Classtype =
  | 'Mixed'
  | 'Sized';

export type Enum_Dategrade_Grade =
  | 'Grade_1'
  | 'Grade_2'
  | 'Grade_3'
  | 'Grade_4';

export type Enum_Dategrade_Gradename =
  | 'Mixed'
  | 'Premium';

export type Enum_Offering_Availability =
  | 'no'
  | 'yes';

export type Enum_Order_Status =
  | 'cancelled'
  | 'confirmed'
  | 'delivered'
  | 'pending'
  | 'processing'
  | 'shipped';

export type Enum_Packoption_Applicable_Sizes =
  | 'Any'
  | 'Jumbo'
  | 'Large'
  | 'Medium'
  | 'Small';

export type Enum_Packoption_Unit =
  | 'bunch'
  | 'g'
  | 'kg'
  | 'l'
  | 'ml';

export type Enum_Product_Baseunittype =
  | 'count'
  | 'volume'
  | 'weight';

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type Footer = {
  __typename?: 'Footer';
  address?: Maybe<Scalars['String']['output']>;
  brandDescription: Scalars['String']['output'];
  brandName: Scalars['String']['output'];
  copyrightText?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  legalLinks?: Maybe<Array<Maybe<ComponentGeneralLink>>>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Footer>>;
  localizations_connection?: Maybe<FooterRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  quickLinks?: Maybe<Array<Maybe<ComponentGeneralLink>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type FooterLegalLinksArgs = {
  filters?: InputMaybe<ComponentGeneralLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type FooterQuickLinksArgs = {
  filters?: InputMaybe<ComponentGeneralLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FooterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  brandDescription?: InputMaybe<Scalars['String']['input']>;
  brandName?: InputMaybe<Scalars['String']['input']>;
  copyrightText?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  legalLinks?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  quickLinks?: InputMaybe<Array<InputMaybe<ComponentGeneralLinkInput>>>;
};

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection';
  nodes: Array<Footer>;
};

export type GenericMorph = About | Brand | Category | Certificate | ComponentAboutCsr | ComponentAboutValues | ComponentAboutVision | ComponentAboutWhyChooseUs | ComponentAboutWhyUs | ComponentDatesBrandGradeSpec | ComponentDatesGradeWrapper | ComponentDatesMixComposition | ComponentDatesSizeSpecs | ComponentGeneralGoals | ComponentGeneralHeader | ComponentGeneralLink | ComponentGeneralPointWithIcon | ComponentGeneralSection | ComponentHomepageHeroSlide | ComponentHomepageMapSection | ComponentProductsPackOption | ContactUs | Customer | DateGrade | Footer | Homepage | I18NLocale | Offering | Order | PackOption | Product | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type Homepage = {
  __typename?: 'Homepage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  hero?: Maybe<Array<Maybe<ComponentHomepageHeroSlide>>>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Homepage>>;
  localizations_connection?: Maybe<HomepageRelationResponseCollection>;
  map?: Maybe<ComponentHomepageMapSection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  qualityMarketing?: Maybe<ComponentAboutWhyChooseUs>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type HomepageHeroArgs = {
  filters?: InputMaybe<ComponentHomepageHeroSlideFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HomepageInput = {
  hero?: InputMaybe<Array<InputMaybe<ComponentHomepageHeroSlideInput>>>;
  map?: InputMaybe<ComponentHomepageMapSectionInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  qualityMarketing?: InputMaybe<ComponentAboutWhyChooseUsInput>;
};

export type HomepageRelationResponseCollection = {
  __typename?: 'HomepageRelationResponseCollection';
  nodes: Array<Homepage>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createBrand?: Maybe<Brand>;
  createCategory?: Maybe<Category>;
  createCertificate?: Maybe<Certificate>;
  createCustomer?: Maybe<Customer>;
  createDateGrade?: Maybe<DateGrade>;
  createOffering?: Maybe<Offering>;
  createOrder?: Maybe<Order>;
  createPackOption?: Maybe<PackOption>;
  createProduct?: Maybe<Product>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAbout?: Maybe<DeleteMutationResponse>;
  deleteBrand?: Maybe<DeleteMutationResponse>;
  deleteCategory?: Maybe<DeleteMutationResponse>;
  deleteCertificate?: Maybe<DeleteMutationResponse>;
  deleteContactUs?: Maybe<DeleteMutationResponse>;
  deleteCustomer?: Maybe<DeleteMutationResponse>;
  deleteDateGrade?: Maybe<DeleteMutationResponse>;
  deleteFooter?: Maybe<DeleteMutationResponse>;
  deleteHomepage?: Maybe<DeleteMutationResponse>;
  deleteOffering?: Maybe<DeleteMutationResponse>;
  deleteOrder?: Maybe<DeleteMutationResponse>;
  deletePackOption?: Maybe<DeleteMutationResponse>;
  deleteProduct?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAbout?: Maybe<About>;
  updateBrand?: Maybe<Brand>;
  updateCategory?: Maybe<Category>;
  updateCertificate?: Maybe<Certificate>;
  updateContactUs?: Maybe<ContactUs>;
  updateCustomer?: Maybe<Customer>;
  updateDateGrade?: Maybe<DateGrade>;
  updateFooter?: Maybe<Footer>;
  updateHomepage?: Maybe<Homepage>;
  updateOffering?: Maybe<Offering>;
  updateOrder?: Maybe<Order>;
  updatePackOption?: Maybe<PackOption>;
  updateProduct?: Maybe<Product>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateBrandArgs = {
  data: BrandInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCertificateArgs = {
  data: CertificateInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateCustomerArgs = {
  data: CustomerInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateDateGradeArgs = {
  data: DateGradeInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOfferingArgs = {
  data: OfferingInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePackOptionArgs = {
  data: PackOptionInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteAboutArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteBrandArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCategoryArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteCertificateArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteCustomerArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteDateGradeArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteOfferingArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteOrderArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePackOptionArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteProductArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAboutArgs = {
  data: AboutInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateBrandArgs = {
  data: BrandInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCertificateArgs = {
  data: CertificateInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateContactUsArgs = {
  data: ContactUsInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateCustomerArgs = {
  data: CustomerInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateDateGradeArgs = {
  data: DateGradeInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateHomepageArgs = {
  data: HomepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOfferingArgs = {
  data: OfferingInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOrderArgs = {
  data: OrderInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePackOptionArgs = {
  data: PackOptionInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};

export type Offering = {
  __typename?: 'Offering';
  availability?: Maybe<Enum_Offering_Availability>;
  brand?: Maybe<Brand>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateSpecifications?: Maybe<Array<Maybe<ComponentDatesBrandGradeSpec>>>;
  documentId: Scalars['ID']['output'];
  images: Array<Maybe<UploadFile>>;
  images_connection: UploadFileRelationResponseCollection;
  isMedjoolDate?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Offering>>;
  localizations_connection?: Maybe<OfferingRelationResponseCollection>;
  pack_options: Array<Maybe<PackOption>>;
  pack_options_connection?: Maybe<PackOptionRelationResponseCollection>;
  product?: Maybe<Product>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OfferingDateSpecificationsArgs = {
  filters?: InputMaybe<ComponentDatesBrandGradeSpecFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingImagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingImages_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingLocalizationsArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingPack_OptionsArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OfferingPack_Options_ConnectionArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OfferingEntityResponseCollection = {
  __typename?: 'OfferingEntityResponseCollection';
  nodes: Array<Offering>;
  pageInfo: Pagination;
};

export type OfferingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OfferingFiltersInput>>>;
  availability?: InputMaybe<StringFilterInput>;
  brand?: InputMaybe<BrandFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateSpecifications?: InputMaybe<ComponentDatesBrandGradeSpecFiltersInput>;
  documentId?: InputMaybe<IdFilterInput>;
  isMedjoolDate?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OfferingFiltersInput>;
  not?: InputMaybe<OfferingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OfferingFiltersInput>>>;
  pack_options?: InputMaybe<PackOptionFiltersInput>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OfferingInput = {
  availability?: InputMaybe<Enum_Offering_Availability>;
  brand?: InputMaybe<Scalars['ID']['input']>;
  dateSpecifications?: InputMaybe<Array<InputMaybe<ComponentDatesBrandGradeSpecInput>>>;
  images?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isMedjoolDate?: InputMaybe<Scalars['Boolean']['input']>;
  pack_options?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OfferingRelationResponseCollection = {
  __typename?: 'OfferingRelationResponseCollection';
  nodes: Array<Offering>;
};

export type Order = {
  __typename?: 'Order';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customer?: Maybe<Customer>;
  customerCompany?: Maybe<Scalars['String']['output']>;
  customerEmail?: Maybe<Scalars['String']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  grade?: Maybe<Scalars['String']['output']>;
  isMedjoolDate?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  numberOfPackages?: Maybe<Scalars['Int']['output']>;
  offering?: Maybe<Offering>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  packOption?: Maybe<PackOption>;
  packaging?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Enum_Order_Status>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  totalShipmentSize?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderEntityResponseCollection = {
  __typename?: 'OrderEntityResponseCollection';
  nodes: Array<Order>;
  pageInfo: Pagination;
};

export type OrderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customer?: InputMaybe<CustomerFiltersInput>;
  customerCompany?: InputMaybe<StringFilterInput>;
  customerEmail?: InputMaybe<StringFilterInput>;
  customerName?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  grade?: InputMaybe<StringFilterInput>;
  isMedjoolDate?: InputMaybe<BooleanFilterInput>;
  message?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<OrderFiltersInput>;
  numberOfPackages?: InputMaybe<IntFilterInput>;
  offering?: InputMaybe<OfferingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  orderNumber?: InputMaybe<StringFilterInput>;
  packOption?: InputMaybe<PackOptionFiltersInput>;
  packaging?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  quantity?: InputMaybe<IntFilterInput>;
  size?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  totalPrice?: InputMaybe<FloatFilterInput>;
  totalShipmentSize?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderInput = {
  customer?: InputMaybe<Scalars['ID']['input']>;
  customerCompany?: InputMaybe<Scalars['String']['input']>;
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  grade?: InputMaybe<Scalars['String']['input']>;
  isMedjoolDate?: InputMaybe<Scalars['Boolean']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  numberOfPackages?: InputMaybe<Scalars['Int']['input']>;
  offering?: InputMaybe<Scalars['ID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  packOption?: InputMaybe<Scalars['ID']['input']>;
  packaging?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Enum_Order_Status>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  totalShipmentSize?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderSubmissionInput = {
  customerCompany?: InputMaybe<Scalars['String']['input']>;
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  grade?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  offering: Scalars['ID']['input'];
  packOption?: InputMaybe<Scalars['ID']['input']>;
  packaging?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
};

export type OrderRelationResponseCollection = {
  __typename?: 'OrderRelationResponseCollection';
  nodes: Array<Order>;
};

export type PackOption = {
  __typename?: 'PackOption';
  amount?: Maybe<Scalars['Float']['output']>;
  amountMax?: Maybe<Scalars['Float']['output']>;
  amountMin?: Maybe<Scalars['Float']['output']>;
  applicable_sizes?: Maybe<Enum_Packoption_Applicable_Sizes>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  date_grade?: Maybe<DateGrade>;
  displayLabel: Scalars['String']['output'];
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<PackOption>>;
  localizations_connection?: Maybe<PackOptionRelationResponseCollection>;
  note?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  unit: Enum_Packoption_Unit;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PackOptionLocalizationsArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PackOptionLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PackOptionEntityResponseCollection = {
  __typename?: 'PackOptionEntityResponseCollection';
  nodes: Array<PackOption>;
  pageInfo: Pagination;
};

export type PackOptionFiltersInput = {
  amount?: InputMaybe<FloatFilterInput>;
  amountMax?: InputMaybe<FloatFilterInput>;
  amountMin?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PackOptionFiltersInput>>>;
  applicable_sizes?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_grade?: InputMaybe<DateGradeFiltersInput>;
  displayLabel?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PackOptionFiltersInput>;
  not?: InputMaybe<PackOptionFiltersInput>;
  note?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<PackOptionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  unit?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PackOptionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  amountMax?: InputMaybe<Scalars['Float']['input']>;
  amountMin?: InputMaybe<Scalars['Float']['input']>;
  applicable_sizes?: InputMaybe<Enum_Packoption_Applicable_Sizes>;
  date_grade?: InputMaybe<Scalars['ID']['input']>;
  displayLabel?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  unit?: InputMaybe<Enum_Packoption_Unit>;
};

export type PackOptionRelationResponseCollection = {
  __typename?: 'PackOptionRelationResponseCollection';
  nodes: Array<PackOption>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Product = {
  __typename?: 'Product';
  baseUnitType?: Maybe<Enum_Product_Baseunittype>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  documentId: Scalars['ID']['output'];
  image?: Maybe<UploadFile>;
  isMedjoolDate?: Maybe<Scalars['Boolean']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Product>>;
  localizations_connection?: Maybe<ProductRelationResponseCollection>;
  minimumOrder?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  offerings: Array<Maybe<Offering>>;
  offerings_connection?: Maybe<OfferingRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ProductLocalizationsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductOfferingsArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductOfferings_ConnectionArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductEntityResponseCollection = {
  __typename?: 'ProductEntityResponseCollection';
  nodes: Array<Product>;
  pageInfo: Pagination;
};

export type ProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  baseUnitType?: InputMaybe<StringFilterInput>;
  category?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<JsonFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  isMedjoolDate?: InputMaybe<BooleanFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProductFiltersInput>;
  minimumOrder?: InputMaybe<IntFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProductFiltersInput>;
  offerings?: InputMaybe<OfferingFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductInput = {
  baseUnitType?: InputMaybe<Enum_Product_Baseunittype>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['JSON']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  isMedjoolDate?: InputMaybe<Scalars['Boolean']['input']>;
  minimumOrder?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offerings?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type ProductRelationResponseCollection = {
  __typename?: 'ProductRelationResponseCollection';
  nodes: Array<Product>;
};

export type PublicationStatus =
  | 'DRAFT'
  | 'PUBLISHED';

export type Query = {
  __typename?: 'Query';
  about?: Maybe<About>;
  brand?: Maybe<Brand>;
  brands: Array<Maybe<Brand>>;
  brands_connection?: Maybe<BrandEntityResponseCollection>;
  categories: Array<Maybe<Category>>;
  categories_connection?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<Category>;
  certificate?: Maybe<Certificate>;
  certificates: Array<Maybe<Certificate>>;
  certificates_connection?: Maybe<CertificateEntityResponseCollection>;
  contactUs?: Maybe<ContactUs>;
  customer?: Maybe<Customer>;
  customers: Array<Maybe<Customer>>;
  customers_connection?: Maybe<CustomerEntityResponseCollection>;
  dateGrade?: Maybe<DateGrade>;
  dateGrades: Array<Maybe<DateGrade>>;
  dateGrades_connection?: Maybe<DateGradeEntityResponseCollection>;
  footer?: Maybe<Footer>;
  homepage?: Maybe<Homepage>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  offering?: Maybe<Offering>;
  offerings: Array<Maybe<Offering>>;
  offerings_connection?: Maybe<OfferingEntityResponseCollection>;
  order?: Maybe<Order>;
  orders: Array<Maybe<Order>>;
  orders_connection?: Maybe<OrderEntityResponseCollection>;
  packOption?: Maybe<PackOption>;
  packOptions: Array<Maybe<PackOption>>;
  packOptions_connection?: Maybe<PackOptionEntityResponseCollection>;
  product?: Maybe<Product>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryAboutArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBrandArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBrandsArgs = {
  filters?: InputMaybe<BrandFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryBrands_ConnectionArgs = {
  filters?: InputMaybe<BrandFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategories_ConnectionArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCategoryArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCertificateArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCertificatesArgs = {
  filters?: InputMaybe<CertificateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCertificates_ConnectionArgs = {
  filters?: InputMaybe<CertificateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactUsArgs = {
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCustomerArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCustomersArgs = {
  filters?: InputMaybe<CustomerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryCustomers_ConnectionArgs = {
  filters?: InputMaybe<CustomerFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDateGradeArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDateGradesArgs = {
  filters?: InputMaybe<DateGradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryDateGrades_ConnectionArgs = {
  filters?: InputMaybe<DateGradeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOfferingArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOfferingsArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOfferings_ConnectionArgs = {
  filters?: InputMaybe<OfferingFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrderArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOrders_ConnectionArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPackOptionArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPackOptionsArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPackOptions_ConnectionArgs = {
  filters?: InputMaybe<PackOptionFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow';
  contentTypes: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection';
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  nodes: Array<UploadFile>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  nodes: Array<UsersPermissionsUser>;
};

export type AboutQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type AboutQuery = { __typename?: 'Query', about?: { __typename?: 'About', locale?: string | null, landing?: { __typename?: 'ComponentGeneralSection', id: string, title?: string | null, subtitle?: string | null, text?: any | null, image?: { __typename?: 'UploadFile', caption?: string | null, url: string, alternativeText?: string | null } | null } | null, whyUs?: { __typename?: 'ComponentAboutWhyChooseUs', general?: { __typename?: 'ComponentGeneralSection', text?: any | null, title?: string | null, subtitle?: string | null, image?: { __typename?: 'UploadFile', caption?: string | null, alternativeText?: string | null, url: string, width?: number | null } | null } | null, points?: Array<{ __typename?: 'ComponentAboutWhyUs', id: string, subtitle?: string | null, title?: string | null, iconName?: string | null } | null> | null } | null, csr?: { __typename?: 'ComponentAboutCsr', title?: string | null, subtitle?: string | null, text?: any | null, goals?: Array<{ __typename?: 'ComponentGeneralPointWithIcon', title?: string | null, id: string, subtitle?: string | null, icon?: string | null } | null> | null } | null, mission?: { __typename?: 'ComponentGeneralSection', id: string, title?: string | null, subtitle?: string | null, text?: any | null, image?: { __typename?: 'UploadFile', height?: number | null, name: string, url: string, width?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null, vision?: { __typename?: 'ComponentAboutVision', general?: { __typename?: 'ComponentGeneralSection', subtitle?: string | null, text?: any | null, title?: string | null, image?: { __typename?: 'UploadFile', caption?: string | null, alternativeText?: string | null, documentId: string, height?: number | null, name: string, size: number, url: string, width?: number | null } | null } | null, goals?: Array<{ __typename?: 'ComponentGeneralGoals', id: string, title?: string | null, value?: string | null } | null> | null } | null, values?: { __typename?: 'ComponentAboutValues', general?: { __typename?: 'ComponentGeneralSection', subtitle?: string | null, text?: any | null, title?: string | null, image?: { __typename?: 'UploadFile', alternativeText?: string | null, caption?: string | null, width?: number | null, url: string } | null } | null, values?: Array<{ __typename?: 'ComponentGeneralGoals', id: string, title?: string | null, value?: string | null } | null> | null } | null } | null };

export type CertificatesQueryVariables = Exact<{ [key: string]: never; }>;


export type CertificatesQuery = { __typename?: 'Query', certificates: Array<{ __typename?: 'Certificate', documentId: string, description?: any | null, name: string, audit_report?: { __typename?: 'UploadFile', alternativeText?: string | null, caption?: string | null, url: string } | null, certificate?: { __typename?: 'UploadFile', alternativeText?: string | null, caption?: string | null, formats?: any | null, name: string, url: string } | null, logo?: { __typename?: 'UploadFile', alternativeText?: string | null, caption?: string | null, formats?: any | null, url: string } | null } | null> };

export type FooterQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type FooterQuery = { __typename?: 'Query', footer?: { __typename?: 'Footer', brandName: string, brandDescription: string, address?: string | null, email?: string | null, copyrightText?: string | null, quickLinks?: Array<{ __typename?: 'ComponentGeneralLink', label: string, href: string } | null> | null, legalLinks?: Array<{ __typename?: 'ComponentGeneralLink', label: string, href: string } | null> | null } | null };

export type GetHomeDataQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetHomeDataQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', documentId: string, name: string, slug: string, description?: any | null, logo?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null>, homepage?: { __typename?: 'Homepage', qualityMarketing?: { __typename?: 'ComponentAboutWhyChooseUs', points?: Array<{ __typename?: 'ComponentAboutWhyUs', iconName?: string | null, subtitle?: string | null, title?: string | null, id: string } | null> | null, general?: { __typename?: 'ComponentGeneralSection', id: string, title?: string | null, text?: any | null, subtitle?: string | null, image?: { __typename?: 'UploadFile', alternativeText?: string | null, caption?: string | null, url: string } | null } | null } | null, hero?: Array<{ __typename?: 'ComponentHomepageHeroSlide', ctaPrimary?: string | null, ctaSecondary?: string | null, description?: string | null, id: string, primaryLink?: string | null, secondaryLink?: string | null, subtitle?: string | null, title: string, image: { __typename?: 'UploadFile', alternativeText?: string | null, url: string } } | null> | null, map?: { __typename?: 'ComponentHomepageMapSection', description?: string | null, exportedCountries?: string | null, countryToIso?: any | null, countryToContinent?: any | null, id: string, subtitle?: string | null, title?: string | null } | null } | null };

export type GetAllOfferingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOfferingsQuery = { __typename?: 'Query', offerings: Array<{ __typename?: 'Offering', documentId: string, availability?: Enum_Offering_Availability | null, isMedjoolDate?: boolean | null, pack_options: Array<{ __typename?: 'PackOption', amount?: number | null, documentId: string, displayLabel: string, unit: Enum_Packoption_Unit } | null>, brand?: { __typename?: 'Brand', name: string, slug: string, documentId: string, logo?: { __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null } | null, product?: { __typename?: 'Product', documentId: string, name: string, description?: any | null, category?: { __typename?: 'Category', name?: string | null, documentId: string } | null, image?: { __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null } | null, images: Array<{ __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null>, dateSpecifications?: Array<{ __typename?: 'ComponentDatesBrandGradeSpec', grade: Enum_Componentdatesbrandgradespec_Grade, sizes: Enum_Componentdatesbrandgradespec_Sizes, pack_options: Array<{ __typename?: 'PackOption', documentId: string, displayLabel: string, amount?: number | null, unit: Enum_Packoption_Unit, amountMin?: number | null, amountMax?: number | null, note?: string | null, applicable_sizes?: Enum_Packoption_Applicable_Sizes | null } | null> } | null> | null } | null> };

export type GetOfferingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOfferingQuery = { __typename?: 'Query', offering?: { __typename?: 'Offering', documentId: string, availability?: Enum_Offering_Availability | null, isMedjoolDate?: boolean | null, pack_options: Array<{ __typename?: 'PackOption', amount?: number | null, displayLabel: string, unit: Enum_Packoption_Unit, documentId: string } | null>, brand?: { __typename?: 'Brand', name: string, slug: string, documentId: string, logo?: { __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null } | null, product?: { __typename?: 'Product', documentId: string, name: string, description?: any | null, category?: { __typename?: 'Category', name?: string | null } | null, image?: { __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null } | null, images: Array<{ __typename?: 'UploadFile', documentId: string, alternativeText?: string | null, url: string, width?: number | null } | null>, dateSpecifications?: Array<{ __typename?: 'ComponentDatesBrandGradeSpec', grade: Enum_Componentdatesbrandgradespec_Grade, sizes: Enum_Componentdatesbrandgradespec_Sizes, pack_options: Array<{ __typename?: 'PackOption', documentId: string, displayLabel: string, amount?: number | null, unit: Enum_Packoption_Unit, amountMin?: number | null, amountMax?: number | null, note?: string | null, applicable_sizes?: Enum_Packoption_Applicable_Sizes | null } | null> } | null> | null } | null };

export type CreateOrderMutationVariables = Exact<{
  data: OrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', documentId: string, orderNumber?: string | null, status?: Enum_Order_Status | null, customer?: { __typename?: 'Customer', documentId: string, email: string } | null } | null };

export type SubmitOrderMutationVariables = Exact<{
  data: OrderSubmissionInput;
}>;


export type SubmitOrderMutation = { __typename?: 'Mutation', submitOrder?: { __typename?: 'Order', documentId: string, orderNumber?: string | null, status?: Enum_Order_Status | null, customer?: { __typename?: 'Customer', documentId: string, email: string } | null } | null };


export const AboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"About"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"about"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"landing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"whyUs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"general"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"points"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"csr"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vision"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"general"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"general"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AboutQuery, AboutQueryVariables>;
export const CertificatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"certificates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"audit_report"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"certificate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CertificatesQuery, CertificatesQueryVariables>;
export const FooterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Footer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"footer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brandName"}},{"kind":"Field","name":{"kind":"Name","value":"brandDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quickLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"legalLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}}]}},{"kind":"Field","name":{"kind":"Name","value":"copyrightText"}}]}}]}}]} as unknown as DocumentNode<FooterQuery, FooterQueryVariables>;
export const GetHomeDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brands"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"homepage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualityMarketing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"points"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"general"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hero"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ctaPrimary"}},{"kind":"Field","name":{"kind":"Name","value":"ctaSecondary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryLink"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryLink"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"map"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"exportedCountries"}},{"kind":"Field","name":{"kind":"Name","value":"countryToIso"}},{"kind":"Field","name":{"kind":"Name","value":"countryToContinent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomeDataQuery, GetHomeDataQueryVariables>;
export const GetAllOfferingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllOfferings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offerings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"availability"}},{"kind":"Field","name":{"kind":"Name","value":"isMedjoolDate"}},{"kind":"Field","name":{"kind":"Name","value":"pack_options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"displayLabel"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateSpecifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"pack_options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"displayLabel"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amountMin"}},{"kind":"Field","name":{"kind":"Name","value":"amountMax"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"applicable_sizes"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllOfferingsQuery, GetAllOfferingsQueryVariables>;
export const GetOfferingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOffering"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offering"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"availability"}},{"kind":"Field","name":{"kind":"Name","value":"isMedjoolDate"}},{"kind":"Field","name":{"kind":"Name","value":"pack_options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"displayLabel"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dateSpecifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"pack_options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"displayLabel"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"amountMin"}},{"kind":"Field","name":{"kind":"Name","value":"amountMax"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"applicable_sizes"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOfferingQuery, GetOfferingQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const SubmitOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderSubmissionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SubmitOrderMutation, SubmitOrderMutationVariables>;