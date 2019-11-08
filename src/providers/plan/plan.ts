import { Injectable } from '@angular/core';
import PouchDB, { emit } from 'pouchdb';
import Find from 'pouchdb-find'
PouchDB.plugin(Find);

@Injectable()
export class PlanProvider {
  //PouchDB.plugin(require('pouchdb-authentication'));
  data: any[];
  dataLocal: any[];
  db: any;
  remote: string = 'http://192.100.164.26:5984/place';
  dbNube: any;
  planes: any;
  constructor() {
    let that = this;
    this.db = new PouchDB('place');
    this.dbNube = new PouchDB(this.remote, { skip_setup: true });
    let options = {
      live: true,
      retry: true,
     // docs_ids: this.getIds().then(ids => { return ids })
    };
    this.dbNube.changes({
      since: 'now',
      live: true,
      retry: true,
      include_docs: true
    }).on('change', function(change) {
      // handle change
      console.log(change.doc._id);
      that.comprobarPlan(change.doc);

    }).on('complete', function(info) {
      console.log(info);
      // changes() was canceled
    }).on('error', function (err) {
      console.log(err);
    });
    
    //this.db
    this.db.replicate.from(this.remote, options);
  }

  getPlanNube(id: string) {
    return new Promise(resolve => {
      this.dbNube.get(id)
        .then(data => {
          resolve(data);
        })
    })
  }

  getTodosLocales() {

  }

  getTodos() {
    return new Promise(resolve => {
      this.dbNube.allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  createTodo(todo) {
    this.db.post(todo);
  }

  updateTodo(todo) {
    return this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  getAllPlanes() {
    return new Promise(resolve => {
      this.db.get('planes').then(function (doc) {
        resolve(doc);
      }).then(function (result) {
        // handle result
      }).catch(function (err) {
        console.log(err);
      });
    });
  }

  deleteTodo(todo) {
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.dataLocal.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    //A document was deleted
    if (change.deleted) {
      this.dataLocal.splice(changedIndex, 1);
    }
    else {
      //A document was updated
      if (changedDoc) {
        this.dataLocal[changedIndex] = change.doc;
      }

      //A document was added
      else {
        if(change.doc.key != 'plan')
        this.dataLocal.push(change.doc);
      }
    }
  }



  comprobarPlan(plan) {
    let nivel = this;
    this.db.get(plan._id)
      .then(function (doc) {
        // if (doc == null) {
        //   nivel.db.post(plan);
        // }
        // else {
        plan._rev = doc._rev;
        nivel.db.put(plan);
        //  }
      })
      .catch(function () {
        delete plan['_rev'];
        nivel.db.post(plan);
      });
  }

  getTodosDocs(email) {
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
      }).then((result) => {
        this.dataLocal = [];

        let docs = result.rows.map((row) => {
          if (row.doc.key == 'paciente' && row.doc.usuario == email) {
            this.dataLocal.push(row.doc);
          }
        });

        resolve(this.dataLocal);

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change',
          (change) => {
             this.handleChange(change);
          });

      }).catch((error) => {
        console.log(error);
      });
    });
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

  getIds() {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true,
      }).then(result => {
        this.dataLocal = [];
        let docs = result.rows.map((row) => {
          if (row.doc.key == 'plan') {
            this.dataLocal.push(row.doc._id);
          }
        });
        resolve(this.dataLocal);
      });
    });
  }

  elimninarDB() {
    this.db.destroy().then(function (response) {
      // success
    }).catch(function (err) {
      console.log(err);
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.dbNube.logIn(username, password, function (err, response) {
        if (err) {
          if (err.name === 'unauthorized' || err.name === 'forbidden') {
            // name or password incorrect
            reject(err);
          } else {
            reject(err);
            // cosmic rays, a meteor, etc.
          }
        }
        else {
          resolve(true);
        }
      });
    });

  }

  signup(username, password) {
    return new Promise((resolve, reject) => {
      this.dbNube.signUp(username, password, function (err, response) {
        if (err) {
          if (err.name === 'conflict') {
            reject('Este Correo ya se encuentra registrado')
            // "batman" already exists, choose another username
          } else if (err.name === 'forbidden') {
            // invalid username
          } else {
            // HTTP error, cosmic rays, etc.
          }
        }
        else {
          resolve(true);
        }
      });
    })
  }

  getPlanesEvaluacion(_id) {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true,
        //key: 'paciente'
      }).then(result => {
        this.dataLocal = [];

        let docs = result.rows.map((row) => {
          if (row.doc.key == 'evaluacion' && row.doc.pacienteId == _id) {
            this.dataLocal.push(row.doc);
          }
        });

        resolve(this.dataLocal);
      });
    });
  }

  getPacienteById(_id)
  {
    return new Promise(resolve => {
      return this.db.allDocs({
        include_docs: true,
        //key: 'paciente'
      }).then(result => {
        this.dataLocal = [];

        let docs = result.rows.map((row) => {
          if (row.doc.key == 'paciente' && row.doc._id == _id) {
            this.dataLocal.push(row.doc);
          }
        });
        resolve(this.dataLocal);
      });
    });
  }
}
