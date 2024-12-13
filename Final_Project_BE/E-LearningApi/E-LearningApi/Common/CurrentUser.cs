namespace E_LearningApi.Common
{
    public class CurrentUser
    {

        public CurrentUser(Guid Id,
        string FirstName,
        string LastName,
        string Email,
        IReadOnlyList<string> Roles)
        {
            this.Id = Id;
            this.Email = Email;
            this.Roles = Roles;
            this.FirstName = FirstName;
            this.LastName = LastName;
        }

        public Guid Id { get; set; }

        public string Email { get; set; }


        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public IReadOnlyList<string> Roles { get; set; }
    }
}
