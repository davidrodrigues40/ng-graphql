import { BehaviorSubject } from "rxjs";
import { BreadCrumb } from "src/app/services/navigation/bread-crumb";

export class BreadCrumbState {
    static readonly breadcrumbs$: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>([]);
}