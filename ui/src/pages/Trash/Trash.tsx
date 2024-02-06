import React from 'react'
import { CreateNote, List } from '@/components'
import { Status, useGetNotesQuery } from '@/graphql/generated/schema';

const Trash: React.FC = () => {
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Deleted },
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

export default Trash