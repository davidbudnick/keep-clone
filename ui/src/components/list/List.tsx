import { gql, useQuery } from '@apollo/client'


interface Note {
    id: string
    body: string
}

const List = () => {
    const { loading, error, data } = useQuery(
        gql`
    query {
    notes(status: ACTIVE){
      id
      body
  }}`)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

    return (
        <div>
            {data.notes.map((note: Note) => (
                <div key={note.id}>
                    <p>
                        {note.id}={note.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default List