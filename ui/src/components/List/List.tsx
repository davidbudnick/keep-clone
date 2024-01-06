import { gql, useQuery } from '@apollo/client'
import Card from '@/components/Card/Card';
import { Note } from '@/types/Note';
import { SkeletonList } from '@/components/List/SkeletonList';


interface ListProps {
    status: string
}


const List: React.FC<ListProps> = ({ status }) => {
    const { loading, error, data } = useQuery(
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