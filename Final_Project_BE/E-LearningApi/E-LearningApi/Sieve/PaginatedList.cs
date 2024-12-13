using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace E_LearningApi.Sieve
{
    public class PaginatedList<T>
    {
        public IReadOnlyCollection<T> Data { get; }
        public int CurrentPage { get; }
        public int TotalPages { get; }
        public int TotalCount { get; }

        public PaginatedList(IReadOnlyCollection<T> data, int count, int currentPage = 1, int pageSize = 100)
        {
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            Data = data;
        }


        // IQueryable<T> source: The source queryable collection.
        // ISieveProcessor sieveProcessor: The Sieve processor for applying filtering, sorting, and pagination.
        // SieveModel sieveModel: The model containing Sieve filtering, sorting, and pagination options.
        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor)
        {
            var request = httpContextAccessor.HttpContext.Request;

            // Apply Sieve filtering and sorting to the source without pagination to get the filtered and sorted items.
            var data = sieveProcessor.Apply(sieveModel, source, applyPagination: false);

            // Count the total number of filtered items.
            var count = await data.CountAsync();

            // Apply Sieve pagination to the filtered and sorted items.
            data = sieveProcessor.Apply(sieveModel, data, applyFiltering: false, applySorting: false);

            var currentPage = sieveModel.Page ?? 1;
            var pageSize = sieveModel.PageSize ?? 100;


            return new PaginatedList<T>(await data.ToListAsync(), count, currentPage, pageSize);
        }

        public static async Task<PaginatedList<T>> CreateListCoursesAsync(IList<T> source, ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor)
        {
            var request = httpContextAccessor.HttpContext.Request;

            // sieveProcessor.Apply only work with IQueryable type.
            var data = sieveProcessor.Apply(sieveModel, source.AsQueryable(), applyPagination: false);

            var count = data.Count();

            data = sieveProcessor.Apply(sieveModel, data, applyFiltering: false, applySorting: false);

            var currentPage = sieveModel.Page ?? 1;
            var pageSize = sieveModel.PageSize ?? 100;

            return new PaginatedList<T>(await Task.FromResult(data.ToList()), count, currentPage, pageSize);
        }


    }

    //  Class Provides an extension method for IQueryable<T> to simplify creating paginated lists using the PaginatedList<T> class and Sieve.
    public static class MappingExtensions
    {
        // Extends IQueryable<TDestination> with a method to create a PaginatedList<TDestination>
        public static Task<PaginatedList<TDestination>> ToPaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor) where TDestination : class
            => PaginatedList<TDestination>.CreateAsync(queryable, sieveProcessor, sieveModel, httpContextAccessor);  // Call PaginatedList<TDestination>.CreateAsync with the necessary parameters to perform the pagination.

        public static Task<PaginatedList<TDestination>> ToPaginatedListAsync<TDestination>(this IList<TDestination> list, ISieveProcessor sieveProcessor, SieveModel sieveModel, IHttpContextAccessor httpContextAccessor) where TDestination : class
        => PaginatedList<TDestination>.CreateListCoursesAsync(list, sieveProcessor, sieveModel, httpContextAccessor);
    }
}
