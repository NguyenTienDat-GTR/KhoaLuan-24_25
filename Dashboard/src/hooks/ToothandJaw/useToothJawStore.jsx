import {create} from 'zustand';
import axios from '../../config/axiosConfig';

const useToothJawStore = create((set) => ({
    tooth: [],
    jaw: [],

    getAllTooth: async () => {
        try {
            const response = await axios.get('/service/getTooth');
            if (response.status === 200) {
                set({tooth: response.data.tooth.sort((a, b) => a.name.localeCompare(b.name))});
            }
        } catch (error) {
            console.error('Error fetching tooth data:', error);
        }
    },

    getAllJaw: async () => {
        try {
            const response = await axios.get('/service/getJaw');
            if (response.status === 200) {
                set({jaw: response.data.jaw.sort((a, b) => a.name.localeCompare(b.name))});
            }
        } catch (error) {
            console.error('Error fetching jaw data:', error);
        }
    }
}));

export default useToothJawStore;