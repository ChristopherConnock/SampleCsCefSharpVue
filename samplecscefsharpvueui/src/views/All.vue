<template>
  <v-container>
    <v-text-field
        v-model="base"
        label="Base Key"
        @input="changeBase"
    ></v-text-field>
    <v-text-field
        v-model="api"
        label="API Key"
        placeholder=api
        @input="changeAPI"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="records"
      :items-per-page="10"
      group-by="Model Name"
      show-select
    >
      <template v-slot:item.GUID="{ item }">
          <v-chip
            @click="getSelRecord(item.GUID)"
          ></v-chip>
      </template>
      <template v-slot:item.Layer="props">
          <v-edit-dialog
          :return-value.sync="props.item.Layer"
          large
          persistent
          @save="save(props.item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          >
          <div>{{ props.item.Layer }}</div>
          <template v-slot:input>
              <div class="mt-4 title">Update Layer</div>
          </template>
          <template v-slot:input>
              <v-text-field
              v-model="props.item.Layer"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
              ></v-text-field>
          </template>
          </v-edit-dialog>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable space-before-function-paren */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable arrow-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */

import airtable from 'airtable';

export default {

  data: function () {
    return {
      apiUrl: 'https://api.airtable.com/v0/',
      base: 'appCsWCNRzXYWuVeq',
      api: 'keyrS1SM6lt5421S3',
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      records: [],
      selected: [],
      headers: [
                { text: 'id', value: 'id' },
                { text: 'GUID', value: 'GUID' },
                { text: 'Layer', value: 'Layer' },
                { text: 'Model Name', value: 'Model Name' },
                { text: 'time', value: 'time' }
                ],
    };
  },

  mounted: function () {
    this.refresh();
  },

  methods: {

    refresh (){
        this.getTable();
        // this.getRecord();
    },

    getTable: function () {
        var allrecs = [];
        var base = new airtable({apiKey: this.api}).base(this.base);
        base('Objects').select({
        // Selecting the first 3 records in Main View:
        maxRecords: 200,
        view: "Main View"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function(record) {
                //console.log('Retrieved', record.get('GUID'));
                //var rec = {id: record.id, GUID: record.fields["GUID"], Notes: record.fields["Notes"], Date: record.fields["Date"]};
                allrecs.push(record);
            });
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        }).then(records => {
            //dumb hack to get rid of error that records is not being used
            //don't know why this.records isn't available in loop
            let recordedrecs = records
            recordedrecs = []
            for (let i = 0; i < allrecs.length; i++){
                let recdict = {}
                for (let j = 0; j < this.headers.length; j++){
                    let field = this.headers[j].text
                    recdict[field] = allrecs[i].fields[field]
                }
                //for some reason this needs to happen inside inner loop
                recdict["id"] = allrecs[i].id
                recordedrecs.push(recdict)
            }
            this.records = recordedrecs
        })
    },

    getRecord: function () {
       var base = new airtable({apiKey: this.api}).base(this.base);
       base('Objects')
           .find('recJbzJGt5Uzch99G')
           .then(record =>{
            //    this.records.push(record);
               let recdict = {};
                for (let i = 0; i < this.headers.length; i++){
                    let field = this.headers[i].text;
                    //console.log(field);
                    //console.log(record.fields);
                    recdict[field] = record.fields[field];
                }
                //for some reason this needs to happen inside inner loop
                recdict["id"] = record.id;
                //console.log(recdict);
                this.records.push(recdict);
           });
    },

    updateRecord: function (record){ 
        var base = new airtable({apiKey: this.api}).base(this.base);
        console.log(record);
        base('Objects').update(record, function(err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function(record) {
                console.log(record.get('GUID'));
            });
        });
    },

    changeBase () {
        this.refresh();
    },

    changeAPI () {
        this.refresh();
    },

    //function trigger on edit box click
    save (val) {
        //console.log(val["GUID"]);
        let r = {};
        let fields = {};
        for (let i = 0; i < this.headers.length; i++){
            
            let f = this.headers[i].text
            if(f==='id' || f==='time') continue
            //console.log(field);
            //console.log(record.fields);
            fields[f] = val[f]
        }
        //for some reason this needs to happen inside inner loop
        r["id"] = val.id
        r["fields"] = fields
        let record = []
        record.push(r)
        //create record
        // console.log(record);
        this.updateRecord(record)
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      //console.log('Dialog closed')
    },
    getSelRecord(val){
        console.log(val)
    }
  }
}
</script>
