<template>
  <div ref="webComponent">
    <h1>Vue/Web-Component/CoreUI-Card</h1>
	<div class="card w-25"><div class="card-body">{{msg}}</div></div>
  </div>
</template>

<script>
  /* eslint-disable no-mixed-spaces-and-tabs */
  export default {
    props: ['msg'],
    mounted() {
	  // delay necessary or parentNode (shadowRoot) is null upon page refresh
	  setTimeout(() => {
	    const componentHTML = this.$refs.webComponent.parentNode.innerHTML;
	    const coreUiImport = `<style> 
		  @import url('https://unpkg.com/@coreui/coreui@3.0.0-beta.4/dist/css/coreui.min.css');
        </style>`;
        this.$refs.webComponent.parentNode.innerHTML = coreUiImport + componentHTML;   		
	  });
	}
  }
</script>