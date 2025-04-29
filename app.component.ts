import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  selectedStudent: any = null;
  students = [
    { id: 1, name: 'Anu', branch: 'IT' },
    { id: 2, name: 'John', branch: 'CSE' },
    { id: 3, name: 'Renu', branch: 'IT' }
  ];

  addStudent(id: any, name: any, branch: any) {
    this.students.push({
      id: id.value,
      name: name.value,
      branch: branch.value
    });
 
  }
  deleteStudent(id: any) {
    this.students = this.students.filter(student => student.id !== id);
  }

  editStudent(student: any) {
    this.selectedStudent = { ...student };
  }

  updateStudent() {
    const index = this.students.findIndex(student => student.id === this.selectedStudent.id);
    if (index !== -1) {
      this.students[index] = { ...this.selectedStudent };
    }
    this.selectedStudent = null; 
  }
  
}
 

    


