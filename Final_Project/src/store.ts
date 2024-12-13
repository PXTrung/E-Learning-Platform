import { create } from 'zustand'

// export interface QueryParams {
//    name: string;
//    category: string;
//    level: string;
//    page?: number; 
//    pageSize?: number; 
//  }
 
//  export interface Params extends QueryParams {
//    setName: (name: string) => void;
//    setCategory: (category: string) => void;
//    setLevel: (level: string) => void;
//    setPage: (page: number) => void;
//    setPageSize: (size: number) => void;
//  }

// interface ParamsState extends Params { 
//    setFilters: (filters: Params['filters']) => void; 
//    setSorts: (sorts: string) => void; 
//    setPage: (page: number) => void; 
//    setPageSize: (pageSize: number) => void; }

//  const useStore = create<Params>((set) =>({
//    name: "",
//    category: "",
//    level: "",
//    page: 1, 
//   pageSize: 2, 
//    setName: (name) => set({ name }),
//    setCategory: (category) => set({ category }),
//    setLevel: (level) => set({ level }),
//    setPage: (page) => set({ page }),
//    setPageSize: (size) => set({ pageSize: size }),
//  }));

const useStore = create<{
   courseQuery: {
     name: string;
     category: string;
     level: string;
     page: number;
     pageSize: number;
     setName: (name: string) => void;
     setCategory: (category: string) => void;
     setLevel: (level: string) => void;
     setPage: (page: number) => void;
     setPageSize: (pageSize: number) => void;
   };
   categoryQuery: {
     name: string;
     page: number;
     pageSize: number;
     setName: (name: string) => void;
     setPage: (page: number) => void;
     setPageSize: (pageSize: number) => void;
   };
   userQuery: {
     name: string;
     fullName: string;
     page: number;
     pageSize: number;
     setName: (name: string) => void;
     setFullName: (fullName: string) => void;
     setPage: (page: number) => void;
     setPageSize: (pageSize: number) => void;
   };
 }>((set) => ({
   courseQuery: {
     name: "",
     category: "",
     level: "",
     page: 1,
     pageSize: 6,
     setName: (name) => set((state) => ({ courseQuery: { ...state.courseQuery, name } })),
     setCategory: (category) =>
       set((state) => ({ courseQuery: { ...state.courseQuery, category } })),
     setLevel: (level) => set((state) => ({ courseQuery: { ...state.courseQuery, level } })),
     setPage: (page) => set((state) => ({ courseQuery: { ...state.courseQuery, page } })),
     setPageSize: (pageSize) =>
       set((state) => ({ courseQuery: { ...state.courseQuery, pageSize } })),
   },
   categoryQuery: {
     name: "",
     page: 1,
     pageSize: 10,
     setName: (name) => set((state) => ({ categoryQuery: { ...state.categoryQuery, name } })),
     setPage: (page) => set((state) => ({ categoryQuery: { ...state.categoryQuery, page } })),
     setPageSize: (pageSize) =>
       set((state) => ({ categoryQuery: { ...state.categoryQuery, pageSize } })),
   },
   userQuery: {
     name: "",
     fullName: "",
     page: 1,
     pageSize: 10,
     setName: (name) => set((state) => ({ userQuery: { ...state.userQuery, name } })),
     setFullName: (fullName) => set((state) => ({userQuery: {...state.userQuery, fullName}})),
     setPage: (page) => set((state) => ({ userQuery: { ...state.userQuery, page } })),
     setPageSize: (pageSize) =>
       set((state) => ({ userQuery: { ...state.userQuery, pageSize } })),
   },
 }));

 export default useStore;