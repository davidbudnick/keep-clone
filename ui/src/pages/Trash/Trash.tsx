import React from 'react'
import { List } from '@/components'
import { Status, useGetNotesQuery, useRemoveDeletedMutation } from '@/graphql/generated/schema';
import { cn } from '@/lib/utils';

const Trash: React.FC = () => {
    const [removeDeleted] = useRemoveDeletedMutation(
        {
            update(cache) {
                cache.evict({ fieldName: 'notes' });
            }
        }
    );

    const { loading, error, data, refetch } = useGetNotesQuery({
        variables: { status: Status.Deleted },
    });

    return (
        <div className="ml-10 mt-14 p-4">
            <div className="flex justify-center mt-4 mb-4">
                <p className="italic">Notes in the Trash are deleted after 7 days</p>
                <button disabled={data?.notes?.length === 0} onClick={() => removeDeleted()} className={cn("ml-8",
                    {
                        "text-gray-400 cursor-not-allowed": data?.notes?.length === 0,
                        "text-blue-500 hover:underline cursor-pointer": data?.notes?.length !== 0
                    }
                )
                }>Empty Trash</button>
            </div>
            <List
                disablePinned={true}
                loading={loading}
                error={error}
                notes={data?.notes}
                refetch={refetch}
            />
        </div >
    )
}

export default Trash