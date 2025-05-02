import { Component } from '@angular/core';

@Component({
    selector: 'app-person-by-legacy-id',
    imports: [],
    templateUrl: './person-by-legacy-id.component.html',
    styleUrl: './person-by-legacy-id.component.scss'
})
export class PersonByLegacyIdComponent {
  protected query: string = '';
}
