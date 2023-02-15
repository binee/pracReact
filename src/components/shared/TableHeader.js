import React from 'react'

const TableHeader = (props) => {
    const { columns } = props;
  return (
    <>
        <thead>
        <tr>
            {columns.map((column) => (
              <th>{column}</th>
            ))
          }
        </tr>
      </thead>
    </>
  )
}

export default TableHeader