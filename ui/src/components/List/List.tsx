import { gql, useQuery } from '@apollo/client'
import Card from '@/components/Card/Card';
import { Note } from '@/types/Note';
import { SkeletonList } from '@/components/List/SkeletonList';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';


interface ListProps {
    status: string
}


const List: React.FC<ListProps> = ({ status }) => {
    const auth = useAuth();
    const { loading, error, data, refetch } = useQuery(
        gql`
    query getNotes($status: Status!) {
    notes(status: $status){
      id
      body
      title
      status
      updatedAt 
      }
}`,
        {
            variables:
            {
                status
            }
        },
    )

    useEffect(() => {
        refetch();
    }, [auth.isAuthenticated, refetch]);


    if (loading || error) {
        return (
            <SkeletonList />
        );
    }



    return (
        <div className="flex flex-wrap justify-center">
            {data.notes?.map((note: Note) => (
                <Card key={note.id} note={note} />
            ))}
        </div>
    )
}

export default List