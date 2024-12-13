
import { PARAMETER } from "./path";

// Define the base URL for the API
const API_BASE_URL = "https://localhost:7204/api/";

// Define functions to construct endpoint URLs
function constructEndpoint(endpoint: string) {
   return API_BASE_URL + endpoint;
}

// Define the endpoints
export const ENDPOINTS = {
    LOGIN: constructEndpoint("Auth/Login"),
    REGISTER: constructEndpoint("Auth/Register"),
    PROFILE: {
        CURRENT: constructEndpoint("Auth/Profile"),
        EDIT: constructEndpoint("Auth/UpdateProfile"),
        SENDEMAIL: constructEndpoint("Auth/SendEmailOTP"),
        CONFIRMOTP: constructEndpoint("Auth/ConfirmOTP"),
        RESETPASS: constructEndpoint("Auth/ResetPassword"),
        ALL: constructEndpoint("Auth/AllUsers"),
    },
    CATEGORY:{
        ALL: constructEndpoint("Categories"),
        BY_CATEGORY_ID: constructEndpoint(`Categories/${PARAMETER.ID}`)
    } ,
    COURSE: {
        ALL: constructEndpoint("Courses"),
        BY_ID: constructEndpoint(`Courses/${PARAMETER.ID}`)
    },
    SESSION: {
        ALL: constructEndpoint("Sessions"),
        BY_COURSE_ID: constructEndpoint(`Sessions/${PARAMETER.ID}`),
        BY_ID: constructEndpoint(`Sessions/GetById`),
    },
    LESSON: {
        ALL: constructEndpoint("Lessons"),
        BY_SESSION_ID: constructEndpoint(`Lessons/${PARAMETER.ID}`),
        BY_ID: constructEndpoint(`Lessons/GetById`),
    },
    CART: {
        ALL: constructEndpoint("Carts"),
    },
    PAYMENT: {
        ALL: constructEndpoint("Payments"),
        CREATE_PAYMENT_INTENT: constructEndpoint("Payments/create-payment-intent"),
        CONFIRM_ORDER: constructEndpoint("Payments/confirm-order"),
    },
    ENROLLMENT: {
        ALL: constructEndpoint("Enrollments"),
        ADD_TO_GROUP: constructEndpoint("Enrollments/add-enrollment"),
        REMOVE_FROM_GROUP: constructEndpoint("Enrollments/remove-enrollment"),
    },
    COURSEGROUP: {
        ALL: constructEndpoint("CourseGroups"),
    },
    RATING: {
        ALL: constructEndpoint("Ratings"),
        CREATE: constructEndpoint("Ratings/CreateRating"),
        EDIT: constructEndpoint("Ratings/EditRating"),
    },
    ORDER: {
        ALL: constructEndpoint("Orders"),
    }
}