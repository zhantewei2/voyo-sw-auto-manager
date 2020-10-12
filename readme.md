##### webpack plugin 

- Auto deploy Service Worker 

- Auto deploy PWA

Install
---
```
npm install @voyo/sw-auto-manager
```

Example
---
```javascript
const {VoyoSwAutoManager} =require("@voyo/sw-auto-manager");
/* 
* webpack config
*
*/
plugins:[
    new VoyoSwAutoManager({
      //service worker config
     swOpts:{
        useDebugger:true,
        scopeRule:/(\/image\/|\/fonts\/|\/css\/|favicon.ico|index.html|\/js\/|voyo-manifest.json)/,
        dynamicCacheRules:[
          /ztwx\.woff/
        ]
    },
    //pwa config
     pwaOpts:{
      enabled:true,
      manifestConfig:{
        name:title,
        icons:[
            {src:"image/logo.png",sizes:"400x400",type:"image/png"}
        ],
        description:"description",
        display:"standalone",
        start_url:"/index.html",
        short_name:"shortName",
        theme_color:"black"
      }
    }
  })
]

```


configuration
---
#### swOpts
service worker config

|key|type|description|
|--|--|--|
|version?|: `string | "auto"`| specify or automatic|
|updateInterval?|: number|  Time between  update to the worker file
|useDebugger?|: boolean|
|pluginName?|: string|
|swFilePath?|: string|
|cachePagesFilePath?|: string|
|cacheBrand?|: string|
|scopeRule?|: RegExp|
|dynamicCacheRules?|: `Array<RegExp| string>|string|RegExp`|

#### pwaOpts
pwa config
|key|type|
|--|--|
|enabled|: boolean|
|manifestConfig|: PWAManifestConfig|
|config|: PWAConfig|

PWAConfig
|key|type|description|
|--|--|--|
|useDebugger?|boolean|
|manifestPath?|string|
|customPrompt?|boolean|The plugin will automatically configure the PWA popover. Disable this if you want to write it manually|
|pwaPromptPath?|string|