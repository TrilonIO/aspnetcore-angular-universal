using AspCoreServer.Data;
using AspCoreServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
    [Route("api/user/[action]")]
    public class UserController : Controller
    {
        private readonly SpaDbContext _context;

        public UserController(SpaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> All(int currentPageNo = 1, int pageSize = 20)
        {
            var users = await _context.User
                .OrderByDescending(u => u.EntryTime)
                .Skip((currentPageNo - 1) * pageSize)
                .Take(pageSize)
                .ToArrayAsync();

            return Ok(users);
        }

        [HttpGet]
        public async Task<IActionResult> Details(int? id)
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
        public async Task<IActionResult> Insert([Bind("Name")] Users user)
        {
            if (user.Name != null)
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            else
            {
                return NotFound("Name not given");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([Bind("ID,Name")] Users userUpdateValue)
        {
            try
            {
                userUpdateValue.EntryTime = DateTime.Now;
                _context.Update(userUpdateValue);
                await _context.SaveChangesAsync();
                return Ok(userUpdateValue);
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

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int? id)
        {
            var userToRemove = await _context.User
                .AsNoTracking()
            .SingleOrDefaultAsync(m => m.ID == id);
            if (userToRemove == null)
            {
                return NotFound("User not Found");
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
