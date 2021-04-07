import * as DELETEBooks from '../requests/deleteBooks.request';
import * as GETBooks from '../requests/getBooks.request';
import * as POSTBooks from '../requests/postBooks.request';
import * as PUTBooks from '../requests/putBooks.request';

describe('CRUDS de livros', () => {

    it('Listar todos os livros', () => {
        GETBooks.allBooks().should((response) => {
            expect(response.body).to.be.not.null;
        })
    });

    it('Adicionar um novo livro', () => {
        POSTBooks.addBook().should((response) => {
            //expect(response.status).to.eq(200);
            expect(response.body.Title).to.eq("Livro");
        })
    });

    it('Deletar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            DELETEBooks.deleteBook(resAllBooks.body[0].ID).should((resDeleteBook) => {
                //expect(resDeleteBook.status).to.eq(200);
            })
        })
    });

    it('Criar e excluir um livro', () => {
        POSTBooks.addBook().then((resAddBook) => {
            DELETEBooks.deleteBook(resAddBook.body.ID).should((resDeleteBook) => {
                //expect(resDeleteBook.status).to.eq(200)
            })
        })
    });

    it('Alterar um livro', () => {
        GETBooks.allBooks().then((resAllBooks) => {
            PUTBooks.changeBook(resAllBooks.body[0].ID).should((resChangeBook) => {
                //expect(resChangeBook.status).to.eq(200);
                expect(resChangeBook.body).to.be.not.null;
                expect(resChangeBook.body.Title).to.eq('Livro alterado');
            })
        })
    });

    it('Criar e alterar um livro', () => {
        POSTBooks.addBook().then((resAddBook) => {
            PUTBooks.changeBook(resAddBook.body.ID).should((resChangeBook) => {
                //expect(resChangeBook.status).to.eq(200);
                expect(resChangeBook.body).to.be.not.null;
                expect(resChangeBook.body.Title).to.eq('Livro alterado');
            })
        })
    });

});