import Vue from 'vue'
/* Create a web component */
import wrap from '@vue/web-component-wrapper';
import MyWebComponent from './components/MyWebComponent';
window.customElements.define('my-web-component', wrap(Vue, MyWebComponent));
