import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Success = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [downloadLink, setDownloadLink] = useState('');

    useEffect(() => {
        if (!orderId) return;

        const fetchDownloadLink = async () => {
            try {
                const response = await axios.get(`/api/orders/download-link/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDownloadLink(response.data.downloadUrl);
            } catch (error) {
                console.error('Error fetching download link', error);
            }
        };

        fetchDownloadLink();
        localStorage.removeItem('basket');
    }, [orderId]);

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Your order has been completed successfully. You can download your digital assets below:</p>
            {downloadLink && <a href={downloadLink}>Download Here</a>}
        </div>
    );
};

export default Success;
