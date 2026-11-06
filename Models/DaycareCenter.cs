namespace LittleStepsKeralaAPI.Models;

public class DaycareCenter
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public string? OSMType { get; set; }

    public string? OSMID { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? Address { get; set; }

    public string? Street { get; set; }

    public string? City { get; set; }

    public string? Postcode { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public string? Website { get; set; }

    public string? OpeningHours { get; set; }

    public string? Description { get; set; }
}