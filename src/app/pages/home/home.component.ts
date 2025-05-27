import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from '../../components/menu/menu.component';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        MenuComponent,
        MatButtonModule,
        PageTitleComponent
    ]
})
export class HomeComponent {
}
