import { BehaviorSubject } from "rxjs";
import { BreadCrumb } from "src/app/services/navigation/bread-crumb";

export class BreadCrumbState {
    static breadcrumbs$: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>([]);
}