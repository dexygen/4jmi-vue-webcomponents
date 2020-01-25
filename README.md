# 4jmi-vue-webcomponents
This is to demonstrate using Vue.js to create Web Components which make use of CoreUI, and can in turn be exposed for use by Angular, React, etc.

The first three steps [from the following](https://medium.com/@royprins/get-started-with-vue-web-components-593b3d5b3200) were invaluable.

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
2. Custom css files used especially for JMI styling for instance may need to be pre-concatenated
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

Please refer [to the following](https://cli.vuejs.org/guide/build-targets.html#bundle-that-registers-multiple-web-components) at to building *multiple* web components at once from Vue.
