import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateNote = {
  body: Scalars["String"]["input"];
  pinned: Scalars["Boolean"]["input"];
  status: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createNote: Note;
  deleteNote: Scalars["String"]["output"];
  emptyTrash: Array<Note>;
  updateNote: Note;
};


export type MutationCreateNoteArgs = {
  input: CreateNote;
};


export type MutationDeleteNoteArgs = {
  id: Scalars["String"]["input"];
};


export type MutationUpdateNoteArgs = {
  input: UpdateNote;
};

export type Note = {
  __typename?: "Note";
  body: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  deletedAt?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  pinned: Scalars["Boolean"]["output"];
  status: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  note: Note;
  notes: Array<Note>;
};


export type QueryNoteArgs = {
  id: Scalars["String"]["input"];
};


export type QueryNotesArgs = {
  status?: InputMaybe<Status>;
};

export enum Status {
  Active = "ACTIVE",
  Archived = "ARCHIVED",
  Deleted = "DELETED"
}

export type UpdateNote = {
  body: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
  pinned: Scalars["Boolean"]["input"];
  status: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateNewNoteMutationVariables = Exact<{
  input: CreateNote;
}>;


export type CreateNewNoteMutation = { __typename?: "Mutation", createNote: { __typename?: "Note", id: string, title: string, body: string, status: string, createdAt: string, updatedAt: string, deletedAt?: string | null, userId: string } };

export type DeleteNoteMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;


export type DeleteNoteMutation = { __typename?: "Mutation", deleteNote: string };

export type RemoveDeletedMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveDeletedMutation = { __typename?: "Mutation", emptyTrash: Array<{ __typename?: "Note", id: string, title: string, body: string, status: string, pinned: boolean, createdAt: string, updatedAt: string, userId: string }> };

export type UpdateNoteMutationVariables = Exact<{
  input: UpdateNote;
}>;


export type UpdateNoteMutation = { __typename?: "Mutation", updateNote: { __typename?: "Note", id: string, title: string, body: string, status: string, pinned: boolean, createdAt: string, updatedAt: string, userId: string } };

export type GetNotesQueryVariables = Exact<{
  status: Status;
}>;


export type GetNotesQuery = { __typename?: "Query", notes: Array<{ __typename?: "Note", id: string, body: string, title: string, status: string, pinned: boolean, userId: string, createdAt: string, updatedAt: string, deletedAt?: string | null }> };


export const CreateNewNoteDocument = gql`
    mutation CreateNewNote($input: CreateNote!) {
  createNote(input: $input) {
    id
    title
    body
    status
    createdAt
    updatedAt
    deletedAt
    userId
  }
}
    `;
export type CreateNewNoteMutationFn = Apollo.MutationFunction<CreateNewNoteMutation, CreateNewNoteMutationVariables>;

/**
 * __useCreateNewNoteMutation__
 *
 * To run a mutation, you first call `useCreateNewNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewNoteMutation, { data, loading, error }] = useCreateNewNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewNoteMutation, CreateNewNoteMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<CreateNewNoteMutation, CreateNewNoteMutationVariables>(CreateNewNoteDocument, options);
}
export type CreateNewNoteMutationHookResult = ReturnType<typeof useCreateNewNoteMutation>;
export type CreateNewNoteMutationResult = Apollo.MutationResult<CreateNewNoteMutation>;
export type CreateNewNoteMutationOptions = Apollo.BaseMutationOptions<CreateNewNoteMutation, CreateNewNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation DeleteNote($id: String!) {
  deleteNote(id: $id)
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
}
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const RemoveDeletedDocument = gql`
    mutation RemoveDeleted {
  emptyTrash {
    id
    title
    body
    status
    pinned
    createdAt
    updatedAt
    userId
  }
}
    `;
export type RemoveDeletedMutationFn = Apollo.MutationFunction<RemoveDeletedMutation, RemoveDeletedMutationVariables>;

/**
 * __useRemoveDeletedMutation__
 *
 * To run a mutation, you first call `useRemoveDeletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDeletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDeletedMutation, { data, loading, error }] = useRemoveDeletedMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveDeletedMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDeletedMutation, RemoveDeletedMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<RemoveDeletedMutation, RemoveDeletedMutationVariables>(RemoveDeletedDocument, options);
}
export type RemoveDeletedMutationHookResult = ReturnType<typeof useRemoveDeletedMutation>;
export type RemoveDeletedMutationResult = Apollo.MutationResult<RemoveDeletedMutation>;
export type RemoveDeletedMutationOptions = Apollo.BaseMutationOptions<RemoveDeletedMutation, RemoveDeletedMutationVariables>;
export const UpdateNoteDocument = gql`
    mutation UpdateNote($input: UpdateNote!) {
  updateNote(input: $input) {
    id
    title
    body
    status
    pinned
    createdAt
    updatedAt
    userId
  }
}
    `;
export type UpdateNoteMutationFn = Apollo.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, options);
}
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const GetNotesDocument = gql`
    query GetNotes($status: Status!) {
  notes(status: $status) {
    id
    body
    title
    status
    pinned
    userId
    createdAt
    updatedAt
    deletedAt
  }
}
    `;

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetNotesQuery(baseOptions: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
}
export function useGetNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
}
export function useGetNotesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return Apollo.useSuspenseQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
}
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>;
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>;
export type GetNotesSuspenseQueryHookResult = ReturnType<typeof useGetNotesSuspenseQuery>;
export type GetNotesQueryResult = Apollo.QueryResult<GetNotesQuery, GetNotesQueryVariables>;
