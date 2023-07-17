import { BaseClient } from 'src/api/client';
import { AxiosError } from 'axios'

interface Note {
    id: string;
    user_id: string;
    title: string;
    body: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export const ListNotes = async (userID: string): Promise<Note[]> => {
    const response = await BaseClient(userID).get('/notes/list').catch((error: AxiosError) => {
        console.error("Error Listing Notes:", error.code);
    });
    return response?.data;
}

export const ListArchiveNotes = async (userID: string): Promise<Note[]> => {
    const response = await BaseClient(userID).get('/notes/list/archived').catch((error: AxiosError) => {
        console.error("Error Listing Archived Notes:", error.code);
    });
    return response?.data;
}

export const ListDeletedNotes = async (userID: string): Promise<Note[]> => {
    const response = await BaseClient(userID).get('/notes/list/deleted').catch((error: AxiosError) => {
        console.error("Error Listing Deleted Notes:", error.code);
    });
    return response?.data;
}

export const GetNote = async (userID: string, noteID: string): Promise<Note> => {
    const response = await BaseClient(userID).get(`/notes/get/${noteID}`).catch((error: AxiosError) => {
        console.error("Error Getting Note:", error.code);
    });
    return response?.data;
}

export interface NoteRequest {
    title: string;
    body: string;
    status: NoteStatus;
}

export enum NoteStatus {
    ARCHIVED = "ARCHIVED",
    DELETED = "DELETED",
    ACTIVE = "ACTIVE",
}

export const CreateNote = async (userID: string, note: NoteRequest) => {
    const response = await BaseClient(userID).post('/notes/create', note).catch((error: AxiosError) => {
        console.error("Error Creating Note:", error.code);
    });
    return response?.data;
}

export const UpdateNote = async (userID: string, noteID: string, note: NoteRequest) => {
    const response = await BaseClient(userID).post(`/notes/update/${noteID}`, note).catch((error: AxiosError) => {
        console.error("Error Updating Note:", error.code);
    });
    return response?.data;
}