const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/mongoDB')
.then(()=>{
  console.log('Connection to mongodb successfull');
  
}).catch((error)=>{
  console.log(error);
  
})

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  year: {type: Number, required: true},
  isPublished: {type: Boolean, required: true},
  publishedDate: {type: Date, default: Date.now},
  ratings: {type: Number, required: true}
})

const Book = mongoose.model('Book', bookSchema)

async function createBook(){
  const book = new Book({
    title: 'JavaScript',
    author: 'NetScape',
    year: 1995,
    isPublished: true,
    ratings: 5.0
  })
  await book.save()
  console.log(book)
}

createBook()


async function updateBook(id){
  const book = await Book.findById(id)
  if(!book)return
  book.title = 'Java',
  book.author = 'Jona',
  book.year = 2012
  await book.save()
  console.log(book);
  
  
}

async function deleteBook(id){
  const book = await Book.findByIdAndDelete(id)
  if(!book) return

  console.log(book);
  
}


async function getBook(){
  const book = await Book.find({ratings: {$in: [3.2, 4]}}).select({author: 'Jonas'}).or([{ratings: 4}, {author: 'Jonas'}])
}