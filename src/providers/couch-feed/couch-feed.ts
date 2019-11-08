import { Injectable } from '@angular/core';
import PouchDB, { emit } from 'pouchdb';
import Find from 'pouchdb-find'
PouchDB.plugin(Find);


@Injectable()
export class CouchFeedProvider {
  db: any;
  remote: string = 'http://192.100.164.26:5984/place';
  dbNube;
  constructor() {
    //Escuchar los cambios en la base de datos, para que los cambios solo se
    //reflejen en esta sección
    this.db = new PouchDB('place');
    this.dbNube = new PouchDB(this.remote, { skip_setup: true });
    let options = {
      live: true,
      retry: true,
      continuos: true
      //docs_ids: this.getIds().then(ids => { return ids })
    };

    //this.db
    //this.db.replicate.from(this.remote, options);
  }

  getIds() {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true,
      }).then(result => {
       let dataLocal = [];
        let docs = result.rows.map((row) => {
          if (row.doc.key == 'plan') {
            dataLocal.push(row.doc._id);
          }
        });
        resolve(dataLocal);
      });
    });
  }

}
