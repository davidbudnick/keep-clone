import { gql, useQuery } from '@apollo/client'
import Card from '@/components/Card/Card';
import { Note } from '@/types/Note';

const List = () => {
    const { loading, error, data } = useQuery(
        gql`
    query {
    notes(status: ACTIVE){
      id
      body
      title
      status
      createdAt
  }}`)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div className="flex flex-wrap justify-center">
            {data.notes?.map((note: Note) => (
                <Card key={note.id} note={note} />
            ))}
        </div>
    )
}

export default List