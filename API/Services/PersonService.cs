using API.Model;
using API.Repository;

namespace API.Service;

public class PersonService: IPersonService
{
    private readonly IPersonRepository _repository;

    public PersonService(IPersonRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Person>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<Person?> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<Person> Create(Person person)
    {
        return await _repository.Create(person);
    }

    public async Task<bool> Update(int id, Person person)
    {
        return await _repository.Update(id, person);
    }

    public async Task<bool> Delete(int id)
    {
        return await _repository.Delete(id);
    }
}