using API.Data;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class PersonRepository : IPersonRepository
{
    private readonly ApplicationDbContext _context;

    public PersonRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Person>> GetAll()
    {
        return await _context.People.ToListAsync();
    }

    public async Task<Person?> GetById(int id)
    {
        return await _context.People.FindAsync(id);
    }

    public async Task<Person> Create(Person person)
    {
         _context.People.Add(person);
         await _context.SaveChangesAsync();
         return person;
    }

    public async Task<bool> Update(int id, Person person)
    {
        var existing = await _context.People.FindAsync(id);
        if(existing == null)
        {
            return false;
        }

        existing.Name = person.Name;
        existing.DateOfBirth = person.DateOfBirth;
        existing.Gender = person.Gender;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var existing = await _context.People.FindAsync(id);
        if(existing == null)
        {
            return false;
        }

        _context.People.Remove(existing);
        await _context.SaveChangesAsync();
        return true;

    }
}