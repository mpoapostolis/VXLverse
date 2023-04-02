import { useStore } from '@/store'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

const defaultDialogue = {
  title: '',
  requiredItem: '',
  text: '',
  completedText: '',
}

export function DailogueEditor() {
  const [open, setOpen] = useState(false)
  const [dialogue, setDialogue] = useState([defaultDialogue])
  const store = useStore()

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className=' w-full border border-dashed border-black border-opacity-25 py-6 text-xs'>
        Dialogue Editor
      </button>

      <div
        className={clsx('modal', {
          'modal-open': open,
        })}>
        <div className='modal-box flex w-11/12 max-w-screen-xl flex-col bg-base-200 '>
          <div className='grid grid-cols-[1fr_1fr_1fr_1fr_60px] gap-4 p-4'>
            <div>Title</div>
            <div>Required Item</div>
            <div>Text</div>
            <div>Completed Text </div>
            <div> </div>
            {dialogue.map((d, idx) => (
              <Fragment key={idx}>
                <input placeholder='Title' type='text' className='input-bordered input input-sm' />
                <select placeholder='Required Item' className='select-bordered select select-sm'>
                  <option value=''>None</option>
                  {store.nodes.map((node) => (
                    <option key={node.uuid} value={node.uuid}>
                      {node?.name === '' ? node?.type : node?.name}
                    </option>
                  ))}
                </select>
                <input placeholder='Text' className='input-bordered input input-sm ' />
                <input placeholder='Completed Text' className='input-bordered input input-sm' />
                <div className='flex gap-2'>
                  {dialogue.length > 1 && (
                    <button
                      onClick={() => {
                        setDialogue(dialogue.filter((_, i) => i !== idx))
                      }}>
                      <picture>
                        <img src='https://s2.svgbox.net/materialui.svg?ic=delete&color=c00' alt='' />
                      </picture>
                    </button>
                  )}
                  {dialogue.length === idx + 1 && (
                    <button
                      onClick={() => {
                        setDialogue([...dialogue, defaultDialogue])
                      }}>
                      <picture>
                        <img src='https://s2.svgbox.net/materialui.svg?ic=add' alt='' />
                      </picture>
                    </button>
                  )}
                </div>
              </Fragment>
            ))}
          </div>

          <div className='modal-action'>
            <button onClick={() => setOpen(false)} className='btn-sm btn'>
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className='btn-sm btn'>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
