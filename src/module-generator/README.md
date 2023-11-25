# Module Generator Version 1.0

### Features
1. Creates model interfaces and mock responses
2. Choice to implement try...catch in methods
3. Creates definition files and their unit tests
4. Adds gitignore, npmignore, jest.config, tsconfig.json
5. Creates package.json and README based on the provided values
6. Creates method folders and unit tests for selected methods
7. Adds helper folder
    - constants.ts (with API resources, operation names, and URL constants)
    - internal-models.ts (to add metadata model)
    - utils.ts (with commonly used functions)

## Usage

1. Install the dependencies of the module by using:

```
npm install
```

inside of the `module-generator` folder.

2. To create model files, paste sample JSON/XML request/response in each method's respective file under `src/apiData`. Do not rename any existing file in the folder. You can add more files in the `src/apiData` folder to generate model file with same name.

3. To run the generator, just open the module-generator folder in the cli and run:

```
npm start
```

### Module Generation

- To create a **Carrier App**, provide the name of the folder and Carrier module.

- Then, based on your selection, the assistant will create the correspondent directory in the `shipping/modules/` path. If the path doesn't exist, module folder will be created in the `module-generator` folder. 

- Next, you'll be asked about the URLs (carrier, tracking and test API). These values are optional and can be skipped. 

### Method Selection

- The assistant allows you to choose the **methods** the application can have, depending on the application type. If no methods are selected, *register method* will be considered the default value. 

| Methods for **Carrier Apps**: |
| :---------------------------- |
| register                      |
| createLabel                   |
| voidLabels                    |
| track                         |
| getRates                      |
| createManifest                |
| schedulePickup                |
| cancelPickup                  |
| getRelayPoints                |
| getServicePoint               |
| getServicePoints              |

- Once you provide the **methods**, next you'll be asked to provide the supported **shipping-services** and **packaging types**. To do so, provide the list of values separated by commas and press Enter. In case of no input, default values will be *Demo Service* and *Package* for shipping services & packaging types, respectively. 

- The assistant will automatically generate the definition and method files, and will also automatically generate the imports in the application definition.

- **Unit tests** will also be generated under `test` folder.

- **Model files** and mock response folder will be generated if the sample api data is placed in `src/apiData` folder.

- `API Communicator` will be generated based on the **API type** you provide. 

- You will also be asked if you want to implement `try...catch` in methods or not. 

### Packages Installation

After the project has been created, to install the dependencies of the integration itself, you need to navigate to `shipping/modules/{projectName}` or `module-generator/{projectName}` and run the following command in the command line:

```
npm install
```

### Current Limitations

- package.json might have old versions of modules
- creating custom registration/settings forms not supported