<template>
  <div style="width: 95%; margin-left: auto; margin-right: auto;
    padding-bottom: 10px;">
    <h2>Dashboard (Mockup) for Ramp Game with Analytics</h2>
    <h3>Class of Ms. Teach Well at Good Thoughts High School</h3>
    <div style="clear: both;"></div>
    <div v-if="showGrid">
      <div style="padding: 4px;" class="toolbar">
        <input @keyup="onQuickFilterChanged" type="text" id="quickFilterInput"
             placeholder="Type text to filter..."/>
        <button @click="createRowData()" style="margin-left: 20px">Refresh
        </button>
        <span style="margin-left: 10px;">
          <button @click="gridOptions.api.selectAll()">Select All
          </button>
          <button @click="gridOptions.api.deselectAll()">Un-select
          </button>
        </span>
        <span style="margin-left: 10px;">
          <button
            @click="gridOptions.columnApi.setColumnVisible('name', false)">
            Hide Names</button>
          <button
            @click="gridOptions.columnApi.setColumnVisible('name', true)">
            Show Names</button>
        </span>
        <label style="margin-left: 10px;">
          <input type="checkbox" v-model="showToolPanel"/>
          Show Tool Panel
        </label>
      </div>
      <div style="clear: both;"></div>
      <ag-grid-vue style="width: 100%; height: 497px;"
             class="ag-fresh"
             :gridOptions="gridOptions"
             :columnDefs="columnDefs"
             :rowData="rowData"
             :showToolPanel="showToolPanel"

             :enableColResize="true"
             :enableSorting="true"
             :enableFilter="true"
             :groupHeaders="true"
             :suppressRowClickSelection="true"
             :toolPanelSuppressGroups="true"
             :toolPanelSuppressValues="true"
             rowHeight="22"
             rowSelection="multiple"

             :modelUpdated="onModelUpdated"
             :cellClicked="onCellClicked"
             :cellDoubleClicked="onCellDoubleClicked"
             :cellContextMenu="onCellContextMenu"
             :cellValueChanged="onCellValueChanged"
             :cellFocused="onCellFocused"
             :rowSelected="onRowSelected"
             :selectionChanged="onSelectionChanged"
             :beforeFilterChanged="onBeforeFilterChanged"
             :afterFilterChanged="onAfterFilterChanged"
             :filterModified="onFilterModified"
             :beforeSortChanged="onBeforeSortChanged"
             :afterSortChanged="onAfterSortChanged"
             :virtualRowRemoved="onVirtualRowRemoved"
             :rowClicked="onRowClicked"
             :gridReady="onReady"

             :columnEverythingChanged="onColumnEvent"
             :columnRowGroupChanged="onColumnEvent"
             :columnValueChanged="onColumnEvent"
             :columnMoved="onColumnEvent"
             :columnVisible="onColumnEvent"
             :columnGroupOpened="onColumnEvent"
             :columnResized="onColumnEvent"
             :columnPinnedCountChanged="onColumnEvent">
      </ag-grid-vue>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import {AgGridVue} from "ag-grid-vue";

  import {ProficiencyFilter} from './proficiencyFilter';
  import {SkillFilter} from './skillFilter';
  import DateComponent from './DateComponent.vue';
  import HeaderGroupComponent from './HeaderGroupComponent.vue';
  import RefData from './refData'

  export default {
    data () {
      return {
        gridOptions: null,
        columnDefs: null,
        rowData: null,
        showGrid: false,
        showToolPanel: false,
        rowCount: null
      }
    },
    components: {
      'ag-grid-vue': AgGridVue
    },
    methods: {
      createRowData() {
        const rowData = [];
        for (let i = 0; i < 200; i++) {
          const countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
          rowData.push ({
            name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] +
                ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
            skills: {
              android: Math.random() < 0.4,
              html5: Math.random() < 0.4,
              mac: Math.random() < 0.4,
              windows: Math.random() < 0.4,
              css: Math.random() < 0.4
            },
            dob: RefData.DOBs[i % RefData.DOBs.length],
            address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
            years: Math.round(Math.random() * 100),
            proficiency: Math.round(Math.random() * 100),
            country: countryData.country,
            continent: countryData.continent,
            language: countryData.language,
            mobile: createRandomPhoneNumber(),
            landline: createRandomPhoneNumber()
          });
        }
        this.rowData = rowData;
      },
      createColumnDefs() {
        this.columnDefs = [
          {
            headerName: '#',
            width: 24,
            checkboxSelection: true,
            suppressSorting: true,
            suppressMenu: true,
            pinned: true
          },
          {
            headerName: 'Student',
            headerGroupComponentFramework: HeaderGroupComponent,
            children: [
              {
                headerName: "Name",
                field: "name",
                width: 150,
                pinned: true,
              },
              {
                headerName: "Overall",
                field: "proficiency",
                width: 100,
                cellRenderer: percentCellRenderer,
                pinned: true,
              },
              {
                headerName: "Message",
                field: "dob",
                width: 120,
                pinned: true,
                cellRenderer: (params) => {
                  return "Great work!"
                },
                filter: 'date',
                columnGroupShow: 'open'
              }
            ]
          },
          {
            headerName: 'Page 2 (Pre-test)',
            children: [
              {
                headerName: "Q1",
                width: 60,
                suppressSorting: true,
                cellRenderer: mcqRenderer,
                filter: SkillFilter
              },
              {
                headerName: "Q2",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q3",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q4",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q5",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q6",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
            ]
          },
          {
            headerName: 'Page 3 (Ramp Game)',
            children: [
              {
                headerName: "Level 1",
                width: 80,
                suppressSorting: true,
                cellRenderer: bktResultRenderer,
                filter: SkillFilter
              },
              {
                headerName: "Level 2",
                field: "proficiency",
                width: 80,
                cellRenderer: bktResultRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Level 3",
                field: "proficiency",
                width: 80,
                cellRenderer: bktResultRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Level 4",
                field: "proficiency",
                width: 80,
                cellRenderer: bktResultRenderer,
                filter: ProficiencyFilter
              },
            ]
          },
          {
            headerName: 'Page 4 (Post-test)',
            children: [
              {
                headerName: "Q1",
                width: 60,
                suppressSorting: true,
                cellRenderer: mcqRenderer,
                filter: SkillFilter
              },
              {
                headerName: "Q2",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q3",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
              {
                headerName: "Q4",
                field: "proficiency",
                width: 60,
                cellRenderer: mcqRenderer,
                filter: ProficiencyFilter
              },
            ]
          },
        ];
      },
      pad (num, totalStringSize){
        let asString = num + "";
        while (asString.length < totalStringSize) asString = "0" + asString;
        return asString;
      },

      calculateRowCount (){
        if (this.gridOptions.api && this.rowData) {
          let model = this.gridOptions.api.getModel();
          let totalRows = this.rowData.length;
          let processedRows = model.getRowCount();
          this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
      },

      onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
      },

      onReady() {
        console.log('onReady');
        this.calculateRowCount();
      },

      onCellClicked(event) {
        console.log('onCellClicked: ' + event.rowIndex + ' ' +
          event.colDef.field);
      },

      onCellValueChanged(event) {
        console.log('onCellValueChanged: ' + event.oldValue + ' to ' +
          event.newValue);
      },

      onCellDoubleClicked(event) {
        console.log('onCellDoubleClicked: ' + event.rowIndex + ' ' +
          event.colDef.field);
      },

      onCellContextMenu(event) {
        console.log('onCellContextMenu: ' + event.rowIndex + ' ' +
          event.colDef.field);
      },

      onCellFocused(event) {
        console.log('onCellFocused: (' + event.rowIndex + ',' +
          event.colIndex + ')');
      },

      // taking out, as when we 'select all', it prints to much to the console!!
      onRowSelected(event) {
//                console.log('onRowSelected: ' + event.node.data.name);
      },

      onSelectionChanged() {
        console.log('selectionChanged');
      },

      onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
      },

      onAfterFilterChanged() {
        console.log('afterFilterChanged');
      },

      onFilterModified() {
        console.log('onFilterModified');
      },

      onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
      },

      onAfterSortChanged() {
        console.log('onAfterSortChanged');
      },

      onVirtualRowRemoved(event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + event.rowIndex);
      },

      onRowClicked(event) {
        console.log('onRowClicked: ' + event.node.data.name);
      },

      onQuickFilterChanged(event) {
        this.gridOptions.api.setQuickFilter(event.target.value);
      },

      // here we use one generic event to handle all the column type events.
      // the method just prints the event name
      onColumnEvent(event) {
        console.log('onColumnEvent: ' + event);
      }
    },
    beforeMount() {
      this.gridOptions = {};
      this.gridOptions.dateComponentFramework = DateComponent;
      this.createRowData();
      this.createColumnDefs();
      this.showGrid = true;
    }
  }

  function mcqRenderer (params) {
    let data = params.data;
    let els = [];
    const done = Math.random () > 0.5
    if (done) {
      els.push ('<span class=done title="Yay, student did it">Y</span>')
      const correct = Math.random () > 0.5
      if (correct)
        els.push ('<span class=correct title="Correctly answered">C</span>')
      else
        els.push ('<span class=incorrect title="Incorrectly answered">I</span>')

    } else
      els.push ('<span class=notdone title="Student did not do it yet">N</span>')
    return els.join(' ');
  }

  function bktResultRenderer (params) {
    const labels = ['A1', 'A2', 'B', 'C', 'D', 'E1', 'E2']
    const title = ['Doing great', 'Doing great', 'Slow but learning great',
      'Slow learning due to technical difficulty',
      'Not learning; technical difficulty?  distraction?',
      'Must accelerate; nothing to learn due to perfect prior knowledge',
      'Must accelerate; nothing to learn due to prior knowledge']
    const c = Math.floor (Math.random () * labels.length)
    return '<span class=bkt title="MCBKT says: ' + title[c] + '">' + labels [c] + '</span>'
  }

  function countryCellRenderer(params) {
    let flag = "<img border='0' width='15' height='10' " +
        "style='margin-bottom: 2px' src='images/flags/" +
        RefData.COUNTRY_CODES[params.value] + ".png'>";
    return flag + " " + params.value;
  }

  function createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
      result += Math.round(Math.random() * 10);
      if (i === 2 || i === 5 || i === 8) {
        result += ' ';
      }
    }
    return result;
  }

  function percentCellRenderer(params) {
    let value = params.value;

    let eDivPercentBar = document.createElement('div');
    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
      eDivPercentBar.style.backgroundColor = 'red';
    } else if (value < 60) {
      eDivPercentBar.style.backgroundColor = '#ff9900';
    } else {
      eDivPercentBar.style.backgroundColor = '#00A000';
    }

    let eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';

    let eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);

    return eOuterDiv;
  }

</script>

<style>
  .ag-cell {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }

  label {
    font-weight: normal !important;
  }

  .div-percent-bar {
    display: inline-block;
    height: 100%;
    position: relative;
    z-index: 0;
  }

  .div-percent-value {
    position: absolute;
    padding-left: 4px;
    font-weight: bold;
    font-size: 13px;
    z-index: 100;
  }

  .div-outer-div {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  .done {
    padding: 1px 3px;
    background-color: cyan;
  }

  .notdone {
    padding: 1px 3px;
    background-color: yellow;
  }

  .correct {
    padding: 1px 3px;
    background-color: #00cc33;
  }

  .incorrect {
    padding: 1px 3px;
    background-color: red;
  }

  .ag-menu {
    z-index: 200;
  }
</style>
