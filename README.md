# NG-HTML-id

ng-html-id is a simple html id generator for angular projects

## Installation

Use the package manager [NPM](https://www.npmjs.com) to install ng-html-id.

```bash
npm install --save-dev @moeindeveloper/ng-html-id 
```
## Configuration

Create a configuration.json file at the root level of your project, you can add some suffixes to add to the id and define project name

```json
{
  "projectName": "my-awesome-project",
  "elementSuffixes": {
    "button": "btn",
    "div": "container",
    "input": "input",
    "p-button": "btn",
    and any other selector names..
  }
}

```

## Usage

Run the command using NPX

```bash
npx ng-html-id -C configuration.json
```
or

```bash
npx ng-html-id --config configuration.json
```

using predefined configuration

```bash
npx ng-html-id
```


## TODO

- Add support for ngFor and automatically add an id there.
- Support for custom compoent names.
- Add tests.



## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)