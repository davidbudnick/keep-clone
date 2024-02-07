import Card from '@/components/Card/Card';
import { SkeletonList } from '@/components/List/SkeletonList';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Exact, GetNotesQuery, Note, Status } from '@/graphql/generated/schema';

interface ListProps {
    loading: boolean;
    error: ApolloError | undefined;
    notes: Note[] | undefined;
    refetch: (variables?: Partial<Exact<{ status: Status; }>> | undefined) => Promise<ApolloQueryResult<GetNotesQuery>>
    disablePinned?: boolean;
}

const List: React.FC<ListProps> = ({
    loading,
    error,
    notes,
    refetch,
    disablePinned,
}) => {
    const auth = useAuth();

    useEffect(() => {
        refetch();
    }, [auth.isAuthenticated]);

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    return (
        <div className="flex flex-wrap ml-6">
            {notes?.map((note) => (
                <Card disablePinned={disablePinned} key={note.id} note={note} />
            ))}
        </div>
    )
}

export default List