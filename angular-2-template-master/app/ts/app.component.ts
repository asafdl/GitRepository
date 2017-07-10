import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import { Book } from './book';
//import { EditBookModal } from './edit.book.component';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
//import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'app/ts/app.component.html',
    

})

export class AppComponent {

    booksFromJson: Array<Book> = [];
    booksChecked: Array<Book> = [];

    constructor(private http: Http) {
        this.http.get('app/assets/booklist.json').map(res => res.json()).subscribe(res => this.initialize(res));


        
    }

    initialize(lst: any) {

        this.booksFromJson = lst;
        // from now on your object will be set
        this.confirmCleanTextInBookList();
    }

    onClickRemoveBook(bookToEdit: Book) {
        let index = this.booksChecked.indexOf(bookToEdit);
        this.booksChecked.splice(index, 1);
    }

    onClickEditNewBook(author: string, publish: Date, title: string) {
        let newBook = new Book(author, publish, title);
        this.booksChecked.push(newBook);
    }
    confirmCleanTextInBookList() {
        for (let book of this.booksFromJson) {
            let newBook: Book = new Book(book.author, book.publish, book.title);
            this.booksChecked.push(newBook);
        }
    }

}
	
	

