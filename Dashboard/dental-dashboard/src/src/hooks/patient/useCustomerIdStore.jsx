// useCustomerStore.js
import {create} from 'zustand';

const useCustomerIdStore = create((set) => ({
    customerId: null,
    setCustomerId: (id) => set({customerId: id}),
}));

export default useCustomerIdStore;
