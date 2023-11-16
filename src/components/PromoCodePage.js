import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PromoCodePage = () => {
    const [promoCode, setPromoCode] = useState('');

    const handleChange = (e) => {
        setPromoCode(e.target.value);
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log(promoCode);
        // Handle the promo code confirmation logic here
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4" style={{fontSize: '3rem'}}>Promo Code</h2>
                    <form onSubmit={handleConfirm}>
                        <div className="form-group mb-4">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={promoCode}
                                onChange={handleChange}
                                placeholder="Put your promo code here..."
                                style={{
                                    fontSize: '2rem', 
                                    height: '80px', 
                                    padding: '20px'
                                }}
                            />
                        </div>
                        <div className="text-center mb-3">
                            <button type="submit" className="btn" style={{fontSize: '1.5rem', padding: '15px 30px', backgroundColor: '#ff5722', color: 'white'}}>Confirm Code</button>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn" onClick={() => { /* Handle the back button logic here */ }} style={{fontSize: '1.2rem', padding: '10px 25px', backgroundColor: '#808080', color: 'white'}}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PromoCodePage;



