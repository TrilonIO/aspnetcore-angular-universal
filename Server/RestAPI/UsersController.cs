using System.Security.Cryptography;
using Asp2017.Server.Models;
using AspCoreServer.Data;
using AspCoreServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  public class UsersController : Controller
  {
    private readonly SpaDbContext _context;
    private readonly AppConfiguration _appSettings;

    public UsersController(SpaDbContext context, IOptions<AppConfiguration> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> Get(int currentPageNo = 1, int pageSize = 20)
    {
      var users = await _context.User
          .OrderByDescending(u => u.EntryTime)
          .Skip((currentPageNo - 1) * pageSize)
          .Take(pageSize)
          .ToArrayAsync();

      if (!users.Any())
      {
        return NotFound("Users not Found");
      }
      else
      {
        return Ok(users);
      }
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var user = await _context.User
          .Where(u => u.ID == id)
          .AsNoTracking()
          .SingleOrDefaultAsync(m => m.ID == id);

      if (user == null)
      {
        return NotFound("User not Found");
      }
      else
      {
        return Ok(user);
      }
    }

    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody]User user)
    {
      if (!string.IsNullOrEmpty(user.Name))
      {
        user.Password = "password";
        _context.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction("Post", user);
      }
      else
      {
        return BadRequest("User's name was not given");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody]User userUpdateValue)
    {
      try
      {
        userUpdateValue.EntryTime = DateTime.Now;

        var userToEdit = await _context.User
          .AsNoTracking()
          .SingleOrDefaultAsync(m => m.ID == id);

        if (userToEdit == null)
        {
          userToEdit.Password = "password";
          return NotFound("Could not update user as it was not Found");
        }
        else
        {
          _context.Update(userUpdateValue);
          await _context.SaveChangesAsync();
          return Ok("Updated user - " + userUpdateValue.Name);
        }
      }
      catch (DbUpdateException)
      {
        //Log the error (uncomment ex variable name and write a log.)
        ModelState.AddModelError("", "Unable to save changes. " +
            "Try again, and if the problem persists, " +
            "see your system administrator.");
        return NotFound("User not Found");
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var userToRemove = await _context.User
          .AsNoTracking()
      .SingleOrDefaultAsync(m => m.ID == id);
      if (userToRemove == null)
      {
        return NotFound("Could not delete user as it was not Found");
      }
      else
      {
        _context.User.Remove(userToRemove);
        await _context.SaveChangesAsync();
        return Ok("Deleted user - " + userToRemove.Name);
      }
    }
  }
}
