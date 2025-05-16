import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
   private readonly routeStore = new Map<string, DetachedRouteHandle>();

   shouldDetach(route: ActivatedRouteSnapshot): boolean {
      const path = route.routeConfig?.path ?? '';
      return path.length > 0 && ['compA', 'compB'].includes(path);
   }
   store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      this.routeStore.set(route.routeConfig?.path ?? '', handle);
   }
   shouldAttach(route: ActivatedRouteSnapshot): boolean {
      const path = route.routeConfig?.path ?? '';
      return (
         path.length > 0 && ['compA', 'compB'].includes(path) && !!this.routeStore.get(path)
      );
   }
   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      console.log('retrieve', route);
      const path = route.routeConfig?.path ?? '';
      return this.routeStore.get(path) as DetachedRouteHandle;
   }
   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
      console.log('shouldReuseRoute', future, curr);
      return false;
   }
}