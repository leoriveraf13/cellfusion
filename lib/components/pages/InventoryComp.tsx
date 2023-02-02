import { selectData } from 'lib/functions/sqlFunctions'
import React, { useEffect, useState } from 'react'

const InventoryComp = () => {
    const [items, setItems] = useState<any>()
    const fields : field = [{field: 'name'}, {field: 'remaining'}, {field: 'sold'}, {field: 'total'}, {field: 'warehouse'}]
    const Headers = ['Name', 'On Stock', 'Sold', 'Total', 'Warehouse']
    const title = "Products"
    
    type field = Array<{
        field: string
    }> | undefined
    
    const getItems = async () => {
        try { await selectData('Products')
            .then((data) => setItems(data))
        } catch (e) {
            console.log(e)
        }
      }

    useEffect(() => {
        getItems()
    }, [])
    
    return (
        <div>
            <div className="page">
                <div>
                    <div>
                        <h1>{title}</h1>
                        <div>
                            <table className='w-full h-full'>
                                <thead>
                                <tr>
                                    {Headers &&
                                    Headers.map((value, idx) => (
                                        <th
                                        className='border border-b-text'
                                        scope="col"
                                        key={`table-${idx}`}
                                        >
                                        {value}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className='border border-b-text'>
                                {items && items.length > 0 ? (
                                    items.map((item : any) => {
                                        var color: string
                                        var percent : number = (parseInt(item.remaining) * 100) / parseInt(item.total)
                                        if (percent >= 75){
                                            color = 'green'
                                        } else if (percent >= 30 && percent < 75){
                                            color = 'yellow'
                                        } else {
                                            color = 'red'
                                        }
                                        return(
                                        <tr key={`table-warehouse-${item.id}`}>
                                            {fields.map((field) => (
                                                <td
                                                className={`border border-b-text`}
                                                key={`table-${item.id}-${field}`}
                                                style={field.field === 'remaining' ?
                                                {
                                                    backgroundColor: color
                                                } : {}}
                                                title={field.field}
                                                >
                                                    {field.field !== 'sold' ? item[field.field] : item.total - item.remaining}
                                                </td>
                                            ))}
                                        </tr>
                                    )})
                                ) : (
                                    <tr className="empty" key="crud-table-test-empty">
                                    <td colSpan={3}>No Records Added Yet</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryComp