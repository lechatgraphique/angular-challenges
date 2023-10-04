import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import {
  CardComponent,
  CardListItemDirective,
} from '../../ui/card/card.component';
import { CityStore } from '../../data-access/city.store';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities"
    (added)="addCity()"
    class="bg-light-yellow">
    <img card-header src="assets/img/office-building.png" width="200px" />
    <ng-template card-list-item let-city>
      <app-list-item (deleted)="deleteCity(city.id)">
        {{ city.name }} - {{ city.country }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-yellow {
        background-color: rgba(236, 253, 10, 0.39);
      }
    `,
  ],
  imports: [ListItemComponent, CardListItemDirective, CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    this.store.cities$.subscribe((s) => (this.cities = s));
  }
  addCity(): void {
    this.store.addOne(randomCity());
  }
  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
