import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import jsonData from '../data/users.json';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NgFor, CommonModule]
})


export class AppComponent {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
    professors: users[];
    students: users[];
  
    constructor() {
      this.professors = this.getSortedProfessors(jsonData.users);
      this.students = this.getSortedStudents(jsonData.users);
    }
  
    
    private getSortedProfessors(users: users[]): users[] {
      return users.filter(user => user.isTeacher)
                  .sort((a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime());
    }
  
    
    private getSortedStudents(users: users[]): users[] {
      return users.filter(user => !user.isTeacher)
                  .sort((a, b) => {
                    if (a.house !== b.house) {
                      return a.house.localeCompare(b.house);
                    }
                    return a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName);
                  });
    }
    getAssignmentColor(assignment: string | undefined): string {
      if (!assignment) {
        return 'black'; 
      }
      switch (assignment.toLowerCase()) {
        case 'transfiguration':
          return '#E9131F';
        case 'charms':
          return '#1D79CD';
        case 'herbology':
          return '#C7B514';
        case 'potions':
          return '#18A874';
        default:
          return 'black'; 
      }
    }
    getHouseColor(house: string | undefined): string {
      if (!house) {
        return 'black'; 
      }
      switch (house.toLowerCase()) {
        case 'gryffindor':
          return '#E9131F';
        case 'slytherin':
          return '#18A874';
        default:
          return 'black'; 
      }
    }
    calculateYearsOfService(arrivalDate: string): string {
      const today = new Date('1991-11-12');
      const arrival = new Date(arrivalDate);
      const difference = today.getFullYear() - arrival.getFullYear();
      const isBeforeBirthday = (today.getMonth() < arrival.getMonth()) ||
                                (today.getMonth() === arrival.getMonth() && today.getDate() < arrival.getDate());
    
      if (difference < 0) {
        return 'Invalid Date';
      }
    
      const adjustedDifference = isBeforeBirthday ? difference - 1 : difference;
    
      switch (adjustedDifference) {
        case 0:
          return 'First Year';
        case 1:
          return 'Second Year';
        case 2:
          return 'Third Year';
        case 3:
          return 'Fourth Year';
        default:
          return `${adjustedDifference + 1}th Year`; 
      }
    }
    convertDateSeparator(arrivalDate: string): string {
      return arrivalDate.replace(/\//g, ".");
  }
  
  
}
  
  export type Root = users[];
  export interface users {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    arrivalDate: string;
    house: string;
    assignment?: string;
    isTeacher: boolean;
  }