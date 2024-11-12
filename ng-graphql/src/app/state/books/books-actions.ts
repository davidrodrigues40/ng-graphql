import { createActionGroup, props } from "@ngrx/store";
import { GraphQlQuery } from "src/app/graphQl/models/graphql-query";
import { Book } from "src/app/graphQl/queryTypes/book";

export const BooksActions = createActionGroup({
    source: 'BOOKS',
    events: {
        'Search Books': props<{ query: GraphQlQuery }>(),
        'Search Books Success': props<{ books: Array<Book> }>()
    }
});