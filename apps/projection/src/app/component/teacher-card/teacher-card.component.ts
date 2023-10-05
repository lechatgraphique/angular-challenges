import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { NgForOf, NgIf } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers"
    (added)="addTeacher()"
    class="bg-light-red">
    <img card-header src="assets/img/teacher.png" width="200px" />
    <ng-template card-list-item let-teacher>
      <app-list-item (deleted)="deleteTeacher(teacher.id)">
        {{ teacher.firstname }} - {{ teacher.lastname }}
      </app-list-item>
    </ng-template>
  </app-card> `,
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(196, 112, 122, 0.71);
      }
    `,
  ],
  imports: [
    CardComponent,
    NgIf,
    ListItemComponent,
    NgForOf,
    CardListItemDirective,
  ],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
  addTeacher(): void {
    this.store.addOne(randTeacher());
  }
  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
