<template>
    <div id="app"></div>
</template>

<script>
    import Vue from "vue";

    import "../node_modules/ag-grid-community/dist/styles/ag-grid.css"
    import "../node_modules/ag-grid-community/dist/styles/theme-fresh.css"
    // only needed if you're using enterprise features
    // import "ag-grid-enterprise/main";

    import RichGridExample from './rich-grid-example/RichGridExample.vue'
    import RampGameExample from './rampgame-activity-dashboard/RichGridExample.vue'
    import DynamicComponentExample from './dynamic-component-example/DynamicComponentExample.vue'
    import RichDynamicComponentExample from './rich-dynamic-component-example/RichDynamicComponentExample.vue'
    import EditorComponentExample from './editor-component-example/EditorComponentExample.vue'
    import FloatingRowExample from './floating-row-example/FloatingRowExample.vue'
    import FullWidthRowExample from './full-width-example/FullWidthExample.vue'
    import GroupedRowExample from './grouped-row-example/GroupedRowExample.vue'
    import FilterExample from './filter-example/FilterExample.vue'

    export default {
        components: {
            'ramp-game-example': RichGridExample,
            'rich-grid-example': RichGridExample,
            'dynamic-components-example': DynamicComponentExample,
            'rich-dynamic-components-example': RichDynamicComponentExample,
            'editor-components-example': EditorComponentExample,
            'floating-row-example': FloatingRowExample,
            'full-width-row-example': FullWidthRowExample,
            'grouped-row-example': GroupedRowExample,
            'filter-example': FilterExample
        }
    }
</script>

<style>
</style>
