import React, { useEffect } from 'react'
import { Status, useGetNotesQuery } from '@/graphql/generated/schema';
import { SkeletonList } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { ArchivedCard } from '@/components';

const Archived: React.FC = () => {
    const auth = useAuth();
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Archived },
    });

    useEffect(() => {
        refetch();
    }, [auth.isAuthenticated]);

    if (loading || error) {
        return (
            <SkeletonList />
        );
    }

    return (
        <div className="ml-10 mt-28 p-4">
            <div className="flex flex-wrap ml-6">
                {data?.notes?.map((note) => (
                    <ArchivedCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default Archived