import React from 'react'
import { List, CreateNote } from '@/components'
import { Status, useGetNotesQuery } from '@/graphql/generated/schema';

const Archived: React.FC = () => {
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Archived },
    });
    return (
        <div className="ml-10 mt-14 p-4">
            <CreateNote />
            <List
                loading={loading}
                error={error}
                data={data}
                refetch={refetch}
            />
        </div>
    )
}

export default Archived