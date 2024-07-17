import NavigationMenu from '../../components/navigationMenu/NavigationMenu'
import './TransactionsPage.scss'
import { Card, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function TransactionsPage() {
    const transactions = [];

  return (
    <div className='transactions-page'>
        <NavigationMenu />
        <div className='shadow-lg'>
      <div className="mt-4 ps-3 pe-3 pb-5 tab-body shadow-lg">
        {transactions.length > 0 ? (
          <>
            <h1 className='tranh1'>Your Transactions History</h1>
            <Table striped bordered hover className='shadow-lg tb'>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Amount</th>
                  <th>Date Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.eventName}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.datePaid}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <Card className='showmEventm'>
            <Card.Body className='pb-5'>
              <Card.Img variant="top" src="/tran.jpg" className='shownOdataimg' />
              <Card.Title>No transactions available</Card.Title>
              <Card.Text className='mb-3'>
                You have not made any transactions yet.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
    </div>
  )
}

export default TransactionsPage