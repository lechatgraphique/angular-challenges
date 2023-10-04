import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Directive({
  selector: 'ng-template [card-list-item]',
  standalone: true,
})
export class CardListItemDirective {}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() customClass = '';
  @Output() added = new EventEmitter<void>();
  @Input({ required: true }) list: T[] = [];
  @ContentChild(CardListItemDirective, { read: TemplateRef }) row:
    | TemplateRef<{
        $implicit: T;
      }>
    | any;
}
