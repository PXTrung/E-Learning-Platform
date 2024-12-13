using AutoMapper;
using E_LearningApi.Common.Enums;
using E_LearningApi.Data.Entities;
using E_LearningApi.DTOs.Auth;
using E_LearningApi.DTOs.Cart;
using E_LearningApi.DTOs.CartItem;
using E_LearningApi.DTOs.Category;
using E_LearningApi.DTOs.Course;
using E_LearningApi.DTOs.CourseGroup;
using E_LearningApi.DTOs.Enrollment;
using E_LearningApi.DTOs.Lesson;
using E_LearningApi.DTOs.Order;
using E_LearningApi.DTOs.Rating;
using E_LearningApi.DTOs.Session;

namespace E_LearningApi.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            // ====================================== Category =====================================================
            CreateMap<CreateCategoryRequest, Category>()
                .ForMember(des => des.Id, opt => opt.Ignore())
                .ForMember(des => des.CreatedAt, opt => opt.Ignore())
                .ForMember(des => des.UpdatedAt, opt => opt.Ignore());  

            CreateMap<UpdateCategoryRequest, Category>()
                .ForMember(des => des.Id, opt => opt.Ignore())
                .ForMember(des => des.CreatedAt, opt =>opt.Ignore())
                .ForMember(des => des.UpdatedAt, opt => opt.Ignore());

            CreateMap<Category, GetCategoryResponse>();
            CreateMap<Category, GetListCategories>();



            // ========================================= Course ===================================================
            CreateMap<CreateCourseRequest, Course>()
                .ForMember(des => des.Thumbnail, opt => opt.Ignore())
                .ForMember(dest => dest.Level, opt => opt.MapFrom(src => Enum.Parse<Levels>(src.Level, true)));

            CreateMap<UpdateCourseRequest, Course>()
                .ForMember(des => des.Id, opt => opt.Ignore())
                .ForMember(des => des.ThumbnailId, opt => opt.Ignore())
                .ForMember(des => des.Name, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)))
                .ForMember(des => des.Description, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Description)))
                .ForMember(des => des.Price, opt => opt.Condition(src => src.Price > 0))
                .ForMember(dest => dest.Level, opt => opt.MapFrom(src => Enum.Parse<Levels>(src.Level, true)));

            CreateMap<Course, GetCourseResponse>()
                .ForMember(des => des.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(des => des.ThumbnailUrl, opt => opt.MapFrom(src => src.Thumbnail.UrlFilePath));

            CreateMap<Course, GetListCourses>()
                .ForMember(des => des.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(des => des.ThumbnailUrl, opt => opt.MapFrom(src => src.Thumbnail.UrlFilePath));

            CreateMap<Course, CourseDto>()
                .ForMember(des => des.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(des => des.ThumbnailUrl, opt => opt.MapFrom(src => src.Thumbnail.UrlFilePath));


            //======================================= Session ============================================
            CreateMap<CreateSessionRequest, Session>()
                .ForMember(des => des.Id, opt => opt.Ignore())
                .ForMember(des => des.CreatedAt, opt => opt.Ignore())
                .ForMember(des => des.UpdatedAt, opt => opt.Ignore());

            CreateMap<UpdateSessionRequest, Session>()
                .ForMember(des => des.Id, opt => opt.Ignore())
                .ForMember(des => des.CreatedAt, opt => opt.Ignore())
                .ForMember(des => des.UpdatedAt, opt => opt.Ignore());

            CreateMap<Session, GetSessionResponse>();
            CreateMap<Session, GetListSessions>();


            //========================================== Lession =============================================
            CreateMap<CreateLessonRequest, Lesson>()
                .ForMember(des => des.Video, opt => opt.Ignore());

            CreateMap<UpdateLessonRequest, Lesson>()
                .ForMember(des => des.VideoId, opt => opt.Ignore())
                .ForMember(des => des.Name, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)))
                .ForMember(des => des.Description, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Description))); 
            
            CreateMap<Lesson, GetLessonResponse>()
                .ForMember(des => des.VideoUrl, opt => opt.MapFrom(src => src.Video.UrlFilePath))
                .ForMember(des => des.Session, opt => opt.MapFrom(src => src.Session.Name));

            CreateMap<Lesson, GetListLessons>()
                .ForMember(des => des.VideoUrl, opt => opt.MapFrom(src => src.Video.UrlFilePath))
                .ForMember(des => des.Session, opt => opt.MapFrom(src => src.Session.Name));


            // ============================================ Auth ==========================================
            CreateMap<LoginRequest, ApplicationUser>().ReverseMap();

            CreateMap<RegisterRequest, ApplicationUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom((src => src.Email)));

            CreateMap<ApplicationUser, SelfProfileResponse>()
                .ForMember(des => des.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(des => des.Role, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().Name))
                .ForMember(des => des.AvatarUrl, opt => opt.MapFrom(src => src.Avatar.UrlFilePath))
                .ForMember(des => des.BackgroundUrl, opt => opt.MapFrom(src => src.Background.UrlFilePath));

            CreateMap<ApplicationUser, GetListUsers>()
                .ForMember(des => des.FullName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(des => des.Role, opt => opt.MapFrom(src => src.Roles.FirstOrDefault().Name))
                .ForMember(des => des.AvatarUrl, opt => opt.MapFrom(src => src.Avatar.UrlFilePath));

            CreateMap<UpdateProfileRequest, ApplicationUser>()
                .ForMember(des => des.AvatarId, opt => opt.Ignore())
                .ForMember(des => des.BackgroundId, opt => opt.Ignore());


            //============================================== Cart ================================================
            CreateMap<CreateCartItemRequest, CartItem>();

            // Cart to CartDto mapping
            CreateMap<Cart, GetCartResponse>()
                .ForMember(dest => dest.CartItems, opt => opt.MapFrom(src => src.CartItems))
                .ForMember(dest => dest.ItemCount, opt => opt.MapFrom(src => src.CartItems.Count()));

            // CartItem to CartItemDto mapping
            CreateMap<CartItem, CartItemDto>()
                .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.Name))
                .ForMember(dest => dest.CourseThumbnail, opt => opt.MapFrom(src => src.Course.Thumbnail.UrlFilePath))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Course.Price));


            //============================================ Enrollment =========================================================
            CreateMap<Enrollment, EnrollmentListResponse>()
                .ForMember(des => des.UserName, opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))
                .ForMember(des => des.Course, opt => opt.MapFrom(src => src.Course));

            CreateMap<Enrollment, EnrollmentResponse>()
                .ForMember(des => des.UserName, opt => opt.MapFrom(src => src.User.FirstName + " " + src.User.LastName))
                .ForMember(des => des.Course, opt => opt.MapFrom(src => src.Course));


            //============================================ CourseGroup ================================================
            CreateMap<CourseGroup, CourseGroupListResponse>();

            CreateMap<CourseGroup, CourseGroupResponse>()
                .ForMember(des => des.Enrollments, opt => opt.MapFrom(src => src.Enrollments));

            CreateMap<CreateCourseGroupRequest, CourseGroup>();

            CreateMap<UpdateCourseGroupRequest, CourseGroup>();


            //========================================= Rating =================================================
            CreateMap<CreateRatingRequest, Rating>()
                .ForMember(des => des.UserId, opt => opt.Ignore());

            CreateMap<EditRatingRequest, Rating>()
                .ForMember(des => des.UserId, opt => opt.Ignore())
                .ForMember(des => des.CourseId, opt => opt.Ignore());

            CreateMap<Rating, RatingListResponse>();
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(des => des.UserName, opt => opt.MapFrom(src => src.FirstName + " " + src.LastName))
                .ForMember(des => des.AvatarUrl, opt => opt.MapFrom(src => src.Avatar.UrlFilePath));

            CreateMap<Media, AvatarDto>().ForMember(des => des.AvatarUrl, opt => opt.MapFrom(src => src.UrlFilePath));

            CreateMap<Rating, RatingListResponseAll>();

            CreateMap<Rating, RatingResponse>();


            //=========================================== Order ===========================================
            CreateMap<Order, OrderListResponse>()
                .ForMember(des => des.OrderItems, opt => opt.MapFrom(src => src.OrderItems));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(des => des.courseName, opt => opt.MapFrom(src => src.Course.Name));
        }
    }
}
