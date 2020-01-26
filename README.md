# 4jmi-vue-webcomponents
This is to demonstrate using Vue.js to create Web Components which make use of CoreUI, and can in turn be exposed for use by Angular, React, etc.

## Prerequisites
The first three steps [from the following](https://medium.com/@royprins/get-started-with-vue-web-components-593b3d5b3200) were invaluable.  Before the first step above, and for the sake of completeness, please ensure you (already) have the following software installed and/or follow the necessary steps.  After cloning/extracting this project, on the command line from inside the "4jmi-vue-webcomponents" directory

1. Node and NPM must be installed ahead of time (and on the path)
2. Vue can then be installed: `npm install -g vue`
3. Install vue-cli as per step one in the above article: `npm install -g @vue/cli`
4. Having already cloned/extracted an existing project, then next step from the above article, "vue create web-component-project", may be skipped
5. Then `npm install` will install necessary node modules
6. `npm run serve` will launch the server and when ready will inform how to access it, e.g. http://localhost:8080/

## Referencing the CoreUI/CSS
You can obtain the necessary CoreUI files from [their CDN](https://coreui.io/docs/getting-started/download/#coreui-cdn).  However, a Web Component doesn't have access to the entire document's styles, so while you might reference the necessary .js in your index.html head section, you will need to do so otherwise from within each component.  

One way of doing so is [referred to here](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).  Another way, used in the project, is to augment the shadowRoot's innerHTML with the necessary style/import.

In either case setTimeout seems necessary, see the following code from the Vue component:

```
mounted() {
  // delay necessary as parentNode (shadowRoot) is null upon page refresh
  setTimeout(() => {
    const componentHTML = this.$refs.webComponent.parentNode.innerHTML;
    const coreUiImport = `<style> 
      @import url('https://unpkg.com/@coreui/coreui@3.0.0-beta.4/dist/css/coreui.min.css');
    </style>`;
    this.$refs.webComponent.parentNode.innerHTML = coreUiImport + componentHTML;   		
  });
}
```

Things to note:
1. The necessary stylesheet urls could be abstracted into an array and the corresponding script tags generated from that.
2. Custom css files used especially for JMI styling for instance may need to be pre-concatenated/minified
3. A `mounted` method such as the above could get moved into a mixin to get imported by all Vue-generated web components.

With regard to #3 above, it would be necessary to ensure that the Vue ref from the component's template below, match with what is expected by a mixin's `mounted` method:

```
<template>
  <div ref="webComponent">
    <h1>Vue/Web-Component/CoreUI-Card</h1>
	<div class="card w-25"><div class="card-body">{{msg}}</div></div>
  </div>
</template>
```

## Referencing the generated web component from HTML or other frameworks, i.e. React

Step four from the [from the link at the very top](https://medium.com/@royprins/get-started-with-vue-web-components-593b3d5b3200) details how to create a distributable version of the web component; the minified version has been copied to /react-headless/ and its usage exemplified in that folder's vue-webcomponent-demo.html file

[This article](https://www.grapecity.com/blogs/using-web-components-with-react-2019) was very helpful in getting a headless React page to properly use the generated component from the dist folder.

Please refer [to the following](https://cli.vuejs.org/guide/build-targets.html#bundle-that-registers-multiple-web-components) as to building *multiple* web components at once from Vue.

## Challenge(s)

The main challenge in using Vue-generated web components for usage by other components is that Vue's system of reactivity, including `watch` and directives typically used to respond to reactive changes, such as `v-if` and `v-for`, are not honored.  Web components do provide for a system of reactivity, first by declaring attributes/properties to listen for changes on with the `observedAttributes` and `attributeChangedCallback` methods, but these are not accounted for when Vue components are wrapped as web components.

The `wrap` method used in index.js returns a constructor which should be able to be extended for adding these and other necessary methods.  This might in turn work fine for a production build, but in development the Vue component's `this` still refers to the Vue component, and not the generated web component.

It might be possible to pass some functions into the web component as props, this is common practice in React for instance, for parents to pass methods down to children as properties.  This and/or other options need to be explored, one such being code generation; `vue run build` after all amounts to a code generator.

