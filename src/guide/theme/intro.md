# System Theme

The implementation of the system theme is divided into two parts, one part is the theme configuration of the component library, and the other part is the theme configuration of UnoCSS. In order to unify the theme configuration of the two parts, some theme configurations are maintained on this, which control the theme configuration of the component library and UnoCSS respectively through these theme configurations.

## Principle

- Define some variables of theme configuration, including various theme colors, layout parameter configuration, etc.
- Produce theme variables that conform to the component library through these configurations
- Produce some theme tokens through these configurations and derive corresponding css variables, and then pass these css variables to UnoCSS
