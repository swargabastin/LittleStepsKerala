namespace LittleStepsKeralaAPI.Models;

public class Enquiry
{
    public int Id { get; set; }

    public int CenterId { get; set; }

    public string ParentName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string ChildAge { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public string Status { get; set; } = "New";
}