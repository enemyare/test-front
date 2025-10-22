export interface ApiResponse<T> {
  "data": T[],
  "page": number,
  "per_page": number,
  "total_pages": number,
  "offset": number,
  "limit": number,
  "total": number,
  "has_prev": boolean,
  "has_next": boolean,
}
