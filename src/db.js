import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db')

export class DB {
    static init() {
        return new Promise((res, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMIRY KEY NOT NULL, text TEXT NOT NULL, image NOT NULL, date TEXT, booked INT)',
                    [],
                    res,
                    (_, err) => reject(err)
                )
            })
        })
    }
    static getPosts() {
        return new Promise((res, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM posts',
                    [],
                    (_, result) => res(result.rows._array),
                    (_, err) => reject(err)
                )
            })
        })
    }
}