import React from 'react'
import { List } from '@/components'
import { Status, useGetNotesQuery } from '@/graphql/generated/schema';

const Archived: React.FC = () => {
    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Archived },
    });
    return (
        <div className="ml-10 mt-28 p-4">
            <List
                disablePinned={true}
                loading={loading}
                error={error}
                notes={data?.notes}
                refetch={refetch}
            />
        </div>
    )
}

export default Archived