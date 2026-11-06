using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LittleStepsKeralaAPI.Data;
using LittleStepsKeralaAPI.Models;

namespace LittleStepsKeralaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DaycareCentersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DaycareCentersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/daycarecenters
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DaycareCenter>>> GetCenters()
    {
        return await _context.DaycareCenters.ToListAsync();
    }

    // GET: api/daycarecenters/1
    [HttpGet("{id}")]
    public async Task<ActionResult<DaycareCenter>> GetCenter(int id)
    {
        var center = await _context.DaycareCenters.FindAsync(id);

        if (center == null)
            return NotFound();

        return center;
    }

    // POST: api/daycarecenters
    [HttpPost]
    public async Task<ActionResult<DaycareCenter>> CreateCenter(DaycareCenter center)
    {
        _context.DaycareCenters.Add(center);

        await _context.SaveChangesAsync();

        return Ok(center);
    }

    // PUT: api/daycarecenters/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCenter(int id, DaycareCenter center)
    {
        if (id != center.Id)
            return BadRequest();

        _context.Entry(center).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/daycarecenters/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCenter(int id)
    {
        var center = await _context.DaycareCenters.FindAsync(id);

        if (center == null)
            return NotFound();

        _context.DaycareCenters.Remove(center);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}