import React from 'react';
import {FormGroup,Label,Input,Modal,ModalHeader,ModalBody,ModalFooter,Table,Button } from 'reactstrap';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      books:[],
      newBookData:{
        Title:"",
        Author:"",
        ISBN:"",
        PublicationDate:"",
        Publisher:"",
        Price:"",
        Genre:"Non-fiction",
        Format:"pdf"
      },
      editBookData:{
        id:"",
        Title:"",
        Author:"",
        ISBN:"",
        PublicationDate:"",
        Publisher:"",
        Price:"",
        Genre:"",
        Format:""
      },
      search:'',
      modal: false,
      editBookModal :false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleEditBookModal = this.toggleEditBookModal.bind(this);
  }

  async componentDidMount(){
    const url="http://localhost:3005/books";
    const response= await fetch(url);
    const data= await response.json();
    this.setState({books:data})
    console.log(data);
    console.log("asd");
  }

  toggle() {
    this.setState({modal: !this.state.modal});
}
toggleEditBookModal(id,Title, Author, ISBN, PublicationDate, Publisher, Price, Genre, Format) {
  this.setState({editBookModal: !this.state.editBookModal})
  this.setState({
    editBookData:{id,Title, Author, ISBN, PublicationDate, Publisher, Price, Genre, Format}, editBookModal:!this.state.editBookModal   });
}

addBook(){
  console.log("here")
  axios.post('http://localhost:3005/books',this.state.newBookData).then((response)=>{
           let {books}=this.state;
           books.push(response.data);
           this.setState({books,modal:false,
            newBookData:{
                Title:'',
                Author:'',
                ISBN:'',
                PublicationDate:'',
                Publisher:'',
                Price:'',
                Genre:'',
                Format:''
            }});
  });
}
_refreshBooks()
{
    axios.get('http://localhost:3005/books').then((response)=>
    {
        this.setState({ 
            books:response.data
        })
    })
}

updateBook(){
  console.log("hii");
  let {id,Title, Author, ISBN, PublicationDate, Publisher, Price, Genre,Format}=this.state.editBookData;
  console.log(id);
  axios.put('http://localhost:3005/books/' + this.state.editBookData.id,
  {id,Title, Author, ISBN, PublicationDate, Publisher, Price, Genre,Format}).then((response)=>{
  this._refreshBooks();
  this.setState({
      editBookModal:false, editBookData:{
         id:"",
          Title:'',
          Author:'',
          ISBN:'',
          PublicationDate:'',
          Publisher:'',
          Price:'',
          Genre:'',
          Format:''
      }
      
      
  }) 
  });
  }

  deleteBook(id)
{
    axios.delete('http://localhost:3005/books/'+id).then((response)=>
    {
this._refreshBooks();
    });
}

searchlist(e) {
  this.setState({ search: e.target.value });
  }

