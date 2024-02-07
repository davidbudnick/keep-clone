import React from 'react'
import { List } from '@/components'
import { Status, useGetNotesQuery, useRemoveDeletedMutation } from '@/graphql/generated/schema';
import { useToast } from '@/components/ui/use-toast';

const Trash: React.FC = () => {
    const { toast } = useToast()
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
                <p className="italic">Notes in the Trash are deleted automatically after 7 days</p>
                {data?.notes?.length !== 0 &&
                    <button disabled={data?.notes?.length === 0} onClick={() => {
                        removeDeleted();
                        toast({
                            title: "Notes have been successfully deleted",
                        })
                    }} className="ml-4 text-blue-500 hover:underline cursor-pointer">Empty Trash</button>
                }
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