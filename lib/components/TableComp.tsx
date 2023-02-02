import { deleteData } from 'lib/functions/sqlFunctions'
import React, 
    {  
        PropsWithChildren, 
        ReactElement, 
        useState,
        useEffect
    } 
from 'react'
import AddModal from './AddModal'

type TableCompProps = {
    title: string,
    headers: string[],
    items: any,
    fields: Array<{ field: string }>
}

const TableComp = ({title, headers, items, fields} : PropsWithChildren<TableCompProps>) : ReactElement => {
    const [itemsContent, setItemsContent] : any[] = useState()
    const [action, setAction] = useState(0) /*0 to add, 1 to edit*/
    const [dataToEdit, setDataToEdit] = useState()

    const addItem = (data: typeof items) => {
        console.log(data)
        setItemsContent([...items, data])
    }

    const updateRow = (id: number, newData: any) => {
        setItemsContent(items.map((data: any) => (data.id === id ? newData : data)))
    }
    
    const deleteFromList = async (id: number) : Promise<any> => {
        var itemsFiltered : any
        try { await deleteData(title, id)
            .then(() => itemsFiltered = items.filter((data: any) => data.id !== id))
            .then(() => alert('Item deleted'))
            .then(() => setItemsContent(itemsFiltered))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setItemsContent(items)
    }, [items])

    const changeToEdit = (item: any): void => {
        setDataToEdit(item)
        setAction(1)
    }

    return (
        <div>
            <div className="page">
                <div>
                    <div className='m-6'>
                        <h1>{title}</h1>
                        <div>
                            <table className='w-full h-full'>
                                <thead>
                                <tr>
                                    {headers &&
                                    headers.map((value, idx) => (
                                        <th
                                        className='border border-b-text'
                                        scope="col"
                                        key={`table-header-${idx}`}
                                        >
                                        {value}
                                        </th>
                                    ))}
                                    <th
                                    className='border border-b-text'
                                    scope="col"
                                    key={`table-header-edit`}
                                    >
                                        Edit
                                    </th>
                                    <th
                                    className='border border-b-text'
                                    scope="col"
                                    key={`table-header-delete`}
                                    >
                                        Delete
                                    </th>
                                </tr>
                                </thead>
                                <tbody className='border border-b-text'>
                                {itemsContent && itemsContent.length > 0 ? (
                                    itemsContent.map((item : any) => (
                                    <tr key={`table-${item.id}`}>
                                        {fields.map((field, idx) => (
                                            <td
                                            className='border border-b-text'
                                            key={`table-${field.field}-${idx}`}
                                            title={field.field}
                                            >
                                                {item[field.field]}
                                            </td>
                                        ))}
                                        <td
                                            className='border border-b-text'
                                            key={`table-edit-button`}
                                            title="edit-button"
                                            onClick={() => changeToEdit(item)}
                                            >
                                                <button className='font-bold rounded'>
                                                    Edit
                                                </button>                                                
                                        </td>
                                        <td
                                            className='border border-b-text'
                                            key={`table-delete-button`}
                                            title="delete-button"
                                            >
                                                <button 
                                                className='font-bold rounded'
                                                onClick={() => deleteFromList(item.id)}>
                                                    Delete
                                                </button>                                                
                                        </td>
                                    </tr>)
                                )) : (
                                    <tr className="empty" key="crud-table-test-empty">
                                        <td colSpan={headers.length + 2}>No Records Added Yet</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <AddModal 
                        title={title}
                        item={dataToEdit}
                        fields={fields} 
                        headers={headers}
                        addItem={addItem}
                        action={action}
                        setAction={setAction}
                        updateRow={updateRow}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableComp