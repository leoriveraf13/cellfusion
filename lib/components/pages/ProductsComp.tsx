import { selectData } from 'lib/functions/sqlFunctions'
import React, { useEffect, useState } from 'react'
import TableComp from '../TableComp'

const ProductsComp = () => {
    const [items, setItems] = useState<any>()
    const fields : field = [{field: 'name', type: 'string'}, {field: 'total', type: 'number'}, {field: 'remaining', type: 'number'} , {field: 'warehouse', type: 'string'}]
    const headers = ['Name', 'Total Qty', 'Remaining Qty', 'Warehouse']
    const title = "Products"
    
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

export default ProductsComp