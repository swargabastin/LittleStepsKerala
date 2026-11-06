using Microsoft.AspNetCore.Mvc;

namespace LittleStepsKeralaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("LittleSteps Kerala API Working");
    }
}