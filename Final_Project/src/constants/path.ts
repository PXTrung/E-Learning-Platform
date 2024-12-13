const PARAMETER = {
    ID: ":id",
    COURSEID: ":courseId",
    SESSIONID: ":sessionId",
    CATEGORY: ":category",
    VALUE: ":value",
};

const PATHS = {
    HOME: {
        IDENTITY: "home",
        COURSE: `${PARAMETER.ID}`,
        LEARNING: `course/${PARAMETER.COURSEID}/learning/${PARAMETER.ID}`,
        CART: `cart`,
        CHECKOUT: `checkout`,
        COMPLETED: `complete`,
    },
    ADMIN: {
        IDENTITY: "admin",
        CATEGORY: "category",
        LEVEL: "level",
        USER: "user",
        COURSE: "course",
        DETAILS: `${PARAMETER.ID}`,
    },
    AUTH: {
        IDENTITY: "auth",
        LOGIN: "login",
        REGISTER: "register",
    },
    PROFILE: {
        IDENTITY: "profile",
        COURSES: "courses",
        DETAILS: "details",
        COURSEGROUP: "courseGroup",
        SETTING: "settings"
    },
}

export {PARAMETER, PATHS};