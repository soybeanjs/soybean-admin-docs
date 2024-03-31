# Route Creation

## Command Creation

By executing the `pnpm gen-route` command, you can quickly create route files.

**Naming rules for route names**

- First-level route: `demo`, `demo-page`, `route1`
  > The name is in the form of lowercase with hyphen `-`
- Second-level route: `demo2_child`, `demo2-page_child`, `route2_child`
  > The level of the route is separated by an underscore `_`, and both sides still follow the naming rules of the first-level route
- Third-level and above routes: `demo3_child_child`, `demo3-page_child_child_child`

## Manual Creation

**When manually creating route files, the following rules need to be followed:**
The name of the folder for each level of route is the route name, and the index.vue or [id].vue under the folder is the route component.
