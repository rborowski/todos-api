const { ObjectId } = require("mongodb")
const db = require("../data/database")

class Todo {
  constructor(text, id) {
    this.text = text
    this.id = id
  }

  static async getAllTodos(){
    const todoDocuments = await db.getDb().collection("todos").find().toArray()

    return todoDocuments.map((doc) => new Todo(doc.text, doc._id))
  }

  save() {
    if (!this.id) {
      return db.getDb().collection("todos").insertOne({text: this.text})
    }

    const todoId = new ObjectId(this.id)
    return db.getDb().collection("todos").updateOne({_id: todoId}, {$set: { text: this.text }})
  }

  delete(){
    if(!this.id) {
      throw new Error("trying to delete todo without id")
    }

    const todoId = new ObjectId(this.id)
    return db.getDb().collection("todos").deleteOne({_id: todoId})
  }


} 



module.exports = Todo