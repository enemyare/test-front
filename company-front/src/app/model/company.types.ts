export type SortField = 'name' | 'type' | 'industry' | '';
export type DirectionType = 'asc' | 'desc';

export interface Company {
  "id": number,
  "uid": string,
  "business_name": string,
  "suffix": string,
  "industry": string,
  "type": string,
  "catch_phrase": string,
  "phone_number": string,
  "full_address": string,
  "latitude": number,
  "longitude": number,
  "logo": string
}

export interface CompanyFilters {
  name?: string;
  type?: string;
  industry?: string;
}

export interface SortState {
  field: SortField;
  direction: DirectionType;
}
