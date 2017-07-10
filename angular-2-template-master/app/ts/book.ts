export class Book {
    author: string;
    publish: Date;
    title: string;

    constructor(_author: string, _publish: Date, _title: string) {
        this.author = _author;
        this.publish = _publish;
        this.title = this.cleanTitle(_title);
    }



    get getAuthor() {
        return this.author;
    }

    set setAuthor(inputAuthor: string) {
        this.author = inputAuthor;
    }

    get getDate() {
        return this.publish;
    }

    set setDate(inputDate: Date) {
        this.publish = inputDate;
    }

    get getTitle() {
        return this.title;
    }

    set setTitle(inputTitle: string) {
        this.title = this.cleanTitle(inputTitle);
    }

    isLetter(c) {
        return c.toLowerCase() != c.toUpperCase();
    }

    whatKindOfChar(c) {
        if (c.toLowerCase() == c && this.isLetter(c)) {
            return 1;
        }
        else if (c.toUpperCase() == c && this.isLetter(c)) {
            return 2;
        }
        else if (c == " " || c == "\t" || c == "\"" || c == "\'") {
            return 3;
        }
        else {
            return 4;
        }
    }

    isBegnningOfWord(c, i: number, title: string) {
        var flag = true;
        if (i == 0) {
            flag = true;
        }
        else {
            if (title[i - 1] == ' ' || title[i - 1] == '\t') {
                flag = true;
            }
            else {
                flag = false;
            }
        }
        return flag;
    }


    public cleanTitle(title: string) {
        
        var i;
        var c;
        var txt = "";
        for (i = 0; i < title.length; i++) {
            c = title[i];
            let typeOfChar: number = this.whatKindOfChar(c);
            if (typeOfChar == 1) {
                if (this.isBegnningOfWord(c, i, title)) {
                    c = c.toUpperCase();
                }
                txt = txt + c;
            }
            else if (typeOfChar == 2) {
                if (!this.isBegnningOfWord(c, i, title)) {
                    c = c.toLowerCase();
                }
                txt = txt + c;
            }
            else if (typeOfChar == 3) {
                txt = txt + c;
            }
            else
            {
                //unwanted case
            }


        }
        return txt;

    }


}