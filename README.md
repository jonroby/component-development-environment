This project (proof of concept) is a development environment for creating React components. It is inspired by both Storybook and Styleguidist, but differs in one central design goal: the developer shouldn't be troubled to write additional code (Storybook stories) or markdown (Styleguidist) to test the components.

## Getting started ##

Clone the repo and ```npm i```
- Create a new component in ```src/components```.
- ```npm run start```

The component name is now listed on the left bar. Click on it. The props are displayed without any configuration. Additionally fake data has been provided.

## Todo

- Retrieve imported Flow types
- Auto generate far more fake data, different varieties, and in different amounts
  - string: HTML text, image source
  - arrays: different lengths
- With the additional fake data, allow the user to select what they want with dropdowns / reset option
- Allow snapshots of fake data to be taken and selected
- Routing for each of the components
- Auto generate markdown

## Todo after POC

- Allow configuration
  - `src/components`
  - Hook into react-create-app projects
