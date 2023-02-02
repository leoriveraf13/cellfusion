import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { 
    Button, 
    Col, 
    Form, 
    InputGroup, 
    Modal, 
    Row 
} from 'react-bootstrap'
import { insertData, updateData } from 'lib/functions/sqlFunctions'

type AddModalProps = {
    title: string
    item: any,
    fields: Array<{ field: string, type: string }>
    headers: string[]
    addItem: (data: any) => void
    updateRow: (id: number, data: any) => void
    action: number
    setAction: (value: number) => void
}

const AddModal = ({title, item, fields, headers, addItem, action, setAction, updateRow}: PropsWithChildren<AddModalProps>): ReactElement => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<typeof item>()

    const submitAction = async (data: typeof item): Promise<any> => {
        if (action === 0) {
            try { await insertData(title, data)
                .then(() => addItem(data))
                .then(() => alert('Item added'))
                .then(() => reset())
            } catch (e) {
                console.error(e)
                alert('Error inserting values')
            }
        } else {
            try { await updateData(title, data, item.id)
                .then(() => updateRow(item.id, data))
                .then(() => alert('Item edited'))
                .then(() => changeToAdd())
            } catch (e) {
                console.error(e)
                alert('Error inserting values')
            }            
        }
    }

    const changeToAdd = () => {
        setAction(0)
        reset()
    }

    useEffect(() => {
    }, [action])
    
    return (
        <div className='m-6'>
            <Form>
                <Modal.Header className='mb-4'>New {title}</Modal.Header>
                <Modal.Body>
                    {fields && fields.map((field, idx) => (
                        <Form.Group as={Row} className="mb-4">
                            <Col sm="6">
                                <InputGroup hasValidation>
                                        <label className="form-control-label " key={`label-${headers[idx]}`}>{headers[idx]}</label>
                                        <br />
                                        <Form.Control
                                        key={`form-control-${field.field}`}
                                        className={`form-control border border-b-text w-1/2`}
                                        defaultValue={action === 1 ? item[field.field] : ''}
                                        placeholder="Type"
                                        type={field.type}
                                        {...register(field.field, {
                                            required: true,
                                        })}
                                        isInvalid={!!errors[field.field]}
                                        ></Form.Control>
                                        <Form.Control.Feedback type="invalid" className={`text-red ${
                                            errors[field.field] ? '' : 'hidden'
                                        }`}>
                                            The value {headers[idx]} is required
                                        </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                <Button
                    variant="primary"
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={handleSubmit((data: any) => submitAction(data))}
                >
                    {action === 0 ? 'Add' : 'Edit'} {title}
                </Button>
                {action === 1 &&
                    <Button
                    variant="secondary"
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={() => changeToAdd()}
                    >
                        Cancel
                    </Button>
                }
                </Modal.Footer>
            </Form>
        </div>
    )
}

export default AddModal