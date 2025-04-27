using System;
using Microsoft.EntityFrameworkCore;
using patient_tracking_api.Models;

namespace patient_tracking_api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Patient> Patients { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PatientHistory>()
            .HasOne<Patient>()
            .WithMany(p => p.History)
            .HasForeignKey(ph => ph.PatientId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
