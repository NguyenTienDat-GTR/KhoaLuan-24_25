import {create} from 'zustand';

const useServiceAppointmentStore = create((set) => ({
    serviceName: null,
    setServiceName: (name) => set({serviceName: name}),
}));

export default useServiceAppointmentStore;