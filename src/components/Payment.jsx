import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useRouter } from 'next/navigation';

const Payment = () => {
    const [upiUrl, setUpiUrl] = useState('');
    const [amount, setAmount] = useState('');
    const [payeeVpa, setPayeeVpa] = useState('');
    const [payeeName, setPayeeName] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [transactionRefId, setTransactionRefId] = useState('');
    const [transactionNote, setTransactionNote] = useState('');
    const router = useRouter();

    const generateQR = async () => {
        const response = await axios.post('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/generateUpiQr', {
            amount,
            payeeVpa,
            payeeName,
            transactionId,
            transactionRefId,
            transactionNote
        });

        setUpiUrl(response.data.upiUrl);
    };

    return (
        <div>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Payee VPA" value={payeeVpa} onChange={(e) => setPayeeVpa(e.target.value)} />
            <input type="text" placeholder="Payee Name" value={payeeName} onChange={(e) => setPayeeName(e.target.value)} />
            <input type="text" placeholder="Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
            <input type="text" placeholder="Transaction Ref ID" value={transactionRefId} onChange={(e) => setTransactionRefId(e.target.value)} />
            <input type="text" placeholder="Transaction Note" value={transactionNote} onChange={(e) => setTransactionNote(e.target.value)} />
            <button onClick={generateQR}>Generate QR</button>
            {upiUrl && <QRCode value={upiUrl} />}
        </div>
    );
};

export default Payment;
