export interface FetchListResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalCount: number;
}

export interface FetchResponse<T> {
    message: string;
    data: T;
}

export interface Category {
    id: string;
    name: string;
}

export interface PostCategory {
    name: string;
}

export interface Sessions {
    id: string;
    name: string;
}

export interface Lessons {
    id: string;
    name: string;
    description: string;
    videoUrl: string;
    duration: string;
    sessionId: string;
}

export interface Course{
    id: string;
    name: string;
    description: string;
    price: number;
    level: string;
    category: string;
    thumbnailUrl: string;
    totalTime: string;
    numberOfLessons: number;
    averageRating: number;
}

export interface LoginData{
    email: string;
    password: string;
}

export interface RegisterData{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export interface IUserInformation {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    id: string;
 }

 export interface CartItems{
    courseId: string;
    courseName: string;
    courseThumbnail: string;
    price: number;
 }

 export interface CartInformation {
    id: string;
    total: number;
    itemCount: number;
    cartItems: CartItems[];
 }

 export interface ClientSceret {
    clientSecret: string;
 }

 export interface Enrollments {
    id: string;
    userName: string;
    course: Course;
    isCourseInGroup: boolean;
 }

 export interface CourseGroups {
    id: string;
    name: string;
 }

 export interface CourseGroup {
    id: string;
    name: string;
    enrollments: Enrollments[];
 }

 export interface AddToGroup{
    courseGroupId: string;
    enrollmentId: string;
 }

 export interface RemoveFromGroup{
    courseGroupId: string;
    enrollmentId: string;
 }

 export interface ProfileData{
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    dateOfBirth: string;
    phoneNumber: string;
    avatarUrl: string;
    backgroundUrl: string;
 }

 export interface Ratings {
    id: string;
    star: number;
    review: string;
    isEdit: boolean;
    user: UserData;
 }

 export interface UserData {
   id: string;
   userName: string;
   avatarUrl: string;
 }

 export interface CreateRatingData{
    star: number;
    review: string;
    courseId: string;
 }

 export interface EditRatingData{
   id: string;
   star: number;
   review: string;
 }

 export interface ResponseData {
   message: string;
   data: string;
 }

 export interface EmailOTPData {
   email: string;
 }

 export interface OTPData {
   otp: string;
 }

 export interface ResetPasswordData {
   password: string;
   confirmPassword: string;
 }

 export interface OrderItem {
   courseName: string;
   price: number;
 }

 export interface Orders {
   orderDate: string;
   totalPrice: number;
   orderItems: OrderItem[];
 }

 export interface Users {
   email: string;
   fullName: string;
   phoneNumber: string;
   dateOfBirth: string;
   avatarUrl: string;
   role: string;
 }

