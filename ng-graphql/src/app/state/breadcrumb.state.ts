import { signal, WritableSignal } from "@angular/core";
import { NavigationItem } from "../services/navigation/navigation-item";

export class BreadcrumbState {
    static readonly breadcrumbs: WritableSignal<NavigationItem[]> = signal([]);
}