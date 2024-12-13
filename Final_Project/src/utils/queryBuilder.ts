
export interface BaseQueryParams {
    name?: string;
    page?: number;
    pageSize?: number;
  }
  
  export interface CourseQueryParams extends BaseQueryParams {
    category?: string;
    level?: string;
  }

  export interface userQueryParams extends BaseQueryParams {
    fullName?: string;
  }
  
  type QueryParams = CourseQueryParams | userQueryParams | BaseQueryParams;

// export const queryBuilder = (params: QueryParams): string => {
//     const filters: string[] = [];

//     if (params.name) {
//       filters.push(`name@=*${params.name}`); // Case-insensitive contains
//     }
  
//     if (params.category && params.category != "All") {
//       filters.push(`category==${params.category}`);
//     }
  
//     if (params.level && params.level != "All") {
//       filters.push(`level==${params.level}`);
//     }
  
//     // Join filters with a semicolon (,), as required by Sieve
//     const filterQuery = filters.length > 0 ? `Filters=${filters.join(",")}` : "";

//     // Add Pagination
//   const paginationQuery = [
//     params.page ? `Page=${params.page}` : "",
//     params.pageSize ? `PageSize=${params.pageSize}` : "",
//   ]
//     .filter(Boolean) // Remove empty strings
//     .join("&");

//   // Combine filter and pagination queries
//   const queryParts = [filterQuery, paginationQuery].filter(Boolean).join("&");

  
//     return queryParts;
//   };

export const queryBuilder = (filters: QueryParams): string => {
    const filterParts: string[] = [];

    if("fullName" in filters && filters.fullName){
      filterParts.push(`fullName@=*${filters.fullName}`)
    }
  
    if (filters.name) {
      filterParts.push(`name@=*${filters.name}`);
    }
  
    if ("category" in filters && filters.category && filters.category != "All") {
      filterParts.push(`category==${filters.category}`);
    }
  
    if ("level" in filters && filters.level && filters.level != "All") {
      filterParts.push(`level==${filters.level}`);
    }
  
    const filterQuery = filterParts.length > 0 ? `Filters=${filterParts.join(",")}` : "";
  
    const paginationQuery = [
      filters.page ? `Page=${filters.page}` : "",
      filters.pageSize ? `PageSize=${filters.pageSize}` : "",
    ]
      .filter(Boolean)
      .join("&");
  
    return [filterQuery, paginationQuery].filter(Boolean).join("&");
  };