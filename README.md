# dcupl Nuxt 3 input field with auto suggestion

Nuxt 3 - Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## dcupl
Please see the readme.md in /dcupl-data

Start your dcupl development server running on http://localhost:8083

```bash
cd dcupl-data
npm i
dcupl serve
```

## Config settings
The data, which is included in dcupl-data, is the data from the dcupl demo project "Fashion Products", which can be joined for free in the Console. This demo includes 44K data records.

https://docs.dcupl.com/docs/examples/fashion-products/


The page http://localhost:3000/tailwindui-dcupl-autosuggest/ includes a tailwindui autocomplete combobox and fetches the data of the mentioned dcupl demo project. 50 suggestions are generated out of more than 44K products.


The page http://localhost:3000/load-from-dcupl/index.vue includes the settings for ...
- using a local dcupl server
- and the demo project and loading the data via CDN

If you want to connect your local project to a new dcupl Console project ...
- Create the project in the dcupl Console (https://console.dcupl.com)
- Add dcupl.secrets.json in /dcupl-data and add your apiKey
- Change the project ID in dcupl.config.json to the one of your new project


The page http://localhost:3000/index.vue imports the data from products.ts and does not use /dcupl-data. dcupl model and dcupl data is set in the source of the page.

## SDK Version
**The SDK Version is currently set to 1.0.0 in the package.json of the main project.**
Please read the docs - https://docs.dcupl.com

## open tasks
- [x] finish autocompletion
- [x] configure fn.suggest (lowercase, ...)
- [x] lookup and show results based on suggestion (/load from dcupl)
- [ ] add new attribute to Style model with expression => suggestions based on various attributes
- [ ] error handling / catch exceptions



## Production
Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
