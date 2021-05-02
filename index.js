const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongodbga ulandi...')
    })
    .catch((err) => {
        console.error('mongodbga ulanishda xato ro`y  berdt', err)
    })

const bookSchema = new mongoose.Schema({
    name: String,
    auther: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublishid: Boolean
})

const Book = mongoose.model("Book", bookSchema)

async function createBook() {

    const book = new Book({
        name: " js asolari ",
        auther: "Obid Sharipov",
        tags: ['Dasturlash','react', 'js'],
        isPublishid: true
    })
    const saveBook = await book.save()
    console.log(saveBook)

}
async function getBooks() {

    const pageNumber=2
    const pageSize=10

    const books = await Book
    .find({auther:'Obid Sharipov'})
      
        .skip( (pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort({ name: 1 })
           .select({name:1,tags:1})
            .countDocuments()
          
            


    console.log(books)
}
getBooks()
