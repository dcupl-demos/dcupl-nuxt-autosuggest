<div align="center">
	<h1 align="center">dcupl-demos/dcupl-nuxt-autosuggest</h1>
	<p align="center">dcupl demo based on Nuxt and tailwindUI, loading 44K fashion products from dcupl demo project "Fashion Products" (data provided by kaggle.com)<br />Demo project for <a href="http://www.dcupl.com?utm_source=github.com&utm_medium=readme&utm_campaign=dcupl-demos-fashion-products" target="_blank">dcupl</a>, App Development Platform for Data-Intensive Web Applications.</p> <br />
</div>

<p align="center">
<strong>@dcupl/cli</strong><br/>
  <a href="https://npmjs.com/package/@dcupl/cli">
    <img src="https://img.shields.io/npm/v/@dcupl/cli/latest.svg?style=flat-square" alt="dcupl CLI" />
  </a>
  <a href="https://npmjs.com/package/@dcupl/cli" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/@dcupl/cli.svg?style=flat-square" alt="dcupl CLI">
  </a>
</p>

<p align="center">
<strong>@dcupl/core</strong><br/>
  <a href="https://npmjs.com/package/@dcupl/core">
    <img src="https://img.shields.io/npm/v/@dcupl/core/latest.svg?style=flat-square" alt="dcupl Core" />
  </a>
  <a href="https://npmjs.com/package/@dcupl/core" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/@dcupl/core.svg?style=flat-square" alt="dcupl Core">
  </a>
</p>

<p align="center">
<strong>@dcupl/loader</strong><br/>
  <a href="https://npmjs.com/package/@dcupl/loader">
    <img src="https://img.shields.io/npm/v/@dcupl/loader/latest.svg?style=flat-square" alt="dcupl loader" />
  </a>
  <a href="https://npmjs.com/package/@dcupl/loader" rel="nofollow">
    <img src="https://img.shields.io/npm/dt/@dcupl/loader.svg?style=flat-square" alt="dcupl loader">
  </a>
</p>

<p align="center">
  <a href="https://github.com/dcupl" title="dcupl on github"><span class="sr-only">GitHub</span><svg fill="#0225EE" width="30" heigth="30"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg></a>
</p>

<hr>

# dcupl autosuggest (Nuxt 3 + tailwindcss)

dcupl - Read the [dcupl Docs](https://docs.dcupl.com/docs/Introduction) 
Nuxt 3 - Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)
tailwindUI - Read the [tailwindUI docs](https://tailwindui.com/documentation)

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

<img width="795" alt="image" src="https://user-images.githubusercontent.com/756310/229047201-f44d1989-35ea-4133-9a81-73bef0297a6c.png">


The page http://localhost:3000/load-from-dcupl/index.vue includes the settings for ...
- using a local dcupl server
- and the demo project and loading the data via CDN

<img width="1323" alt="image" src="https://user-images.githubusercontent.com/756310/229047924-aec0b197-5f96-45b3-a2fd-db7ce9452bfe.png">


If you want to connect your local project to a new dcupl Console project ...
- Create the project in the dcupl Console (https://console.dcupl.com)
- Add dcupl.secrets.json in /dcupl-data and add your apiKey
- Change the project ID in dcupl.config.json to the one of your new project

Watch our videos for a quick start - https://docs.dcupl.com/docs/getting-started/overview/#videos


The page http://localhost:3000/index.vue imports the data from products.ts and does not use /dcupl-data. dcupl model and dcupl data is set in the source of the page.

<img width="1249" alt="image" src="https://user-images.githubusercontent.com/756310/229048128-3573df51-8b94-4e83-a4ab-a50cd84313ad.png">


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
