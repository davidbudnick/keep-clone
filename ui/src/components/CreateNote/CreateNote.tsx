import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CreateNote: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="flex justify-center" onClick={() => setOpen(false)}>
            <div className='w-full max-w-lg p-2' onClick={(e) => e.stopPropagation()}>
                <>
                    {open &&
                        <div className='p-2 border rounded'>
                            <Input autoFocus placeholder="Title" />
                            <Textarea onClick={(e) => { e.stopPropagation(); setOpen(true); }} className="mt-2" placeholder="Take a note..." />
                            <div className="flex justify-end">
                                <Button variant="outline" onClick={() => setOpen(false)} className='mt-2'>Submit</Button>
                            </div>
                        </div>
                    }
                    {!open &&
                        <Input onClick={(e) => { e.stopPropagation(); setOpen(true); }} placeholder="Take a note..." />
                    }
                </>
            </div>
        </div>
    )
}

export default CreateNote;