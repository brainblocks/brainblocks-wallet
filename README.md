# BrainBlocks Platform UI

## Contents

- [Getting started](#getting-started)
- [Stack](#stack)
- [Code style](#code-style)
- [Styling](#styling)
- [Style guide](#style-guide)
- [Reusable components](#reusable-components)
- [Redux](#redux)

## Getting started

- Clone the project
- `npm install`
- `npm run dev`
- Open a second terminal
- `npm run styleguidist` - for developing components and checking component documentation

## Stack

- Next.js - for SSR
- React Styleguidist - for developing and documenting components
- Flow - for static typing, and to help with generating documentation
- Prettier - to enforce code style
- Grumbler scripts - as a base for eslint and babel (not yet implemented)
- Destyle and Emotion - for styling, and separating styling logic
- Redux - for state management
- Redux helpers - to reduce redux boilerplate, and allow reducers to mutate style directly using immer

## Code style

Code style is enforced via Prettier using the default settings, plus:

- 2-space indents
- No unnecessary semicolons

It is recommended to use VS Code and install the Prettier extension. The `.vscode` folder in this project includes settings to auto-format your code on save.

If you want to use Sublime or some other editor, try to find a similar extension and project setting.

Prettier will also be applied to all staged files in a pre-commit hook (but it's best to not be surprised by this).

## Styling

### CSS in JS

The styling library is Emotion, which allows styling using CSS syntax inside template literals like so:

    import { css } from 'emotion'

    const buttonStyles = css`
      background: green;
      color: yellow;
      padding: ${20 * 2}px; // <-- use variables etc
    `

Check the Emotion docs for more advanced usage. You can also install the Styled Components Syntax VS Code extension to get proper CSS syntax highlighting within template literals. There is probably a similar package for sublime and other editors.

### Decoupling styles from component logic

Styles are written in Emotion, but applied using [Destyle](https://github.com/syntropy-ai/destyle).

Destyle allows us to build more reusable components, by simply providing a namespace for our styles, which we can then attach styles to from elsewhere in the app. This makes it easier to override styles when the component is used in other projects.

Note that for now, destyle does not have access to default props.

See the [Reusable components](#reusable-components) section for a guide on how to structure component styles.

## Style guide

We are using React Styleguidist to both build and document components. React Styleguidist reads the component code and auto-generates documentation for the props and methods. BUT it requires that we define prop types either using React's `prop-types` or by using Flow. We are using Flow.

There's an example component in the `bb-components` directory that shows how to make a component self-documenting.

In addition to using Flow for self-documenting, each component in `bb-components` should have a readme named `{component-name}.md` where you can embed component examples using markdown.

Note that because we use Destyle on the components, the default export is not a React Component, and will confuse React Styleguidist. To solve this, we can simply export both the component and the wrapped (destyled) component, with the wrapped being the default, and the base component being a named export. Check the example component for an example.

## Reusable components

There are two component directores. `components` and `bb-components`. `components` is intended for project-specific things like the header, layout, etc. `bb-components` is intended to be the home of reusable components like form controls, buttons, alerts, etc.

The `bb-components` should only define the most important, skeleton styles. Most theming of components should be done from the `theme/components` folder in the project. This way, we can use the project's theme variables, and the `bb-components` are easily portable to other projects. To apply the `bb-component` styles, simply import the `{component}.style.js` file into `bb-components/styles.js`.

### Building components

There are a few guidlines we should follow to keep our components consistent across the project.

- Create function components by default. Upgrade to Class components when necessary.
- The ordering of your code in a component should be:
  - `// @flow`
  - import statements
  - any initialization of imports or variables
  - any type definitions (E.g. `type Props`)
  - component
  - any redux connect functions
  - default export
- For class components, the ordering of methods should be:
  - constructor
  - lifecycle methods
  - utility methods
  - event handlers
  - render
- (Request for comment) For function components, destructure props in the parameters. For Class components, destructure `this.props` in the first line of the render function. Always include `...rest` and spread it to the root element of your component `<div className={styles.root} {...rest}> ... </div>`. It is good practice to destructure so that you can safely spread `rest` to the root element, and avoid writing `props.myParameter` throughout.

### Building `bb-components`

To build a `bb-component`, copy and rename the example component and it's files.

It's recommended to define some props, then very early add some examples of different prop combinations to the component's readme. Then, you can build your component inside the styleguide rather than inside the app. The advantage to doing it this way is that it keeps the component decoupled from any other app styles or side-effects, and you can see all the examples at once. You can even update the props by editing the code _inside_ the styleguide to test different combinations. Lastly, it also prompts you to keep the documentation up-to-date as you're developing.

`bb-components` should not need to be connected to redux. This would couple them to this project. Data should always come from props.

## Redux

We are using Redux for state management. To reduce boilerplate, there is a redux helper that exports a function to create an entire model. The function takes a list of action handlers and returns the action names, and a reducer.

Action handlers created by the redux helper can mutate state directly, because the helper uses Immer. Mutating state directly makes your action handlers much simpler to read and write.

Redux thunk is used for intercepting actions where necessary.
