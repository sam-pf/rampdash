import Vue from "vue";
import VueRouter from "vue-router";
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/theme-fresh.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// only needed if you use ag-grid enterprise features
// import "ag-grid-enterprise/main";

// only needed if you use ag-grid enterprise features
// import {LicenseManager} from "ag-grid-enterprise/main";
// LicenseManager.setLicenseKey("your license key");

import RichGridExample from "./rich-grid-example/RichGridExample.vue";
import RampGameExample from "./rampgame-activity-dashboard/RichGridExample.vue";
import DynamicComponentExample from "./dynamic-component-example/DynamicComponentExample.vue";
import RichDynamicComponentExample from "./rich-dynamic-component-example/RichDynamicComponentExample.vue";
import EditorComponentExample from "./editor-component-example/EditorComponentExample.vue";
import FloatingRowExample from "./floating-row-example/FloatingRowExample.vue";
import FullWidthRowExample from "./full-width-example/FullWidthExample.vue";
import GroupedRowExample from "./grouped-row-example/GroupedRowExample.vue";
import FilterExample from "./filter-example/FilterExample.vue";
import LargeDataSetExample from "./large-data-set-example/LargeDataSetExample.vue";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: RampGameExample, name: "Rampgame Activity Dashboard"}
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    data: {
        routes
    },
    router
}).$mount('#app');

