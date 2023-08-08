import React from 'react';
import classNames from 'classnames';

const AddNote: React.FC = () => {
    // const [newNoteOpen, setNewNoteOpen] = useState<boolean>(false)
    return (
        <form className='mb-3 mt-4 flex flex-col items-center justify-center'>
            <label htmlFor="default-search" className="sr-only text-sm font-medium text-gray-900 dark:text-white">Search</label>
            {/* //TODO: use react hoook form */}
            <input type="search" id="default-search" className={classNames("block p-3 text-sm w-1/3 text-gray-900 border rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white", {
                // "hidden": newNoteOpen,
            })} placeholder="Take a Note..." required />
        </form>
    )
}

export default AddNote