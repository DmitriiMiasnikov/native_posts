import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    return new Promise((res, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
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
  static createPost({ text, date, booked, img }) {
    return new Promise((res, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
          [text, date, 0, img],
          (_, result) => res(result.insertId),
          (_, err) => reject(err)
        )
      })
    })
  }
  static updatePost(post) {
    return new Promise((res, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          res,
          (_, err) => reject(err)
        )
      })
    })
  }
  static removePost(id) {
    return new Promise((res, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          res,
          (_, err) => reject(err)
        )
      })
    })
  }
}