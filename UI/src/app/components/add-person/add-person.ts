
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPerson {

  private personService = inject(PersonService);
  private router = inject(Router);

  errorMessage = '';

  person = {
    name: '',
    dateOfBirth: '',
    gender: 'Male'
  };

  addPerson(): void {
    if (
      !this.person.name.trim() ||
      !this.person.dateOfBirth ||
      !this.person.gender
    ) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }

    this.personService.Create({
      id: 0,
      name: this.person.name.trim(),
      dateOfBirth: this.person.dateOfBirth,
      gender: this.person.gender
    }).subscribe({
      next: () => {
        alert('Person added successfully!');
        this.router.navigate(['/people']);
      },
      error: () => {
        this.errorMessage = 'Unable to add person!';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
