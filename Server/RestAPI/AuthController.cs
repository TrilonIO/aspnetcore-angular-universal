using Asp2017.Server.Models;
using AspCoreServer.Data;
using AspCoreServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AspCoreServer.Controllers
{
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly SpaDbContext _context;
    private readonly AppConfiguration _appSettings;

    public AuthController(SpaDbContext context, IOptions<AppConfiguration> appSettings)
    {
      _context = context;
      _appSettings = appSettings.Value;
    }
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody]User userDto)
    {
      var user = AuthenticateUser(userDto.Name, userDto.Password);

      if (user == null)
        return Unauthorized();

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Key);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                    new Claim(ClaimTypes.Name, user.ID.ToString())
          }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var tokenString = tokenHandler.WriteToken(token);

      // return basic user info (without password) and token to store client side
      return Ok(new
      {
        Id = user.ID,
        Username = user.Name,
        Token = tokenString
      });
    }
    private User AuthenticateUser(string username, string password)
    {
      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      var user = _context.User.SingleOrDefault(x => x.Name == username);

      // check if username exists
      if (user == null)
        return null;

      // check if password is correct
      if (user.Password != password)
        return null;

      // authentication successful
      return user;
    }
  }
}
