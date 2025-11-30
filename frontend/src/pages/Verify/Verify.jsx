// import React, { useContext, useEffect } from 'react'
// import './Verify.css'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';

// const Verify = () => {

//     const [searchParams,setSearchParams]= useSearchParams();
//     const success = searchParams.get("success")
//     const orderId = searchParams.get("orderId")
//     const {url} =useContext(StoreContext);
//     const navigate = useNavigate();

//     const verifyPayment = async ()=>{
//         const response = await axios.post(url+"/api/order/verify",{success,orderId});
//         if (response.data.success) {
//             navigate("/myorders");
//         }
//         else{
//             navigate("/")
//         }
//     }

//     useEffect(()=>{
//         verifyPayment();
//     },[])


//   return (
//     <div className='verify'>
//       <div className='spinner'>

//       </div>
//     </div>
//   )
// }

// export default Verify

import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });

            if (response.data.success) {
                // Redirect to /myorders without query parameters
                navigate("/myorders", { replace: true });
            } else {
                navigate("/", { replace: true }); // Failed payment
            }
        } catch (err) {
            console.error(err);
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className='spinner'>
                {/* Optional: Add a spinner or "Verifying..." text here */}
                Verifying payment...
            </div>
        </div>
    );
};

export default Verify;

