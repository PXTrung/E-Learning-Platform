using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_LearningApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class Add_CourseGroup_Entities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CourseGroupId",
                table: "Enrollments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCourseInGroup",
                table: "Enrollments",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "courseGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courseGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_courseGroups_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enrollments_CourseGroupId",
                table: "Enrollments",
                column: "CourseGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_courseGroups_UserId",
                table: "courseGroups",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enrollments_courseGroups_CourseGroupId",
                table: "Enrollments",
                column: "CourseGroupId",
                principalTable: "courseGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enrollments_courseGroups_CourseGroupId",
                table: "Enrollments");

            migrationBuilder.DropTable(
                name: "courseGroups");

            migrationBuilder.DropIndex(
                name: "IX_Enrollments_CourseGroupId",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "CourseGroupId",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "IsCourseInGroup",
                table: "Enrollments");
        }
    }
}
