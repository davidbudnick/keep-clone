import Card from '@/components/Card/Card';
import { SkeletonList } from '@/components/List/SkeletonList';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Exact, GetNotesQuery, Status } from '@/graphql/generated/schema';

interface ListProps {
    loading: boolean;
    error: ApolloError | undefined;
    data: GetNotesQuery | undefined;
    refetch: (variables?: Partial<Exact<{
        status: Status;
    }>> | undefined) => Promise<ApolloQueryResult<GetNotesQuery>>
}

const List: React.FC<ListProps> = ({
    loading,
    error,
    data,
    refetch,
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
        <div className="flex flex-wrap justify-center">
            {data?.notes?.map((note) => (
                <Card key={note.id} note={note} />
            ))}
        </div>
    )
}

export default List