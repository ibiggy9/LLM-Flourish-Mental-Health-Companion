//Custom hook for checking rev state
import React, {useEffect, useState} from 'react'
import Purchases, {CustomerInfo, PurchasesOffering} from 'react-native-purchases'

const APIKeys = {
    apple:'appl_qtsGzWhuxYbwkXHjjmDQFBfidAS',
    google:'',
}

const typesOfMembership = {
    monthly: 'proMonthly',
    yearly: 'proYearly'
}

function useRevHook(){
    const [currentOffering, setCurrentOffering] = useState()
    const [customerInfo, setCustomerInfo] = useState()
    const [entInfo, setEntInfo] = useState()

    const isSubscriber = customerInfo?.activeSubscriptions.includes('pro')  
    const isProMember= customerInfo?.entitlements.active.pro
    const membershipLevel = customerInfo?.entitlements
      

    useEffect(()=> {
        const fetchData = async () => {
            Purchases.configure({apiKey: APIKeys.apple})
            
            //From revCat
            const offerings = await Purchases.getOfferings()
            const customerInfo = await Purchases.getCustomerInfo()

            setCustomerInfo(customerInfo)
            setCurrentOffering(offerings.current)

        }
        fetchData().catch(console.error)
        
    }, [])

    useEffect(()=> {
        const customerInfoUpdated = async (purchaserInfo) => {
            setCustomerInfo(purchaserInfo)
        }
        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated)

    }, [])

    return { currentOffering, customerInfo, isProMember, membershipLevel}

}
export default useRevHook