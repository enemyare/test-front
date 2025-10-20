import {Company} from './company.interface';

export interface ApiResponse<T> {
  "data": Company[],
  "page": number,
  "per_page": number,
  "total_pages": number,
  "offset": number,
  "limit": number,
  "total": number,
  "has_prev": boolean,
  "has_next": boolean,
}
