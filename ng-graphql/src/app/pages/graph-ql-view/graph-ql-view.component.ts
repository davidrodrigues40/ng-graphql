import { Component } from '@angular/core';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { GraphQlMenuComponent } from 'src/app/components/graph-ql-menu/graph-ql-menu.component';
import { QueryBuilderComponent } from 'src/app/components/query-builder/query-builder.component';

@Component({
    selector: 'app-graph-ql-view',
    standalone: true,
    imports: [
        QueryBuilderComponent,
        GraphQlMenuComponent
    ],
    providers: [GraphQlService],
    templateUrl: './graph-ql-view.component.html',
    styleUrl: './graph-ql-view.component.scss'
})
export class GraphQlViewComponent {
}
