import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Book } from './book';
import { Popup } from 'ng2-opd-popup';



import 'rxjs/Rx';

@Component({    
    selector: 'my-app',
    templateUrl: './app.component.html',

})

export class AppComponent {

    booksFromJson: Array<Book> = [];
    booksChecked: Array<Book> = [];
    bookToChange: Book;
    @ViewChild('popupEdit') popupEdit: Popup;
    @ViewChild('popupAdd') popupAdd: Popup;

    constructor(
        private http: Http,
    ) {
        this.http.get('/assets/booklist.json').map(res => res.json()).subscribe(res => this.initialize(res));



    }

    initialize(lst: any) {

        this.booksFromJson = lst;
        // from now on your object will be set
        this.confirmCleanTextInBookList();
    }

    onClickEditBook(bookToEdit: Book) {
        this.bookToChange = bookToEdit;
        this.popupEdit.options = {
            cancleBtnClass: "btn btn-default",
            confirmBtnClass: "btn btn-default",
            color: "#5cb85c",
            header: "Edit Book",
            confirmBtnContent: "Edit Book",
            cancleBtnContent: "Cancel", 
            widthProsentage: 60,
            animation: "fadeInUp"
        }
        this.popupEdit.show(this.popupEdit.options);
    }
    

    

    onConfirmEditBook(author: string, publish: Date, title: string) {
        let newBook = new Book(author, publish, title);
        this.booksChecked.push(newBook);
        this.popupEdit.hide();
        this.removeBookFromArray(this.bookToChange);

    }

    removeBookFromArray(book: Book) {
        let index = this.booksChecked.indexOf(book);
        this.booksChecked.splice(index, 1);
    }

    onCancelEditBook() {
        this.popupEdit.hide();
    }

    onClickAddBook() {
        this.popupAdd.options = {
            cancleBtnClass: "btn btn-default",
            confirmBtnClass: "btn btn-default",
            color: "#5cb85c",
            header: "Add Book",
            confirmBtnContent: "Add Book",
            cancleBtnContent: "Cancel",
            widthProsentage: 60,
            animation: "fadeInUp"
        }
        this.popupAdd.show(this.popupAdd.options);
    }

    onConfirmAddBook(author: string, publish: Date, title: string) {
        let newBook = new Book(author, publish, title);
        this.booksChecked.push(newBook);
        this.popupAdd.hide();

    }

    onCancelAddBook() {
        this.popupAdd.hide();
    }

    confirmCleanTextInBookList() {
        for (let book of this.booksFromJson) {
            let newBook: Book = new Book(book.author, book.publish, book.title);
            this.booksChecked.push(newBook);
        }
    }

}



