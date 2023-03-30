import { v4 as uuidv4 } from 'uuid';

function createOrder(card){
    return new Promise((resolve, reject)=>{
        if(!validateCard(card))
        reject('Card is not valid')
        else
            setTimeout(() => {
                resolve('Order ID: ' + uuidv4())
                proceedToPayment()
                
            }, 5000);
        
    })
    .then(res=>console.log(res), err => console.log(err))
}

function validateCard(card){
    console.log(`Card number: ${card}`);
    if(Math.random() >=0.499)
    {
        return true;
    }
    return false
}

function proceedToPayment(){
    return new Promise((resolve, reject)=>{
        if(Math.random() >=0.499){
            resolve('Payment successfull');
        }
        reject('Payment failed');
    })
    .then(res=>console.log(res), err=> console.log(err))
}

createOrder('1234 5678 9123 4567')