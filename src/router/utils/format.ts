import type { DefaultComponent } from "@loadable/component";
import type { RouteObject } from "react-router-dom";

export function handleRouters(
  routes: Record<string, () => Promise<DefaultComponent<unknown>>>,
): RouteObject[] {
  const layouts: RouteObject[] = [];
  for (const route in routes) {
    console.log(route);
  }
  return layouts;
}
