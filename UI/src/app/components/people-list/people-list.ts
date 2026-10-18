import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';

@Component({
  imports: [],
  selector: 'app-people-list',
  styleUrl: './people-list.css',
  templateUrl: './people-list.html',
})
export class PeopleList implements OnInit{

  private personService = inject(PersonService);

  people = signal<Person[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  personPendingDelete = signal<Person | null>(null);

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.personService.getAll().subscribe({
      next: (data) => {
        this.people.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage.set('Unable to laod people');
        this.loading.set(false);
      }
    });
  }

  confirmDelete(persom: Person): void {
    this.personPendingDelete.set(null);
  }

  cancelDelete(): void {
    this.personPendingDelete.set(null);
  }

  deletePerson(): void {
    const person = this.personPendingDelete();
    if(!person){
      return;
    }

    this.personService.Delete(person.id).subscribe({
      next: () => {
        this.personPendingDelete.set(null);
        this.people.update(people => people.filter(item => item.id !== person.id));
      },
      error: () => {
        this.personPendingDelete.set(null);
      }
    });
  }
}
