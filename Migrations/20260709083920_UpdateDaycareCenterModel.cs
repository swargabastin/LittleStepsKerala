using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LittleStepsKeralaAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDaycareCenterModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CenterName",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "CenterType",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "District",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "OpeningHours",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "ReviewCount",
                table: "DaycareCenters");

            migrationBuilder.RenameColumn(
                name: "GoogleRating",
                table: "DaycareCenters",
                newName: "Longitude");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "DaycareCenters",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "DaycareCenters",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Area",
                table: "DaycareCenters",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "DaycareCenters",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "DaycareCenters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Latitude",
                table: "DaycareCenters",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DaycareCenters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "DaycareCenters",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DaycareCenters");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "DaycareCenters");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "DaycareCenters",
                newName: "GoogleRating");

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Area",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CenterName",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CenterType",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OpeningHours",
                table: "DaycareCenters",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ReviewCount",
                table: "DaycareCenters",
                type: "integer",
                nullable: true);
        }
    }
}
