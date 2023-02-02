import React, { useState, useEffect } from 'react'
import { selectData } from 'lib/functions/sqlFunctions'
import TableComp from '../TableComp'

const WarehouseComp = () => {
    const [items, setItems] = useState<any>()
    const fields : field = [{field: 'name', type: 'string'}, {field: 'minProd', type: 'number'}, {field: 'maxProd', type: 'number'}]
    const headers = ['Name', 'Min product', 'Max product']
    const title = "Warehouse"
    
    type field = Array<{
        field: string,
        type: string
    }> | undefined
    
    const getItems = async () => {
        try { await selectData(title)
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
            <TableComp
                title={title}
                headers={headers}
                items={items}
                fields={fields}
            />
        </div>
    )
}

export default WarehouseComp