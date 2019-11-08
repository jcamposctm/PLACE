import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
// import { emit } from '';
import PouchDB, { emit } from 'pouchdb';
import Find from 'pouchdb-find'
PouchDB.plugin(Find);

@Injectable()
export class HistorialProvider {
  @Output() typeChanged = new EventEmitter();
  db: any;
  dataLocal: any[];
  constructor(public http: HttpClient) {
    this.db = new PouchDB('place');
    PouchDB.plugin(Find);
  }

  mangoQuery(indicador, resultado) {
    return new Promise((resolve, reject) => {
      let that = this;
      this.db.createIndex({
        index: {
          fields: ['indicador', 'resultado'],
          ddoc: "my-index-Name"
        }
      }).then(function () {
        return that.db.find({
          selector: {
            indicador: indicador,
            resultado: resultado
          },
          use_index: 'my-index-Name'
        })
          .then(data => {
            console.log(data);
            resolve(data);
          })
          .catch( error => {
            reject(error);
          })
      })
    })
  }

  getPlanesDocs() {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true
      }).then(result => {
        this.dataLocal = [];
        let docs = result.rows.map((row) => {
          if (row.doc.key == 'plan') {
            this.dataLocal.push(row.doc);
          }
        });
        resolve(this.dataLocal);
      });
    });
  }

  getHistorialPaciente(resultado: string, indicador: string) {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true
      }).then(result => {
        this.dataLocal = [];
        let docs = result.rows.map((row) => {
          if (row.doc.key == 'plan') {
            this.dataLocal.push(row.doc);
          }
        });
        resolve(this.dataLocal);
      });
    });
  }
}
