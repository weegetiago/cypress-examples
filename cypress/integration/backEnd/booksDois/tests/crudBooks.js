import * as DELETEBooks from '../../../support/books/requests/deleteBooks.request';
import * as GETBooks from '../../../support/books/requests/getBooks.request';
import * as POSTBooks from '../../../support/books/requests/postBooks.request';
import * as PUTBooks from '../../../support/books/requests/putBooks.request';

describe('CRUDS de livros (exemplo formato 2)', () => {

    it('01 Listar todos os livros', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.body).to.be.not.null;
        })
    });

    it('02 Adicionar um novo livro', () => {
        POSTBooks.addBook().should((response) => {
            expect(response.status).to.eq(200);
        })
    });

    it('03 Deletar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            DELETEBooks.deleteBook(resAllBooks.body[0].ID).should((resDeleteBook) => {
                expect(resDeleteBook.status).to.eq(200);
            })
        })
    });

    it('04 Criar e excluir um livro', () => {
        POSTBooks.addBook().then((resAddBook) => {
            DELETEBooks.deleteBook(resAddBook.body.ID).should((resDeleteBook) => {
                expect(resDeleteBook.status).to.eq(200)
            })
        })
    });

    it.only('05 Alterar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            PUTBooks.changeBook(resAllBooks.body[0].ID).should((resChangeBook) => {
                //expect(resChangeBook.status).to.eq(200);
                expect(resChangeBook.body).to.be.not.null;
                //expect(resChangeBook.body.Title).to.eq('Livro alterado');
            })
        })
    });

    it('06 Criar e alterar um livro', () => {
        POSTBooks.addBook().then((resAddBook) => {
            PUTBooks.changeBook(resAddBook.body.ID).should((resChangeBook) => {
                expect(resChangeBook.status).to.eq(200);
                expect(resChangeBook.body).to.be.not.null;
                expect(resChangeBook.body.Title).to.eq('Livro alterado');
            })
        })
    });

});