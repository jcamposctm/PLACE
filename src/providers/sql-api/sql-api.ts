import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from 'ionic-angular';

@Injectable()
export class SqlApiProvider {

  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(public sqlite: SQLite, public platform: Platform) {

  }

  create_table_historial = `CREATE TABLE IF NOT EXISTS Evaluacion(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    PacienteId TEXT,
    Resultado TEXT,
    Indicador TEXT,
    Fecha DATE,
    Calificacion INTEGER
  )`;

  query_historial = `SELECT 
                      Resultado, 
                      Indicador,
                    MAX(Fecha) AS Fecha
                    FROM EVALUACION WHERE PacienteId = ?
                    GROUP BY Resultado, Indicador
                    `;

  //query_historial = `SELECT * FROM EVALUACION`;

  getEvaluacion(pacienteId) {
    return this.isReady()
      .then(
        () => {
          // return this.database.executeSql(this.query_historial, [pacienteId])
          return this.database.executeSql(this.query_historial, [pacienteId])
            .then(data => {
              let result = [];
              let cont = data.rows.length;
              for (let i = 0; i < cont; i++) {
                let current_datetime =  new Date(data.rows.item(i).Fecha);
                data.rows.item(i).Fecha = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                result.push(data.rows.item(i));
              }
              console.log(result);
              return result;
            })
            .catch(error => {
              console.log(error);
            })
        }
      )
  }

  postEvaluacion(evaluacion) {
    return new Promise(resolve => {
      return this.isReady()
        .then(() => {
          return this.database.executeSql(`INSERT INTO Evaluacion (PacienteId, Resultado, Indicador, Fecha, Calificacion) VALUES(?,?,?,?,?)`,
            [evaluacion.pacienteId, evaluacion.resultado, evaluacion.indicador, evaluacion.fecha, evaluacion.calificacion])
        })
        .then(data => {
          if (data.insertId) {
            console.log('Evaluacion registrada en SQL');
            resolve(true);
          }
        })
        .catch(error => {
          console.log(error);
        })
    })

  }

  cargarSQLite() {
    return this.sqlite.create({ name: 'placeDB.db', location: 'default' }).then((db: SQLiteObject) => {
      this.database = db;
      console.log('Creando tablas');
      return this.database.executeSql(this.create_table_historial, [])
        .then(() => {
          console.log('Base de datos cargada correctamente');
          return this.dbReady.next(true);
        });
    });
  }

  private isReady() {
    return new Promise((resolve, reject) => {
      //if dbReady is true, resolve
      if (this.dbReady.getValue()) {
        resolve();
      }
      //otherwise, wait to resolve until dbReady returns true
      else {
        this.dbReady.subscribe((ready) => {
          if (ready) {
            resolve();
          }
        });
      }
    });
  }

  createTables(): any {
    return this.database.executeSql(`CREATE TABLE IF NOT EXISTS Usuario(
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Email TEXT,
      Password TEXT,
    )`);
  }

  crearUsuario(Email: string, Password: string) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("INSERT INTO Usuario (Email, Password) VALUES (?,?)", [Email, Password])
          .then((data) => {
            if (data.insertId) {
              console.log('Usuario Creado');
              return true;
            }
          });
      });
  }

  loguearUsuario(usuario) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM Usuario WHERE Email = ? AND Password = ?",
          [usuario.email, usuario.password])
          .then(data => {
            if (data.rows.length > 0) {
              console.log('Usuario logueado');
              return true
            }
            else {
              console.log('No coinciden el usuario y la contraseña');
              return false;
            }
          })
          .catch(error => {
            console.log('Hubo un error: ' + error);
            return false;
          })
      });
  }


}