editBook(Title,Author,ISBN,PublictionDate,Publisher,Price,Genre,Format){
this.setState({
updateBookData:{Title,Author,ISBN,PublictionDate,Publisher,Price,Genre,Format},updateBookModal:!this.state.updateBookModal
});
}
  render(){
    var filterlist = this.state.books.filter(book => {
      return book.Title.toLowerCase().indexOf(this.state.search) !== -1;
      });
    let books=filterlist.map((book)=>{
      return(
        <tr key={book.id}>
          <td>{book.id}</td>
        <td>{book.Title}</td>
          <td>{book.Author}</td>
          <td>{book.ISBN}</td>
          <td>{book.PublicationDate}</td>
          <td>{book.Publisher}</td>
          <td>{book.Price}</td>
          <td>{book.Genre}</td>
          <td>{book.Format}</td>
          <td>
          <Button color="success" size="sm" align="center" onClick={this.toggleEditBookModal.bind(this,book.id,book.Title,book.Author,book.ISBN,book.PublicationDate,book.Publisher,book.Price,book.Genre,book.Format)}>Edit</Button>{' '}
          <Button color="danger" size="sm" align="center" onClick={this.deleteBook.bind(this,book.id)}>Delete</Button>
          </td>
          </tr>
      )
    });
  return (
    
    <div >
      <div class ="container" >
      <h1 align="center">ALL BOOKS</h1>
      <div align = "right">

    <center>
    <input class="searchButton" type="text" placeholder=" Search" value={this.state.search}
    onChange={this.searchlist.bind(this)}/>
    </center>

      </div>
      </div>
      <br></br>
      <Table  align="center">
        <thead class=" table thead">
          <tr>
            <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Publication Date</th>
          <th>Publisher</th>
          <th>Price</th>
          <th>Genre</th>
          <th>Format</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {books}
        </tbody>
      </Table>
      <div align="center">
      <Button color="primary"  onClick={ this.toggle}>Add Book</Button>
      </div>
                <Modal isOpen={this.state.modal} fade={false}
                       toggle={this.toggle} style={{width: "400px", display: "block"}}>
                    <ModalHeader align="center" toggle={this.toggle}>
                        Add a new book
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <Label for="Title">Title</Label>
                        <Input id="Title" value={this.state.newBookData.Title} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Title=e.target.value;

                          this.setState({newBookData});
                        }}/>

                        <Label for="Author">Author</Label>
                        <Input id="Author" value={this.state.newBookData.Author} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Author=e.target.value;

                          this.setState({newBookData});
                        }}/>

                        <Label for="ISBN">ISBN</Label>
                        <Input id="ISBN" value={this.state.newBookData.ISBN} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.ISBN=e.target.value;

                          this.setState({newBookData});
                        }}/>

                        <Label for="PublicationDate">Publication Date</Label>
                        <Input type="date" id="PublicationDate" value={this.state.newBookData.PublicationDate} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.PublicationDate=e.target.value;

                          this.setState({newBookData});
                        }}/>

                        <Label for="Publisher">Publisher</Label>
                        <Input id="Publisher" value={this.state.newBookData.Publisher} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Publisher=e.target.value;

                          this.setState({newBookData});
                        }}/>

                        <Label for="Price">Price</Label>
                        <Input id="Price" value={this.state.newBookData.Price} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Price=e.target.value;

                          this.setState({newBookData});
                        }}/>
                        <Label for="Genre">Genre :</Label>
                        <br/>
                        <select id="Genre" value={this.state.newBookData.Genre} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Genre=e.target.value;

                          this.setState({newBookData});
                        }}>
                          <option value="Non-Fiction">Non-Fiction</option>
           <option value="Fiction">Fiction</option>
           <option value="Action and adventure">Action and adventure</option>
           <option value="Fairytale">Fairytale</option>
           <option value="Fantasy">Fantasy</option>
           <option value="Horror">Horror</option>
           <option value="Mystery">Mystery</option>
           <option value="Poetry">Poetry</option>
           <option value="Science fiction">Science fiction</option>
           <option value="Thriller">Thriller</option>
           <option value="Travel">Travel</option>
           <option value="Math">Math</option>
           <option value="Autobiography">Autobiography</option>
           <option value="Dairy">Dairy</option>
                          </select>
                          <br/>
                        <Label for="Format">Format :</Label>
                        <br/>
                        <select id="Format" value={this.state.newBookData.Format} onChange={(e) => {
                          let {newBookData}=this.state;

                          newBookData.Format=e.target.value;

                          this.setState({newBookData});
                        }}>
                          <option value="PDF">pdf</option>
           <option value="word document">word document</option>
           <option value="E-Audio">Audio</option>
                          </select >
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.addBook.bind(this)}>
                           Add Book
                        </Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

 <Modal isOpen={this.state.editBookModal} fade={false}
                       toggle={this.toggleEditBookModal.bind(this)} style={{width: "400px", display: "block"}}>
                    <ModalHeader align="center" toggle={this.toggleEditBookModal.bind(this)}>
                        Edit a book
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <FormGroup>
                        <Label for="Title">Title</Label>
                        <Input id="Title" value={this.state.editBookData.Title} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Title=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="Author">Author</Label>
                        <Input id="Author" value={this.state.editBookData.Author} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Author=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="ISBN">ISBN</Label>
                        <Input id="ISBN" value={this.state.editBookData.ISBN} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.ISBN=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="PublicationDate">Publication Date</Label>
                        <Input type="date" id="PublicationDate" value={this.state.editBookData.PublicationDate} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.PublicationDate=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="Publisher">Publisher</Label>
                        <Input id="Publisher" value={this.state.editBookData.Publisher} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Publisher=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="Price">Price</Label>
                        <Input id="Price" value={this.state.editBookData.Price} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Price=e.target.value;

                          this.setState({editBookData});
                        }}/>

                        <Label for="Genre">Genre :</Label>
                        <br/>
                        <select id="Genre" value={this.state.editBookData.Genre} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Genre=e.target.value;

                          this.setState({editBookData});
                        }}>
                          <option value="Non-Fiction">Non-Fiction</option>
           <option value="Fiction">Fiction</option>
           <option value="Action and adventure">Action and adventure</option>
           <option value="Fairytale">Fairytale</option>
           <option value="Fantasy">Fantasy</option>
           <option value="Horror">Horror</option>
           <option value="Mystery">Mystery</option>
           <option value="Poetry">Poetry</option>
           <option value="Science fiction">Science fiction</option>
           <option value="Thriller">Thriller</option>
           <option value="Travel">Travel</option>
           <option value="Math">Math</option>
           <option value="Autobiography">Autobiography</option>
           <option value="Dairy">Dairy</option>
                          </select>
                          <br/>
                        <Label for="Format">Format :</Label>
                        <br/>
                        <select id="Format" value={this.state.editBookData.Format} onChange={(e) => {
                          let {editBookData}=this.state;

                          editBookData.Format=e.target.value;

                          this.setState({editBookData});
                        }}>
                          <option value="PDF">pdf</option>
           <option value="word document">word document</option>
           <option value="E-Audio">Audio</option>
                          </select>
                        </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.updateBook.bind(this)}>
                           Update Book
                        </Button>{' '}
                        <Button color="danger" onClick={this.toggleEditBookModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
    </div>
  );
}
}
export default App;
