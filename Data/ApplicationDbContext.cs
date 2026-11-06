using Microsoft.EntityFrameworkCore;
using LittleStepsKeralaAPI.Models;

namespace LittleStepsKeralaAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<DaycareCenter> DaycareCenters => Set<DaycareCenter>();

    public DbSet<User> Users => Set<User>();

    public DbSet<Review> Reviews => Set<Review>();

    public DbSet<Enquiry> Enquiries => Set<Enquiry>();
}